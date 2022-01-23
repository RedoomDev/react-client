import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContext } from './contexts/auth.context';
import { BoardContext } from './contexts/board.context';
import { PostContext } from './contexts/post.context';
import { GetBoards, GetPosts } from './fetch/fetchs';


function Index() {

   const [allBoards, setAllBoards] = useState([])
   const [posts, setPosts] = useState([])
   const [authData, setAuthData] = useState({})
   const [fetch, setFetch] = useState(false)

   useEffect(() => {
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
   }, [])

   return (
      <React.StrictMode>
         <BoardContext.Provider value={[allBoards, setAllBoards]}>
            <PostContext.Provider value={[posts, setPosts]}>
               <AuthContext.Provider value={[authData, setAuthData]}>
                  {fetch === true ? (<App />) : (<></>)}
               </AuthContext.Provider>
            </PostContext.Provider>
         </BoardContext.Provider>
      </React.StrictMode>
   )
}

ReactDOM.render(<Index />, document.getElementById('root'))


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
