import { BoardContext } from "../contexts/board.context";
import { Board } from "./board";


export function Boards(params) {

   return (
      <div className="boards bg-zinc-900">
         <BoardContext.Consumer>
            {value => (
               <div className="boards-head">
                  <span className="text-head">Konular</span>
                  <div className="cizgi-2"></div>
                  <div className="boards-items">
                     {value[0].map(board => (
                        <Board board={board}></Board>
                     ))}
                  </div>
               </div>
            )}
         </BoardContext.Consumer>
      </div>
   )
}