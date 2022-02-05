import { useEffect } from "react";
import { Boards } from "../components/boards";
import { MostPosts } from "../components/mostposts";
import { Navbar } from "../components/navbar";




export function IndexPage() {

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   return (
      <div className="text-white font-mono">
         <Navbar></Navbar>
         <div className="container">
            <div className="main-area">
               <div>
                  <Boards tag="En Çok Gönderi Alan Konular" type={"most"}></Boards>
               </div>
               <div>
                  <MostPosts></MostPosts>
               </div>
            </div>
         </div>
      </div>
   )
}