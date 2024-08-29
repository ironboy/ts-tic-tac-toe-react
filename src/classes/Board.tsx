import { Fragment } from 'react';

export default class Board {

  matrix: Array<Array<string>>;
  currentPlayerColor: string;
  gameOver: boolean;
  isADraw: boolean;
  winner: string | boolean;
  stateUpdater: Function;

  constructor() {
    this.reset(false);
  }

  reset(realReset: boolean = true) {
    this.matrix = [...new Array(3)].map(_row =>
      [...new Array(3)].map(_column => ' ')
    );
    // currentPlayer, whose turn is it?
    this.currentPlayerColor = 'X';
    // status of game (updated after each move)
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
    realReset && this.stateUpdater();
  }

  // render = output/draw something
  render() {
    return <div className="board">
      {this.matrix.map((row, rowIndex) => <Fragment key={rowIndex}>
        {row.map((column, columnIndex) =>
          <div
            key={columnIndex} className={'column ' + column}
            onClick={() => this.makeMove(
              this.currentPlayerColor,
              rowIndex,
              columnIndex
            )}
          ></div>)}
      </Fragment>)}
    </div>;
  }

  makeMove(color: string, row: number, column: number): boolean {
    // don't make any move if the game is over
    if (this.gameOver) { return false; }
    // check that the color is X or O - otherwise don't make the move
    if (color !== 'X' && color !== 'O') { return false; }
    // check that the color matches the player's turn - otherwise don't make the move
    if (color !== this.currentPlayerColor) { return false; }
    // check that the row and column are numbers - otherwise don't make the move
    if (isNaN(row) || isNaN(column)) { return false; }
    // check that the row is between 0 and 2 - otherwise don't make the move
    if (row < 0 || row >= this.matrix.length) { return false; }
    // check that the column is between 0 and 2 - otherwise don't make the move
    if (column < 0 || column >= this.matrix[0].length) { return false; }
    // check that the position is empty - otherwise don't make the move
    if (this.matrix[row][column] !== ' ') { return false; }

    // make the move
    this.matrix[row][column] = color;
    // check if someone has won or if it's a draw/tie and update properties
    this.winner = this.winCheck();
    this.isADraw = this.drawCheck();
    // change the current player color
    if (!this.winner && !this.isADraw) {
      this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';
    }
    // the game is over if someone has won or if it's a draw
    this.gameOver = !!(this.winner || this.isADraw);
    // call the stateUpdater if the move could be made
    // so that the App component rerenders
    this.stateUpdater();
    // return true if the move could be made
    return true;
  }

  winCheck(): string | false {
    // m - a short alias for this.matrix
    let m = this.matrix;
    // represent ways you can win as offset from ONE position on the board
    let offsets = [
      [[0, 0], [0, 1], [0, 2]],  // horizontal win
      [[0, 0], [1, 0], [2, 0]],  // vertical win
      [[0, 0], [1, 1], [2, 2]],  // diagonal 1 win
      [[0, 0], [1, -1], [2, -2]] // diagonal 2 win
    ];
    // loop through each player color, each position (row + column),
    // each winType/offsets and each offset coordinate added to the position
    // to check if someone has won :)
    for (let color of 'XO') {
      // r = row, c = column
      for (let r = 0; r < m.length; r++) {
        for (let c = 0; c < m[0].length; c++) {
          // ro = row offset, co = column offset
          for (let winType of offsets) {
            let colorsInCombo = '';
            for (let [ro, co] of winType) {
              colorsInCombo += (m[r + ro] || [])[c + co];
            }
            if (colorsInCombo === color.repeat(3)) {
              return color;
            }
          }
        }
      }
    }
    return false;
  }

  // check for a draw/tie
  drawCheck(): boolean {
    // if no one has won and no empty positions then it's a draw
    return !this.winCheck() && !this.matrix.flat().includes(' ');
  }

}