import SimpleDataCard, { ProductDataCardProp } from "./SimpleDataCard";
import React from 'react';

export default function(props: ProductDataCardProp) {
  const { products } = props;
  let minPriceString: string = 'Not available.';
  let firstProduct = products[0];
  if (firstProduct) {
    minPriceString = products.reduce((acc, curr) => acc > Number(curr.price.value) ? Number(curr.price.value) : acc, Number(firstProduct.price.value))
      .toFixed(2);
    minPriceString = `${firstProduct.price.currency} ${minPriceString}`;
  }
  return <SimpleDataCard label="Minimum product price" data={minPriceString} />
}