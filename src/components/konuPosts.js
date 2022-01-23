import { PostContext } from "../contexts/post.context";
import { Board } from "./board";


export function Boards({ tag }) {

   return (
      <div className="boards bg-zinc-900">
         <PostContext.Consumer>
            {value => (
               <div className="boards-head">
                  <span className="text-head">{tag}</span>
                  <div className="cizgi-2"></div>
                  <div className="boards-items">
                     {value[0].map(posts => (
                        <Board board={posts}></Board>
                     ))}
                  </div>
               </div>
            )}
         </PostContext.Consumer>
      </div>
   )
}