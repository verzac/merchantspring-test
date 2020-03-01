import ebayService from "../services/ebay.service";
import { EbayError } from '../errors';

export interface ConsolidatedEbayProduct { // TL:DR; this is what's actually useful to us
  title: string;
  freeShipping: boolean;
  price: {
    currency: string;
    value: string;
  };
  country: string;
}

async function getProducts(keywords: string): Promise<Array<ConsolidatedEbayProduct>> {
  let ebayProducts = await ebayService.findProducts(keywords);
  if (!ebayProducts) {
    throw new EbayError('EbayProduct array does not exist.')
  }
  try {
    return ebayProducts.map<ConsolidatedEbayProduct>(ebayProduct => {
      return {
        title: ebayProduct.title.join(' | '),
        freeShipping: ebayProduct.shippingInfo.some(shippingInfo => shippingInfo.shippingType[0] === 'Free'),
        price: {
          currency: ebayProduct.sellingStatus[0].convertedCurrentPrice[0]["@currencyId"],
          value: ebayProduct.sellingStatus[0].convertedCurrentPrice[0].__value__,
        },
        country: ebayProduct.country[0],
      };
    });
  } catch (e) {
    throw new EbayError(`Unable to map to ConsolidatedEbayProduct. Error: ${e.message}`)
  }
}

export default { getProducts };