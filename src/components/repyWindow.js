import { useState } from "react/cjs/react.development"



export function ReplyWindow({ setModal }) {

   const [username, setUsername] = useState("")
   const [icerik, setIcerik] = useState("")


   return (
      <div className="fullscreen-modal-window">
         <div className="window bg-zinc-900">
            <div className="form">
               <span className="post-comment-button" type="button" onClick={() => setModal(false)}>[Kapat]</span>
               <div className="form-label">Kullanıcı Adı</div>
               <input className="form-input bg-zinc-800" onChange={(e) => {
                  setUsername(e.target.value)
               }}></input>
               <div className="form-label">İçerik</div>
               <textarea className="form-input bg-zinc-800" maxLength="5000" onChange={(e) => {
                  setIcerik(e.target.value)
               }}></textarea>
               <span>{icerik.length} / 5000</span>
               <div className="form-button bg-zinc-800" type="button">Yorumu Gönder</div>
            </div>
         </div>
      </div>
   )
}