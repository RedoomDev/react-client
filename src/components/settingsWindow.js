import { useEffect, useState } from "react"




export default function SettingsWindow({ setModal }) {

   const [fontsize, setFontsize] = useState("")
   const [background, setBackground] = useState("")
   const [username, setUsername] = useState("")
   const [message, setMessage] = useState("")

   useEffect(() => {
      setBackground(localStorage.getItem("background"))
      setUsername(localStorage.getItem("username") || "Anonymous")
      setFontsize(localStorage.getItem("contentTextSize") || "18")
      setMessage("")
   }, [])

   return (
      <div className="fullscreen-modal-window">
         <div className="window bg-zinc-900">
            <div className="form">
               <span className="post-comment-button" onClick={() => setModal(false)}>[Kapat]</span>
               <div className="form-label">{message}</div>
               <div className="form-label">Kullanıcı Adı</div>
               <input className="form-input bg-zinc-800" value={username} onChange={(e) => {
                  setUsername(e.target.value)
                  setMessage("")
               }}></input>
               <div className="form-label">Arkaplan URL</div>
               <input className="form-input bg-zinc-800" value={background} onChange={(e) => {
                  setBackground(e.target.value)
                  setMessage("")
               }}></input>
               <div className="form-label">İçerik Yazı Boyutu</div>
               <input className="form-input bg-zinc-800" value={fontsize} type="number" max={24} min="10" onChange={(e) => {
                  setFontsize(e.target.value)
                  setMessage("")
               }}></input>
               <div className="form-button bg-zinc-800" onClick={(e) => {
                  localStorage.setItem("background", background)
                  localStorage.setItem("username", username)
                  localStorage.setItem("contentTextSize", fontsize)
                  setMessage("Ayarlar Kaydedildi")
                  window.location.href = ""
               }}>Ayarları Kaydet</div>
            </div>
         </div>
      </div>
   )
}