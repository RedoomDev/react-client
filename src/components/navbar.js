import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BoardContext } from "../contexts/board.context";
import SettingsWindow from "./settingsWindow";


export function Navbar() {

   const [input, setInput] = useState("")
   const [modal, setModal] = useState(false)
   const history = useHistory()

   return (
      <BoardContext.Consumer>
         {value => (
            <div className="w-screen" style={{ backgroundColor: "rgb(24 24 27)" }}>
               <div style={{ paddingTop: 10 }}></div>
               <div id="navbar-main">
                  <Link to="/" className="text-5xl" style={{ margin: '2.5vw' }}>Redoom</Link>
                  <div id="main">
                     <input id="search-input" type="search" name="q" placeholder="Bir şeyler ara..." value={input} autocomplete="off"
                        pattern="[^'\x22]+" onChange={(e) => {
                           setInput(e.target.value)
                        }} />
                     <Link to={input.length > 0 ? "/search?query=" + input : "/"}>
                        <button id="search-button" type="button">Ara</button>
                     </Link>
                  </div>
               </div>
               <div className="cizgi"></div>
               <div className="navbar-grid">
                  <div className="navbar-boards">
                     {value[0].map((a, idx) => (
                        idx < 5 ? (<Link to={"/konu/" + a.slug} className="navbar-board">{a.baslik}</Link>) : (<></>)
                     ))}
                  </div>
                  <div className="navbar-boards">
                     <Link onClick={() => {
                        setModal(true)
                     }} className="navbar-board">Ayarlar</Link>
                  </div>
               </div>
               <div style={{ paddingBottom: 10 }}></div>
               {modal ? (
                  <SettingsWindow setModal={setModal}></SettingsWindow>
               ) : (<></>)}
            </div>
         )}
      </BoardContext.Consumer>
   )
}