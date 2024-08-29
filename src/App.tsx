import { useState, FormEvent } from 'react';
import BoardClass from './classes/Board';
import PlayerClass from './classes/Player';

export default function App() {

  // create a state - an object
  // in which can update each property as we want
  // by calling setState

  const [state, _setState] = useState({
    board: new BoardClass(),
    playerX: null,
    playerO: null
  })

  console.log(state);

  const setState = (prop: string = '', value: any = '') => {
    _setState({ ...state, [prop]: value });
  }

  // update the stateUpdater in board between each render
  // (this has mainly todo with how React works in strict mode)
  if (state.board.stateUpdater !== setState) {
    state.board.stateUpdater = setState;
  }

  const { board, playerX, playerO } = state;
  const currentPlayer: any = board.currentPlayerColor === 'X' ? playerX : playerO;

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
      <h1>Welcome to Tic-Tac-Toe!</h1>
      <label>
        <p>Please enter your name, player {whoseName}:</p>
        <input name={'player' + whoseName + 'name'} placeholder={'Name of player ' + whoseName} />
      </label>
    </form>
  }

  return <>
    {board.render()}
    {!board.gameOver ? <div className="info">
      {currentPlayer.name}'s turn... {board.currentPlayerColor}
    </div> : <div className="info">
      {board.winner ? <>
        {currentPlayer.name} ({board.winner}) has won.
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