import React from 'react';
import DataCard, { ProductDataCardProp } from "./SimpleDataCard";

export default function (props: ProductDataCardProp) {
  const { products } = props;
  let averagePriceString: string = 'Not available.';
  let firstProduct = products[0];
  if (firstProduct) {
    averagePriceString = products.reduce((acc, curr) => (acc + Number(curr.price.value)) / 2, Number(firstProduct.price.value))
      .toFixed(2);
  }
  return (
    <DataCard label="Average price" data={averagePriceString}/>
  );
}