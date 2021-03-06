import { BoardContext } from "../contexts/board.context";
import { ReklamNormal } from "./adsense/reklam";
import { Board } from "./board";


export function Boards({ tag, type }) {


   return (
      <div className="boards bg-zinc-900">
         <BoardContext.Consumer>
            {value => (
               <div className="boards-head">
                  <span className="text-head">{tag}</span>
                  <div className="cizgi-2"></div>
                  <div className="boards-items">
                     {
                        value[0].sort((a, b) => { return b.posts - a.posts }).map(board => (
                           <Board board={board}></Board>
                        ))
                     }
                  </div>
               </div>
            )}
         </BoardContext.Consumer>
         <div style={{ height: 15 }}></div>
         <ReklamNormal />
      </div>
   )
}