import { PostContext } from "../contexts/post.context";
import { ReklamDikey } from "./adsense/reklam";
import { MostPost } from "./mospost";


export function MostPosts(params) {

   return (
      <div className="boards-side-p">
         <PostContext.Consumer>
            {value => (
               <div className="boards-head">
                  <span className="text-head">En Yeni Gönderiler</span>
                  <div className="cizgi-2"></div>
                  <div className="boards-items">
                     {value[0].map((post, idx) => {
                        return (
                           idx < 10 ? (
                              <MostPost post={post}></MostPost>
                           ) : (
                              <></>
                           )
                        )
                     })}
                  </div>
               </div>
            )}
         </PostContext.Consumer>
         <div style={{ height: 15 }}></div>
         <ReklamDikey />
      </div>
   )
}