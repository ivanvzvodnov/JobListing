import React from "react";
import { Box, Grid, ThemeProvider } from "@material-ui/core";
import theme from './theme/theme'
import Header from './components/Header/'
import SearchBar from "./components/SearchBar/";


export default () => {
  return <ThemeProvider theme = {theme}>
    <Header />
    <Grid container justify = "center">
      <Grid item xs = {10}>
        <SearchBar />
      </Grid>
    </Grid>
  </ThemeProvider>;
};
