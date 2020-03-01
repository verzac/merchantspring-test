import React from 'react';
import { Card, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import { ConsolidatedEbayProduct } from '../../services/EbayService';

export interface ProductDataCardProp {
  products: Array<ConsolidatedEbayProduct>
}

interface DataCardProp {
  label: string;
  data: string;
}

const styles = (theme: Theme) => createStyles({
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  }
});

export default withStyles(styles)(function (props: WithStyles<typeof styles> & DataCardProp) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      {props.label}: {props.data}
    </Card>
  );
})