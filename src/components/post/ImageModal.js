
export default function ImageWindow({ setSelected, selected }) {


   return (
      <div className="fullscreen-modal-window">
         <div className="window2 bg-zinc-900">
            <div className="form">
               <i className="close-button fa fa-x" onClick={() => setSelected("")} ></i>
               <div>
                  <img className="selected-image" src={selected}></img>
               </div>
            </div>
         </div>
      </div>
   )
}