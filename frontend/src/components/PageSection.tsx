import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import React from 'react';

const styles = (theme: Theme) => createStyles({
  section: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
});
const PageSection: React.FC<WithStyles<typeof styles>> = (props) => {
  const { classes, children } = props;
  return <div className={classes.section}>{children}</div>
}

export default withStyles(styles)(PageSection);