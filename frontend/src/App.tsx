import React from 'react';
import { Typography, createStyles, Theme, withStyles, WithStyles, TextField, Box, FormLabel, Button, CircularProgress } from '@material-ui/core';
import EbayService, { EbayProduct } from './services/EbayService';
import ProductTable from './components/ProductTable';
import PageSection from './components/PageSection';

const styles = (theme: Theme) => createStyles({
  root: {
    textAlign: 'center',
    margin: theme.spacing(4),
  },
  searchBar: {
    minWidth: '50%',
  }
});

const App: React.FC<WithStyles<typeof styles>> = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formSearchQuery, setFormSearchQuery] = React.useState('');
  const [products, setProducts] = React.useState<Array<EbayProduct> | undefined>(undefined);
  const { classes } = props;
  function onSubmitSearch(event: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    event.preventDefault();
    EbayService.findProduct()
      .then(products => setProducts(products))
      .finally(() => setIsLoading(false));
  }
  function onChangeSearchQuery(event: any) {
    setFormSearchQuery(event.target.value);
  }
  return (<div className={classes.root}>
    <Typography variant="h1">eBay Finder (BETA)</Typography>
    <PageSection>
      <Typography>Find your top 50 products in eBay here!</Typography>
      <form onSubmit={onSubmitSearch}>
        <TextField
          required
          id="search-query"
          label="Search product"
          margin="normal"
          name="searchQuery"
          value={formSearchQuery}
          onChange={onChangeSearchQuery}
          variant="outlined"
          fullWidth
        // className={classes.searchBar}
        />
        <Button variant="contained" type="submit" color="primary">Search</Button>
      </form>
    </PageSection>
    <PageSection>
      {isLoading && <CircularProgress/>}
      {!isLoading && products && <>
        <Typography variant="h2">Results</Typography>
        <ProductTable products={products} />
      </>}
    </PageSection>
  </div>);
}

export default withStyles(styles)(App);
