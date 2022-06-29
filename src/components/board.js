import { Link } from "react-router-dom";


export function Board({ board }) {

   return (
      <Link to={"/konu/" + board.slug}>
         <div className="board-item">
            <div className="board-item-head">{board.baslik}</div>
            <div className="board-item-about">{board.about}</div>
         </div>
      </Link>
   )
}