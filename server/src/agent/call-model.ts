import { BinaryOperatorAggregate, StateType } from '@langchain/langgraph';
import { ModelType } from './config';
import { retryWithBackoff } from './retry';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { BaseMessage } from '@langchain/core/messages';

export async function callModel(
  state: StateType<{
    messages: BinaryOperatorAggregate<BaseMessage[], BaseMessage[]>;
  }>,
  model: ModelType
) {
  return retryWithBackoff(async () => {
    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are a helpful E-commerce Chatbot Agent for a furniture store.
        
        IMPORTANT: You have access to an item_lookup tool that searches the furniture inventory database. ALWAYS use this tool when customers ask about furniture items, even if the tool returns errors or empty results.

        When using the item_lookup tool:
        - If it returns results, provide helpful details about the furniture items
        - If it returns an error or no results, acknowledge this and offer to help in other ways
        - If the database appears to be empty, let the customer know that inventory might be being updated
        - If the sale_price is not available or is zero, only return the full_price.
        
        Current time: {time}
        `
      ],
      new MessagesPlaceholder('messages')
    ]);

    // Fill in the prompt template with actual values
    const formattedPrompt = await prompt.formatMessages({
      time: new Date().toISOString(),
      messages: state.messages
    });

    const result = await model.invoke(formattedPrompt);
    return { messages: [result] };
  });
}
