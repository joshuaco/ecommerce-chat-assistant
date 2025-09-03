import { MongoDBSaver } from '@langchain/langgraph-checkpoint-mongodb';
import { Annotation, StateGraph } from '@langchain/langgraph';
import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { MongoClient } from 'mongodb';
import { itemLookupTool } from './tools';
import { initializeModel } from './config';
import { callModel } from './call-model';

export async function callAgent(
  client: MongoClient,
  query: string,
  sessionId: string
) {
  try {
    const db = client.db('inventory_database');
    const collection = db.collection('items');

    // Define the state structure for the agent workflow
    const GraphState = Annotation.Root({
      messages: Annotation<BaseMessage[]>({
        // Reducer function: concatenate old (x) with new (y) messages
        reducer: (x, y) => x.concat(y)
      })
    });

    const tools = await itemLookupTool(query, collection);
    const toolNode = new ToolNode<typeof GraphState.State>(tools);

    const model = initializeModel(tools);

    function shouldContinue(state: typeof GraphState.State) {
      const messages = state.messages;
      const lastMessage = messages[messages.length - 1] as AIMessage;

      if (lastMessage.tool_calls?.length) {
        return 'tools'; // Route to tool execution
      }
      return '__end__'; // Route to end of the workflow
    }

    // Build the workflow graph
    const workflow = new StateGraph(GraphState)
      .addNode('agent', (state) => callModel(state, model))
      .addNode('tools', toolNode)
      .addEdge('__start__', 'agent')
      .addConditionalEdges('agent', shouldContinue)
      .addEdge('tools', 'agent');

    const checkpointer = new MongoDBSaver({ client, dbName: 'inventory_database' });
    const app = workflow.compile({ checkpointer });

    const finalState = await app.invoke(
      {
        messages: [new HumanMessage(query)]
      },
      {
        recursionLimit: 15,
        configurable: { thread_id: sessionId }
      }
    );

    // Extract the final response from the conversation
    const response = finalState.messages[finalState.messages.length - 1].content;
    console.log('Agent response:', response);

    return response;
  } catch (error: any) {
    // Handle different types of errors with user-friendly messages
    console.error('Error in callAgent:', error.message);

    if (error.status === 429) {
      // Rate limit error
      throw new Error(
        'Service temporarily unavailable due to rate limits. Please try again in a minute.'
      );
    } else if (error.status === 401) {
      // Authentication error
      throw new Error('Authentication failed. Please check your API configuration.');
    } else {
      throw new Error(`Agent failed: ${error.message}`);
    }
  }
}
