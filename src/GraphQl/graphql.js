import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://api.vultus.se/graphql", // Replace with your API endpoint
});

// This function adds the Authorization header to each request
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWU2NGQzZTlhMDc4ZDAzY2QwY2I3NjEiLCJkYXRlIjoiMjAyMi0wNi0yMlQxMjo1OTozNi4xOTVaIiwiaWF0IjoxNjU1OTAyNzc2fQ.airJC2COo5-XZ3MPvgCHWU5ZCN5yweCYcAAeM1UVUTs`,
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: "cache-and-network", errorPolicy: "ignore" },
    query: { fetchPolicy: "network-only", errorPolicy: "all" },
  },
});

export default client;
