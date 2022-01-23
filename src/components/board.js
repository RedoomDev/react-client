

export function Board({ board }) {
   
   return (
      <div className="board-item bg-zinc-800">
         <div className="board-item-head">{board.baslik}</div>
         <div className="board-item-about">{board.about}</div>
      </div>
   )
}