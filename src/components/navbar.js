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
                  <div>
                     <Link to="/" className="text-5xl" style={{ margin: '2.5vw' }}>Redoom</Link>
                  </div>
                  <div id="main">
                     <input id="search-input" type="search" name="q" placeholder="Bir şeyler ara..." value={input} autocomplete="off"
                        pattern="[^'\x22]+" onChange={(e) => {
                           setInput(e.target.value)
                        }} />
                     <Link to={input.length > 0 ? "/search?query=" + input : "/"}>
                        <button id="search-button" type="button">Ara</button>
                     </Link>
                  </div>
                  <div className="navbar-boards-grid">
                     <div></div>
                     <div className="navbar-boards">
                        <Link onClick={() => {
                           setModal(true)
                        }} className="navbar-board"><i className="fa fa-plus" /> Yeni</Link>
                        <Link onClick={() => {
                           setModal(true)
                        }} className="navbar-board"><i className="fa fa-cog" /> Ayarlar</Link>
                     </div>
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