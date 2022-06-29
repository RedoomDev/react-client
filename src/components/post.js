import { Link } from "react-router-dom";
import { api_url } from "../config";


export function Post({ post }) {

   return (
      <Link to={"/post/" + post.id}>
         <div className="board-item">
            {!post.icerik ? (
               <div className="board-item-with-image">
                  <div className="board-item-head">{post.baslik}</div>
                  <img className="board-item-image" src={api_url + "/media/" + post.id + "/" + "?width=500&height=500"}></img>
               </div>
            ) : (
               <div>
                  <div className="board-item-head">{post.baslik}</div>
                  <div className="board-item-about">{post.icerik.length > 100 ? (post.icerik.slice(0, 100) + "...") : (post.icerik)}</div>
               </div>
            )}
         </div>
      </Link >
   )
}