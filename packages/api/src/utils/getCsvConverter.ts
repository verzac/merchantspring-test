import { AsyncParser } from 'json2csv';

export default function() {
  const opts = {
    fields: [
      'title',
      'freeShipping',
      'price.currency',
      'price.value',
      'country',
      'imgUrl',
      'url',
      'location',
    ],
  };
  const asyncParser = new AsyncParser(opts);
  return asyncParser;
}