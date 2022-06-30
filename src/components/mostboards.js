import { useContext } from "react";
import { Link } from "react-router-dom";
import { BoardContext } from "../contexts/board.context";
import { CurrentBoard } from "../contexts/currentBoard.context";
import { ReklamDikey } from "./adsense/reklam";
import { MostPost } from "./mospost";


export function MostBoards(params) {

   const [currentBaord, setCurrentBoard] = useContext(CurrentBoard)

   return (
      <div className="boards-side">
         <BoardContext.Consumer>
            {value => (
               <div className="boards-head">
                  <span className="text-head">Konular</span>
                  <div className="cizgi-2"></div>
                  <div className="boards-items">
                     {value[0].map((board, idx) => {
                        return (
                           idx < 10 ? (
                              <Link to={"/konu/" + board.slug} onClick={() => { setCurrentBoard(board.baslik) }}>
                                 <div className="board-item">
                                    <div className="board-item-head">{board.baslik.length > 20 ? (board.baslik.slice(0, 20) + "...") : (board.baslik)}</div>
                                    <div className="board-item-about">{board.about.length > 50 ? (board.about.slice(0, 50) + "...") : (board.icerik)}</div>
                                 </div>
                              </Link>
                           ) : (
                              <></>
                           )
                        )
                     })}
                  </div>
               </div>
            )}
         </BoardContext.Consumer>
         <div style={{ height: 15 }}></div>
         <ReklamDikey />
      </div>
   )
}