import React from 'react';
import { Table, TableContainer, TableRow, TableHead, TableCell, TableBody, createStyles, WithStyles, withStyles, Paper } from '@material-ui/core';
import { ConsolidatedEbayProduct } from '../services/EbayService';
import { Check } from '@material-ui/icons';

const styles = createStyles({
  tableRow: {
    cursor: 'pointer'
  },
  container: {
    maxHeight: '512px',
  }
});

interface ProductTableProp {
  products: Array<ConsolidatedEbayProduct>;
};

const ProductTable: React.FC<WithStyles<typeof styles> & ProductTableProp> = (props) => {
  const { products, classes } = props;
  return (
    <Paper>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
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
              <TableRow key={product.url} hover className={classes.tableRow} onClick={(() => window.open(product.url, '_blank'))}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{[product.price.currency, product.price.value].join(' ')}</TableCell>
                <TableCell>{product.country}</TableCell>
                <TableCell>{product.freeShipping && <Check />}</TableCell>
                <TableCell>{product.location}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer >
    </Paper>
  );
};

export default withStyles(styles)(ProductTable);