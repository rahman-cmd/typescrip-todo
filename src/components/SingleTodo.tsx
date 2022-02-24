import { CloseIcon } from '@chakra-ui/icons';
import { Checkbox, GridItem } from '@chakra-ui/react';
import * as React from 'react';
import swal from 'sweetalert';
import { ActionType, ITodo } from './AllTodo';

interface ISingleTodoProps {
  todo: ITodo;
  dispatch: React.Dispatch<ActionType>;
}

const SingleTodo: React.FunctionComponent<ISingleTodoProps> = ({ todo, dispatch }) => {
  const handelDelete = () => {
    swal('Todo Deleted!', 'You Deleted the Todo item!', 'success');
    dispatch({ type: 'REMOVE', id: todo.id });
  };

  return (
    <GridItem sx={{ bgColor: '#50cfd0', height: '180px', borderRadius: '15px', position: 'relative' }}>
      <CloseIcon sx={{ position: 'absolute', right: '20px', color: '#ec3131', top: '20px', cursor: 'pointer' }} onClick={handelDelete} />

      {todo.isChecked ? <del>{todo.todoName}</del> : <h4>{todo.todoName}</h4>}

      <Checkbox
        size='md'
        colorScheme='green'
        defaultChecked={todo.isChecked}
        onChange={(e) => dispatch({ type: 'DONE', isChecked: e.target.checked, id: todo.id })}
      >
        Done
      </Checkbox>
    </GridItem>
  );
};

export default SingleTodo;
