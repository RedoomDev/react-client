
export default function ImageWindow({ setSelected, selected }) {


   return (
      <div className="fullscreen-modal-window">
         <div className="window bg-zinc-900">
            <div className="form">
               <span className="post-comment-button" onClick={() => setSelected("")}>[Kapat]</span>
               <div>
                  <img className="selected-image" src={selected}></img>
               </div>
            </div>
         </div>
      </div>
   )
}