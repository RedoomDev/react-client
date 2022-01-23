import { Post } from "./post";

export function KonuPosts({ tag, posts }) {

   return (
      <div className="boards bg-zinc-900">

         <div className="boards-head">
            <span className="text-head">{tag}</span>
            <div className="cizgi-2"></div>
            <div className="boards-items">
               {posts.map(posts => (
                  <Post post={posts}></Post>
               ))}
            </div>
         </div>
      </div>
   )
}