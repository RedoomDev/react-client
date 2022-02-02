import { useContext } from "react"
import { Link } from "react-router-dom"
import { BoardContext } from "../../contexts/board.context"
import { AdminPost } from "./fetchs"



export default function BoardIndex() {

   const [board, setBoard] = useContext(BoardContext)


   return (
      <div className="admin-main">
         <div className="post-head">
            <span className="post-head-text" style={{ fontSize: 25 }}>Konu Sistemi</span>
            <Link to="/admin/board/new" className="post-head-text" style={{ fontSize: 25, float: 'right', marginRight: 20 }}>Yeni Board</Link>
            <div className="cizgi-2"></div>
         </div>
         <div className="admin-main-area">
            <div className="admin-main-area-list">
               {board.map((a, idx) => (
                  <div className="admin-main-area-item bg-zinc-800">
                     <div>
                        <div className="admin-main-area-item-head">
                           {a.baslik}
                        </div>
                        <div className="admin-main-area-details">
                           {a.about}
                        </div>
                     </div>
                     <div>
                        <div className="admin-main-area-action-items">
                           <div className="admin-button delete" type="button" 
                           onClick={() => {
                              AdminPost({ endpoint: "/admin/board/delete/" + a.slug }).then(res => {
                                 if(res.message){
                                    window.location.href = ""
                                 }
                              })
                           }}>
                              Sil
                           </div>
                           <Link className="admin-button edit" type="button">
                              Düzenle
                           </Link>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}