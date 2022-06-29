import { Link } from "react-router-dom";


export function Post({ post }) {

   return (
      <Link to={"/post/" + post.id}>
         <div className="board-item">
            <div className="board-item-head">{post.baslik}</div>
            <div className="board-item-about">{post.icerik.length > 100 ? (post.icerik.slice(0, 100) + "...") : (post.icerik)}</div>
         </div>
      </Link>
   )
}