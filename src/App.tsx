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

  const { board } = state;

  return <>
    {board.render()}
    {!board.gameOver ? null : <div className="info">
      {board.winner ? <>
        {board.winner} has won.
      </> : <>
        It's a tie.
      </>}
      <br />
      <button onClick={() => board.reset()}>
        Play again?
      </button>
    </div>}
  </>;
}
