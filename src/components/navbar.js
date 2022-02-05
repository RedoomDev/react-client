import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BoardContext } from "../contexts/board.context";


export function Navbar() {

   const [input, setInput] = useState("")

   return (
      <BoardContext.Consumer>
         {value => (
            <div className="w-screen bg-zinc-900 ">
               <div style={{ paddingTop: 10 }}></div>
               <div id="navbar-main">
                  <Link to="/" className="text-5xl" style={{ margin: '2.5vw' }}>Redoom</Link>
                  <div id="main">
                     <input id="search-input" type="search" name="q" placeholder="Bir şeyler ara..." value={input} autocomplete="off"
                        pattern="[^'\x22]+" onChange={(e) => {
                           setInput(e.target.value)
                        }} />
                     <Link to={"/search?query=" + input}>
                        <button id="search-button" type="button">Ara</button>
                     </Link>
                  </div>
               </div>
               <div className="cizgi"></div>
               <div className="text-2xl navbar-boards">
                  {value[0].map((a, idx) => (
                     idx < 5 ? (<Link to={"/konu/" + a.slug} className="navbar-board bg-zinc-800">{a.baslik}</Link>) : (<></>)
                  ))}
               </div>
               <div style={{ paddingBottom: 10 }}></div>
            </div>
         )}
      </BoardContext.Consumer>
   )
}