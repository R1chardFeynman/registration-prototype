import { Container, makeStyles, Paper } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
}));

export const CommonContainer = ({ children, maxWidth }) => {
  const classes = useStyles();
  return (
    <Container maxWidth={maxWidth}>
      <Paper className={classes.root} elevation={12}>
        {children}
      </Paper>
    </Container>
  );
};
