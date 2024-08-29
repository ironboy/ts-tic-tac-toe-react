import { useState } from 'react';
import BoardClass from './classes/Board';

export default function App() {

  // create a state - an object
  // in which can update each property as we want
  // by calling setState
  const [state, _setState] = useState({
    board: new BoardClass(() => setState())
  });

  const setState = (prop: string = '', value: any = '') => {
    _setState({ ...state, [prop]: value });
  }

  if (state.board.winner) {
    alert(state.board.winner + ' has won');
  }

  return <>
    {state.board.render()}
  </>;
}
