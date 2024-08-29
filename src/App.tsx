import { useState, FormEvent } from 'react';
import BoardClass from './classes/Board';
import PlayerClass from './classes/Player';

export default function App() {

  // create a state - an object in which can update 
  // each property as we want by calling setState
  // (note the use of let instead of const
  //  so that the state updates incrementally, inbetween
  //  renders if several properties change as once)
  let [state, _setState] = useState({
    board: new BoardClass(),
    playerX: null,
    playerO: null
  });
  // we intentionally allow setting a prop with any type of value!
  const setState = (prop: string = '', value: any = '') => {
    state = { ...state, [prop]: value };
    _setState(state);
  }

  // add the setState function to the board
  // (keep it fresh by adding it after each render)
  state.board.stateUpdater = setState;

  const { board, playerX, playerO } = state;
  const currentPlayer: PlayerClass | null = board.currentPlayerColor === 'X' ? playerX : playerO;

  function registerName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // don't reload the page
    const form = event.target as HTMLFormElement;
    const inputElement = form.elements[0] as HTMLInputElement;
    const playerName = inputElement.value;
    !state.playerX
      ? setState('playerX', new PlayerClass(playerName, 'X', board))
      : setState('playerO', new PlayerClass(playerName, 'O', board));
    inputElement.value = ''; // empty form input element
  }

  function playAgain() {
    let pX = playerX as any as PlayerClass;
    let pO = playerO as any as PlayerClass;
    // it seems fair to switch who starts
    [pX.name, pO.name] = [pO.name, pX.name];
    // play another game
    board.reset();
  }

  function newGameWithNewPlayers() {
    setState('playerX', null);
    setState('playerO', null);
    playAgain();
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
      {currentPlayer!.name}'s turn... {board.currentPlayerColor}
    </div> : <div className="info">
      {board.winner ? <>
        {currentPlayer!.name} ({board.winner}) has won.
      </> : <>
        It's a tie.
      </>}
      <br />
      <button onClick={playAgain}>
        Play again?
      </button><br />
      <button onClick={newGameWithNewPlayers}>
        New game with new players?
      </button>
    </div>}
  </>;
}