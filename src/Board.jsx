import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { getLightOn } from "./helpers";

const DEFAULT_ROWS = 1;
const DEFAULT_COLS = 1;
const DEFAULT_CHANCE_LIGHT_STARTS_ON = .3;

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = DEFAULT_ROWS, ncols = DEFAULT_COLS, chanceLightStartsOn = DEFAULT_CHANCE_LIGHT_STARTS_ON}) {
  const [board, setBoard] = useState(createBoard);
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = Array.from({length : nrows}, () => {
      return Array.from({length : ncols}, () => getLightOn(chanceLightStartsOn))
    });
    return initialBoard;
  }

  /** Checks if all lights are off. */
  function hasWon() {
    return board.every(r => r.every(c => c === false));
  }

  /** Flips cell at coord and its neighbors.
   * Takes string coord ('y-x').
   */
  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const newBoard = oldBoard.map(r => [...r]);

      flipCell(y, x, newBoard);
      flipCell(y-1, x, newBoard);
      flipCell(y+1, x, newBoard);
      flipCell(y, x-1, newBoard);
      flipCell(y, x+1, newBoard);

      return newBoard;
    });
  }

  const htmlBoard = (
                    <table>
                      <tbody>
                      {board.map((r, rIdx) =>
                        <tr key={rIdx}>
                        {r.map((c, cIdx) =>
                        <Cell
                          key={`${rIdx}-${cIdx}`}
                          flipCellsAroundMe={(evt) => flipCellsAround(`${rIdx}-${cIdx}`)}
                          isLit={c} />
                        )}
                        </tr>
                      )}
                      </tbody>
                    </table>
                    )

  const win = hasWon()

  return (
    <div> {win && <span id="winMsg">'YOU WIN!'</span>}
    {!win && htmlBoard}
    </div>
  );
}

export default Board;
