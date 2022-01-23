import { Link } from "react-router-dom";


export function Navbar() {

   return (
      <div className="w-screen bg-zinc-900 ">
         <div style={{ paddingTop: 10 }}></div>
         <span className="text-5xl" style={{ margin: 20 }}>Redoom</span>
         <div className="text-2xl text-center">
            <Link to={"/asdasd"} style={{ marginRight: 10 }}>Boards</Link>
            <Link to={"/asdasd"} style={{ marginRight: 10 }}></Link>
            <Link to={"/asdasd"} style={{ marginRight: 10 }}>Boards</Link>
            <Link to={"/asdasd"} style={{ marginRight: 10 }}>Boards</Link>
            <Link to={"/asdasd"} style={{ marginRight: 10 }}>Boards</Link>
         </div>
         <div style={{ paddingBottom: 10 }}></div>
      </div>
   )
}