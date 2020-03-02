import React from 'react';
import { Typography, createStyles, Theme, withStyles, WithStyles, TextField, Box, Button, LinearProgress } from '@material-ui/core';
import EbayService, { ConsolidatedEbayProduct } from './services/EbayService';
import ProductTable from './components/ProductTable';
import PageSection from './components/PageSection';
import AveragePriceDataCard from './components/datacards/AveragePriceDataCard';
import FreeShippingListingPercentageDataCard from './components/datacards/FreeShippingListingPercentageDataCard';
import MinPriceDataCard from './components/datacards/MinPriceDataCard';
import MaxPriceDataCard from './components/datacards/MaxPriceDataCard';
import AverageTitleLengthDataCard from './components/datacards/AverageTitleLengthDataCard';

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
  const [products, setProducts] = React.useState<Array<ConsolidatedEbayProduct> | undefined>(undefined);
  const [error, setError] = React.useState<any | undefined>(undefined);
  const [keywords, setKeywords] = React.useState<string>('');
  const { classes } = props;
  function onSubmitSearch(event: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    event.preventDefault();
    EbayService.findProduct(formSearchQuery)
      .then(products => {
        setProducts(products);
        setKeywords(formSearchQuery);
        setError(undefined);
      }).catch(e => {
        setError(e);
        console.error(e);
      }).finally(() => setIsLoading(false));
  }

  async function onDownload(keywords: string) {
    return EbayService.downloadFindProduct(keywords);
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
      {isLoading && <LinearProgress />}
      {!isLoading && !error && products && <>
        <Typography variant="h2">Results</Typography>
        <Typography>Click on each product to go to their eBay page.</Typography>
        <Box display="flex" flexDirection="row" justifyContent="center" flexWrap="wrap">
          <AveragePriceDataCard products={products} />
          <MinPriceDataCard products={products} />
          <MaxPriceDataCard products={products} />
          <FreeShippingListingPercentageDataCard products={products} />
          <AverageTitleLengthDataCard products={products} />
        </Box>
        <ProductTable products={products} onDownload={() => { onDownload(keywords); }}/>
      </>}
      {error && <Typography color="error">An unexpected error has occurred. Please try again.</Typography>}
    </PageSection>
  </div>);
}

export default withStyles(styles)(App);
