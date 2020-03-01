import React from 'react';
import { Table, TableContainer, Card, TableRow, TableHead, TableCell, TableBody, createStyles, WithStyles, withStyles } from '@material-ui/core';
import { ConsolidatedEbayProduct } from '../services/EbayService';
import { Check } from '@material-ui/icons';

const styles = createStyles({
  tableRow: {
    cursor: 'pointer'
  }
});

interface ProductTableProp {
  products: Array<ConsolidatedEbayProduct>;
};

const ProductTable: React.FC<WithStyles<typeof styles> & ProductTableProp> = (props) => {
  const { products, classes } = props;
  return (<TableContainer component={Card}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Product Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Country</TableCell>
          <TableCell>Free Shipping?</TableCell>
          <TableCell>Seller Location</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map(product =>
          <TableRow hover className={classes.tableRow} onClick={(() => window.open(product.url, '_blank'))}>
            <TableCell>{product.title}</TableCell>
            <TableCell>{[product.price.currency, product.price.value].join(' ')}</TableCell>
            <TableCell>{product.country}</TableCell>
            <TableCell>{product.freeShipping && <Check />}</TableCell>
            <TableCell>{product.location}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer >);
};

export default withStyles(styles)(ProductTable);