import apiClient from '@/services/http-client';
import type { Items, Item } from '@/schema/product';

export const getProducts = async (): Promise<Items> => {
  const response = await apiClient.get('/products');
  return response.data;
};

export const getProductById = async (id: string): Promise<Item> => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};
