import { Link } from "react-router-dom";
import SidebarHead from "./components/sidebarHead";


export default function AdminSidebar() {

   return (
      <div className="admin-sidebar">
         <SidebarHead></SidebarHead>
         <div className="admin-sidebar-items">
            <div>
               <Link to="/admin" className="admin-sidebar-item">
                  Sistem Durumu
               </Link>
            </div>
            <div>
               <Link to="/admin" className="admin-sidebar-item">
                  Grafikler
               </Link>
            </div>
            <div>
               <Link to="/admin" className="admin-sidebar-item">
                  Board Yönetimi
               </Link>
            </div>
            <div>
               <Link to="/admin" className="admin-sidebar-item">
                  Kullanıcılar
               </Link>
            </div>
            <div>
               <Link to="/admin" className="admin-sidebar-item">
                  Postlar
               </Link>
            </div>
         </div>
      </div>
   )
}