import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Loader from "react-js-loader";
import { AuthContext } from './contexts/auth.context';
import { BoardContext } from './contexts/board.context';
import { PostContext } from './contexts/post.context';
import { GetAuthData, GetBoards, GetPosts } from './fetch/fetchs';
import { CurrentBoard } from './contexts/currentBoard.context';


function Index() {

   const [allBoards, setAllBoards] = useState([])
   const [posts, setPosts] = useState([])
   const [currentBoard, setCurrentBoard] = useState("")
   const [authData, setAuthData] = useState({})
   const [fetch, setFetch] = useState(false)



   useEffect(() => {

      var username = localStorage.getItem("username")
      var contentTextSize = localStorage.getItem("contentTextSize")
      if (!username) localStorage.setItem("username", "Anonymous")
      if (!contentTextSize) localStorage.setItem("contentTextSize", "18")

      GetAuthData().then(auth => {
         if (auth.message === "success") {
            setAuthData(auth.data)
         } else {
            setAuthData({
               admin: false
            })
         }
         GetBoards().then(res => {
            if (res.data) {
               setAllBoards(res.data)
               GetPosts().then(res => {
                  if (res.data) {
                     setPosts(res.data)
                     setFetch(true)
                  }
               })
            }
         })
      })
   }, [])

   return (
      <>

         <div className='redoom-for-pc'>
            <React.StrictMode>
               <CurrentBoard.Provider value={[currentBoard, setCurrentBoard]}>
                  <BoardContext.Provider value={[allBoards, setAllBoards]}>
                     <PostContext.Provider value={[posts, setPosts]}>
                        <AuthContext.Provider value={[authData, setAuthData]}>
                           {fetch === true ? (<App />) : (
                              <div style={{ marginTop: '20%' }}>
                                 <Loader type="box-rectangular">

                                 </Loader>
                              </div>
                           )}
                        </AuthContext.Provider>
                     </PostContext.Provider>
                  </BoardContext.Provider>
               </CurrentBoard.Provider>
            </React.StrictMode>
         </div>

      </>

   )
}

ReactDOM.render(<Index />, document.getElementById('root'))


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
