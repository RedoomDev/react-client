import { Boards } from "../components/boards";
import { MostPosts } from "../components/mostposts";
import { Navbar } from "../components/navbar";




export function KonuPage() {

   return (
      <div className="text-white font-mono">
         <Navbar></Navbar>
         <div className="container">
            <div className="main-area">
               <div>
                  <Boards tag="Konular"></Boards>
               </div>
               <div>
                  <MostPosts></MostPosts>
               </div>
            </div>
         </div>
      </div>
   )
}