import { AddIcon, CalendarIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex, Grid, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import swal from 'sweetalert';
import SingleTodo from './SingleTodo';

export interface ITodo {
  id: number;
  todoName: string;
  isChecked: boolean;
}

export type ActionType = { type: 'ADD'; todoName: string } | { type: 'REMOVE'; id: number } | { type: 'DONE'; isChecked: boolean; id: number };

const AllTodo: React.FunctionComponent = () => {
  const todoTextRef = useRef<HTMLInputElement>(null);

  const getLocalItems = (): [] => {
    const todo: string | null = localStorage.getItem('todo');
    if (todo) {
      return JSON.parse(todo);
    } else {
      return [];
    }
  };

  const [allTodo, dispatch] = useReducer((state: ITodo[], action: ActionType) => {
    switch (action.type) {
      case 'ADD':
        return [
          ...state,
          {
            id: state.length,
            todoName: action.todoName,
            isChecked: false,
          },
        ];

      case 'REMOVE':
        return state.filter(({ id }) => id !== action.id);

      case 'DONE':
        return state.map((todo) => {
          let items: ITodo = todo;
          if (todo.id === action.id) {
            todo.isChecked = action.isChecked;
            items = { ...todo };
          }
          return items;
        });

      default:
        return state;
    }
  }, getLocalItems());

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(allTodo));
  }, [allTodo]);

  const handelAddTodo = useCallback(() => {
    if (todoTextRef.current) {
      if (todoTextRef.current.value === '') {
        swal({
          title: 'Warning!',
          text: 'Please Write Something to add in your todo list!',
          icon: 'warning',
        });
      } else {
        dispatch({ type: 'ADD', todoName: todoTextRef.current.value });
        swal('Good job!', 'You Added in Todo list!', 'success');
        todoTextRef.current.value = '';
      }
    }
  }, []);

  return (
    <Box>
      <h3>TypeScript Todo App</h3>
      <Container maxW='container.xl'>
        <Flex my={20} align='center' justify='center'>
          <Box className='full__wrapper'>
            <InputGroup>
              <InputLeftElement pointerEvents='none' children={<CalendarIcon color='gray.400' />} />
              <Input ref={todoTextRef} type='tel' placeholder='Add a Todo...' sx={{ width: '600px' }} />
            </InputGroup>
            <Button onClick={handelAddTodo} colorScheme='teal' size='sm' className='add__button'>
              <AddIcon />
            </Button>
          </Box>
        </Flex>
        <Grid templateColumns='repeat(4, 1fr)' gap={6} sx={{ textAlign: 'center' }}>
          {allTodo.map((todo: ITodo) => (
            <SingleTodo key={todo.id} todo={todo} dispatch={dispatch} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AllTodo;
