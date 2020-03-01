import DataCard, { ProductDataCardProp } from "./SimpleDataCard";
import React from "react";

export default function(props: ProductDataCardProp) {
  const { products } = props;
  let averageTitleLengthString: string = 'Not available.';
  let firstProduct = products[0];
  if (firstProduct) {
    averageTitleLengthString = products.reduce((acc, curr) => (acc + Number(curr.title.length)) / 2, Number(firstProduct.title.length))
      .toFixed(2);
  }
  return (
    <DataCard label="Average character length of the title" data={averageTitleLengthString}/>
  );
}