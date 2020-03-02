import axios from 'axios';
import config from '../config';
import _ from 'lodash';
import logger from '../utils/logger';

interface EbayFindItemsByKeywordsResponse {
  findItemsByKeywordsResponse: Array<{
    searchResult: Array<{
      '@count': string;
      item: Array<EbayProduct>;
    }>;
  }>;
}

interface EbayPrice {
  '@currencyId': string;
  __value__: string;
}

export interface EbayProduct { // note that the interface doesn't include ALL data fields, only relevant ones
  itemId: Array<string>;
  title: Array<string>;
  subtitles: Array<string>;
  country: Array<string>;
  shippingInfo: Array<{
    shippingType: Array<'Free' | string>;
    // shipToLocations: Array<>
  }>;
  sellingStatus: Array<{
    currentPrice: Array<EbayPrice>;
    convertedCurrentPrice: Array<EbayPrice>;
    sellingState: 'Active' | 'Canceled' | 'Ended' | 'EndedWithSales' | 'EndedWithoutSales';
  }>;
  galleryURL: Array<string>;
  viewItemURL: Array<string>;
  location: Array<string>;
}



const DEFAULT_HEADERS = {
  'X-EBAY-SOA-GLOBAL-ID': 'EBAY-AU', // australian products only, for now
};

async function findProducts(keywords: string): Promise<Array<EbayProduct>> {
  try {
    const result: EbayFindItemsByKeywordsResponse = await axios.get('https://svcs.ebay.com/services/search/FindingService/v1', {
      params: {
        'OPERATION-NAME': 'findItemsByKeywords',
        'SERVICE-VERSION': '1.0.0',
        'SECURITY-APPNAME': config.ebayAppId,
        'RESPONSE-DATA-FORMAT': 'JSON',
        'keywords': keywords,
        'paginationInput.entriesPerPage': 50,
      },
      headers: DEFAULT_HEADERS,
    }).then(res => res.data);
    if (result.findItemsByKeywordsResponse[0].searchResult[0]['@count'] === '0') {
      return [];
    }
    return result.findItemsByKeywordsResponse[0]
      .searchResult[0]
      .item;
  } catch (e) {
    logger.error('Unable to find products.', e);
    throw e;
  }
}

export default {
  findProducts
};