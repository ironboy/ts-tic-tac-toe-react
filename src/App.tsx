import { useState, FormEvent } from 'react';
import BoardClass from './classes/Board';
import PlayerClass from './classes/Player';

export default function App() {

  // create a state - an object
  // in which can update each property as we want
  // by calling setState

  const [state, _setState] = useState({
    board: new BoardClass(() => setState()),
    playerX: null,
    playerO: null
  });

  console.log(state);

  const setState = (prop: string = '', value: any = '') => {
    _setState({ ...state, [prop]: value });
  }

  const { board, playerX, playerO } = state;

  function registerName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // don't reload the page
    const form: any = event.target;
    const playerXname = form.elements.playerXname?.value;
    const playerOname = form.elements.playerOname?.value;
    playerXname && setState('playerX', new PlayerClass(playerXname, 'X', board));
    playerOname && setState('playerO', new PlayerClass(playerOname, 'O', board));
    form.elements[0].value = ''; // empty form input element
  }

  if (!playerX || !playerO) {
    let whoseName = !playerX ? 'X' : 'O';
    return <form onSubmit={registerName}>
      <label>
        Please enter your name, player {whoseName}:
        <input name={'player' + whoseName + 'name'} placeholder={'Name of player ' + whoseName} />
      </label>
    </form>
  }

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