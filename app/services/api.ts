//Este serviço irá buscar os produtos da API
import type { Product } from '../components/MultiStepForm/types';

const API_URL = 'https://dummyjson.com';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.products || [];
  } catch (error: any) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};