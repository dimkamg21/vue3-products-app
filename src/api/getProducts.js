import { client } from "@/helpers/fetchClient";

export const getProducts = () => {
  return client.get('/products');
};
