

export function Post({ post }) {

   return (
      <div className="board-item bg-zinc-800">
         <div className="board-item-head">{post.baslik}</div>
         <div className="board-item-about">{post.icerik}</div>
      </div>
   )
}