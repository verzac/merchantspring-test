import mockAsync from "../utils/mockAsync";

export interface EbayProduct {
  title: string;
  freeShipping: boolean;
  price: number;
}

async function findProduct(): Promise<Array<EbayProduct>> {
  return mockAsync([
    {
      title: 'Adidas',
      freeShipping: true,
      price: 10.00,
    },
    {
      title: 'Nike',
      freeShipping: false,
      price: 10.00,
    },
  ]);
}

export default {
  findProduct,
}