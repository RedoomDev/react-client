import { useEffect, useState } from "react"




export default function SettingsWindow({ setModal }) {

   const [background, setBackground] = useState("")
   const [username, setUsername] = useState("")
   const [message, setMessage] = useState("")

   useEffect(() => {
      setBackground(localStorage.getItem("background"))
      setUsername(localStorage.getItem("username") || "Anonymous")
      setMessage("")
   }, [])

   return (
      <div className="fullscreen-modal-window">
         <div className="window bg-zinc-900">
            <div className="form">
               <span className="post-comment-button" type="button" onClick={() => setModal(false)}>[Kapat]</span>
               <div className="form-label">{message}</div>
               <div className="form-label">Kullanıcı Adı</div>
               <input className="form-input bg-zinc-800" value={username} onChange={(e) => {
                  setUsername(e.target.value)
                  setMessage("")
               }}></input>
               <span className="post-comment-button" type="button" onClick={() => setModal(false)}>[Kapat]</span>
               <div className="form-label">Arkaplan URL</div>
               <input className="form-input bg-zinc-800" value={background} onChange={(e) => {
                  setBackground(e.target.value)
                  setMessage("")
               }}></input>
               <div className="form-button bg-zinc-800" type="button" onClick={(e) => {
                  localStorage.setItem("background", background)
                  localStorage.setItem("username", username)
                  setMessage("Ayarlar Kaydedildi")
               }}>Ayarları Kaydet</div>
            </div>
         </div>
      </div>
   )
}