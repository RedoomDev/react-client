import { Link } from "react-router-dom";

export function MostPost({ post }) {
   return (
      <Link to={"/post/" + post.id}>
         <div className="board-item bg-zinc-800">
            <div className="board-item-head">{post.baslik.length > 20 ? (post.baslik.slice(0, 20) + "...") : (post.baslik)}</div>
            <div className="board-item-about">{post.icerik.length > 50 ? (post.icerik.slice(0, 50) + "...") : (post.icerik)}</div>
         </div>
      </Link>
   )
}