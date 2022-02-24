import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import AllTodo from './components/AllTodo';

const App: React.FunctionComponent = () => {
  return (
    <ChakraProvider>
      <AllTodo />
    </ChakraProvider>
  );
};

export default App;
