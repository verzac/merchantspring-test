import mockAsync from "../utils/mockAsync";
import config from "../config";
import axios from 'axios';
import fileDownload from 'js-file-download';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export interface ConsolidatedEbayProduct { // TL:DR; this is what's actually useful to us
  title: string;
  freeShipping: boolean;
  price: {
    currency: string;
    value: string;
  };
  country: string;
  imgUrl?: string;
  url: string;
  location: string;
}

async function findProduct(keywords: string): Promise<Array<ConsolidatedEbayProduct>> {
  if (config.shouldMock) {
    return mockAsync([
      {
        title: 'Adidas',
        freeShipping: true,
        price: {
          currency: 'AUD',
          value: '10.00',
        },
        country: 'AU',
        url: 'notvalid',
        location: 'Melbourne',
      },
      {
        title: 'Nike',
        freeShipping: false,
        price: {
          currency: 'AUD',
          value: '10.00'
        },
        country: 'AU',
        url: 'notvalid',
        location: 'Melbourne',
      },
    ]);
  }
  return axios.get(BACKEND_URL + '/product-search', {
    params: {
      keywords: keywords
    },
  }).then(resp => resp.data);
}

async function downloadFindProduct(keywords: string) {
  return axios.get(BACKEND_URL + '/product-search', {
    params: {
      keywords: keywords,
      csv: true
    },
    responseType: 'blob',
  }).then(resp => fileDownload(resp.data, `product-${keywords}.csv`));
}

export default {
  findProduct,
  downloadFindProduct,
}