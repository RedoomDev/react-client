import { Link } from "react-router-dom";
import { BoardContext } from "../contexts/board.context";


export function Navbar() {

   return (
      <BoardContext.Consumer>
         {value => (
            <div className="w-screen bg-zinc-900 ">
               <div style={{ paddingTop: 10 }}></div>
               <span className="text-5xl" style={{ margin: '2.5vw' }}>Redoom</span>
               <div className="cizgi"></div>
               <div className="text-2xl text-center navbar-boards">
                  {value[0].map((a, idx) => (
                     idx < 20 ? (<Link to={"/asdasd"} style={{ marginRight: 10 }}>{a.baslik}</Link>) : (<></>)
                  ))}
               </div>
               <div style={{ paddingBottom: 10 }}></div>
            </div>
         )}
      </BoardContext.Consumer>
   )
}