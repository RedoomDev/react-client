import { PostContext } from "../contexts/post.context";
import { MostPost } from "./mospost";


export function MostPosts(params) {

   return (
      <div className="boards-side bg-zinc-900">
         <PostContext.Consumer>
            {value => (
               <div className="boards-head">
                  <span className="text-head">En Yeni Gönderiler</span>
                  <div className="cizgi-2"></div>
                  <div className="boards-items">
                     {value[0].map(post => (
                        <MostPost post={post}></MostPost>
                     ))}
                  </div>
               </div>
            )}
         </PostContext.Consumer>
      </div>
   )
}