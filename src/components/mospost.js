import { Link } from "react-router-dom";
import { api_url } from "../config";

export function MostPost({ post }) {
   return (
      <Link to={"/post/" + post.id}>
         <div className="board-item">
            <div className="board-item-head" style={{ padding: 15, paddingBottom: 0, paddingTop: 5 }}>{post.baslik.length > 20 ? (post.baslik.slice(0, 20) + "...") : (post.baslik)}</div>
            {!post.icerik ? (
               <img className="board-item-image" style={{ padding: 15, borderRadius: 25, paddingTop: 0 }} src={api_url + "/media/" + post.id + "/" + "?width=250&height=250"}></img>
            ) : (
               <div className="board-item-about" style={{ padding: 15, paddingTop: 5 }}>{post.icerik.length > 50 ? (post.icerik.slice(0, 50) + "...") : (post.icerik)}</div>
            )}
         </div>
      </Link>
   )
}