import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import { NewPost } from "../fetch/fetchs"



export function PostWindow({ setModal, board }) {

   const [username, setUsername] = useState("")
   const [baslik, setBaslik] = useState("")
   const [icerik, setIcerik] = useState("")
   const [err, setErr] = useState("")

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   return (
      <div className="fullscreen-modal-window">
         <div className="window bg-zinc-900">
            <div className="form">
               <span className="post-comment-button" type="button" onClick={() => setModal(false)}>[Kapat]</span>
               <div className="post-error">{err}</div>
               <div className="form-label">Kullanıcı Adı</div>
               <input className="form-input bg-zinc-800" onChange={(e) => {
                  setUsername(e.target.value)
               }}></input>
               <div className="form-label">Başlık</div>
               <input className="form-input bg-zinc-800" onChange={(e) => {
                  setBaslik(e.target.value)
               }}></input>
               <div className="form-label">İçerik</div>
               <textarea className="form-input bg-zinc-800" maxLength="5000" onChange={(e) => {
                  setIcerik(e.target.value)
               }}></textarea>
               <span>{icerik.length} / 5000</span>
               <div className="form-button bg-zinc-800" type="button" onClick={() => {
                  NewPost({ username, icerik, board, baslik }).then(res => {
                     console.log(res)
                     if (res.message) {
                        setErr(res.message)
                     }
                     if (res.post) {
                        return window.location.href = ""
                     }
                  })
               }}>Yorumu Gönder</div>
            </div>
         </div>
      </div>
   )
}