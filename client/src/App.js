import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchJobs from "./pages/SearchJobs";
import SavedJobs from "./pages/SavedJobs";
import Navbar from "./components/Navbar";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { createMuiTheme, ThemeProvider } from '@material-ui/core'
// import { purple } from '@material-ui/core/colors'

// const theme = createMuiTheme({
//   palette: {
//     main:'#fefefe'
//   },
//   secondary: purple
// })

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    // <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchJobs} />
            <Route exact path="/saved" component={SavedJobs} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
    // </ThemeProvider>
  );
}

export default App;
