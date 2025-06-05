// import { ApolloClient, InMemoryCache } from '@apollo/client';

// export const client = new ApolloClient({
//   uri: 'http://localhost:5000/graphql',
//   cache: new InMemoryCache(),
// });
// ApolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// 1. Define HTTP link to GraphQL server
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

// 2. Add Authorization header with token from localStorage
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// 3. Create Apollo client with auth link
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
