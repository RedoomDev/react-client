import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { BoardContext } from "../contexts/board.context";
import SettingsWindow from "./settingsWindow";
import Select from 'react-select'
import { CurrentBoard } from "../contexts/currentBoard.context";
import { PostWindow } from "./postWindow";


export function Navbar() {

   const [input, setInput] = useState("")
   const [modal, setModal] = useState(false)
   const [newPost, setNewPost] = useState(false)
   const history = useHistory()

   const [options, setOptions] = useState([{
      'label': "Anasayfa",
      'value': ""
   }])

   const { slug } = useParams()

   const value = useContext(BoardContext)
   const currentBaord = useContext(CurrentBoard)

   useEffect(() => {
      value[0].sort((a, b) => { return b.posts - a.posts }).map(a => {
         setOptions(old => [...old, {
            'label': a.baslik.length > 20 ? (a.baslik.slice(0, 20) + "...") : (a.baslik),
            'value': a.slug
         }])
      })

      if (slug) {
         currentBaord[1](value[0].find(a => a.slug === slug).baslik)
      } else {
         currentBaord[1]("Anasayfa")
      }
   }, [setOptions, currentBaord, slug])


   const customStyles = {
      control: () => ({
         backgroundColor: 'rgb(47, 47, 53)',
         minHeight: 38,
         display: 'flex',
         borderRadius: 5
      }),
      singleValue: () => ({
         color: 'white',
         display: 'flex',
         gridArea: '1 / 1 / 2 / 3',
         fontSize: 22,
         padding: 8,
         borderRadius: 5
      })
   }

   return (
      <BoardContext.Consumer>
         {value => (
            <div className="w-screen" style={{ backgroundColor: "rgb(24 24 27)" }}>
               <div style={{ paddingTop: 10 }}></div>
               <div id="navbar-main">
                  <div className="navbar-brand-area">
                     <div className="navbar-brand">
                        <Link to="/" className="text-5xl">Redoom</Link>
                     </div>
                     <div className="navbar-select-sey">
                        <Select
                           classNamePrefix="react-select"
                           options={options} defaultValue={{
                              'label': slug ? (value[0].find(a => a.slug === slug).baslik.length > 20 ? (value[0].find(a => a.slug === slug).baslik.slice(0, 20) + "...") : (value[0].find(a => a.slug === slug).baslik) || currentBaord[0].length ? (currentBaord[0].length > 20 ?(currentBaord[0].slice(0, 20) + "...") : (currentBaord[0])) : ("")) : (currentBaord[0].length ? (currentBaord[0].length > 1 ?(currentBaord[0].slice(0, 20) + "...") : (currentBaord[0])) : ("") || "Anasayfa")
                           }}
                           key="select"
                           onChange={(e) => {
                              if (e.value) {
                                 history.push("/konu/" + e.value)
                                 currentBaord[1](e.label)
                              } else {
                                 history.push("/")
                                 currentBaord[1]("Anasayfa")
                              }
                           }}
                           className="react-select-container"
                           styles={customStyles}
                        ></Select>
                     </div>
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
                           setNewPost(true)
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
               {newPost ? (
                  <PostWindow setModal={setNewPost} />
               ) : (<></>)}
            </div>
         )
         }
      </BoardContext.Consumer >
   )
}