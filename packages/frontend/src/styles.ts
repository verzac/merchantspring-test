import { Theme, createMuiTheme } from '@material-ui/core'; 
export const appTheme: Theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: '3rem',
    },
    h2: {
      fontSize: '2.5rem',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 300,
    },
    h4: {
      fontSize: '1.5rem',
    },
  },
});