import SimpleDataCard, { ProductDataCardProp } from "./SimpleDataCard";
import React from 'react';

export default function(props: ProductDataCardProp) {
  const { products } = props;
  let maxPriceString: string = 'Not available.';
  let firstProduct = products[0];
  if (firstProduct) {
    maxPriceString = products.reduce((acc, curr) => acc < Number(curr.price.value) ? Number(curr.price.value) : acc, Number(firstProduct.price.value))
      .toFixed(2);
  }
  return <SimpleDataCard label="Maximum product price" data={maxPriceString} />
}