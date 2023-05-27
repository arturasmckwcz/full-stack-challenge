import { ApolloProvider } from '@apollo/client';

import './App.css';
import client from './graphql/client';
import Header from './components/Header';
import Rooms from './components/Rooms';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='container'>
        <Header />
        <Rooms />
      </div>
    </ApolloProvider>
  );
}

export default App;
