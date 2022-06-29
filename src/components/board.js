import { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentBoard } from "../contexts/currentBoard.context";


export function Board({ board }) {

   const [currentBaord, setCurrentBoard] = useContext(CurrentBoard)

   console.log(currentBaord)

   return (
      <Link to={"/konu/" + board.slug} onClick={() => { 
         setCurrentBoard(board.baslik)
      }}>
         <div className="board-item">
            <div className="board-item-head">{board.baslik}</div>
            <div className="board-item-about">{board.about}</div>
         </div>
      </Link>
   )
}