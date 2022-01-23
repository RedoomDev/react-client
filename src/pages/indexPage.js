import { Boards } from "../components/boards";
import { MostPosts } from "../components/mostposts";
import { Navbar } from "../components/navbar";




export function IndexPage() {

   return (
      <div className="text-white font-mono">
         <Navbar></Navbar>
         <div className="container">
            <div className="main-area">
               <Boards></Boards>
               <MostPosts></MostPosts>
            </div>
         </div>
      </div>
   )
}