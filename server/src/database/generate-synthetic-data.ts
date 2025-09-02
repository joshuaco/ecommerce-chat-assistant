import { geminiChatModel } from './config';
import { generateItemsPrompt } from './constants';
import { itemsParser, Item } from '../schema/Item';

export async function generateSyntheticData(): Promise<Item[]> {
  console.log('Generating synthetic data...');

  const response = await geminiChatModel.invoke(generateItemsPrompt);

  return itemsParser.parse(response.content as string);
}
