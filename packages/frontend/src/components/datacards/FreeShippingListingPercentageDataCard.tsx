import React from 'react';
import DataCard, { ProductDataCardProp } from "./SimpleDataCard";

export default function(props: ProductDataCardProp) {
  const { products } = props;
  let productsWithFreeShipping = products.filter(product => product.freeShipping);
  let percentageString: string = (productsWithFreeShipping.length / products.length * 100).toFixed(2) + '%';
  return <DataCard label="% of listings with free shipping" data={percentageString} />;
}