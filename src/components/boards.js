import { BoardContext } from "../contexts/board.context";


export function Boards(params) {

   return (
      <div className="boards bg-zinc-900">
         <BoardContext.Consumer>
            {value => (
               <div className="boards-head">
                  <span className="text-head">Konular</span>
                  <div className="cizgi-2"></div>
                  <div ></div>
               </div>
            )}
         </BoardContext.Consumer>
      </div>
   )
}