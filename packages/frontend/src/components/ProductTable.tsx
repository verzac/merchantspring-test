import React from 'react';
import { Table, TableContainer, Card, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';
import { EbayProduct } from '../services/EbayService';

interface ProductTableProp {
  products: Array<EbayProduct>;
};

const ProductTable: React.FC<ProductTableProp> = (props) => {
  const { products } = props;
  return (<TableContainer component={Card}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Product Name</TableCell>
          <TableCell>SKU</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Shipping Type</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map(product =>
          <TableRow>
            <TableCell>{product.title}</TableCell>
          </TableRow>)}
      </TableBody>
    </Table>
  </TableContainer>);
};

export default ProductTable;