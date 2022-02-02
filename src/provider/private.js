import React, { useContext, useEffect, useState } from "react"
import { Redirect, Route, useHistory } from "react-router-dom"
import { AuthContext } from "../contexts/auth.context"
import { PostContext } from "../contexts/post.context"
import { GetAuthData } from "../fetch/fetchs"

export const PrivateRoute = ({ component: Component, ...rest }) => {

   const [isFetch, setFetch] = useState(false)
   const [authData, setAuthData] = useContext(AuthContext)

   const history = useHistory()

      console.log(authData)

   useEffect(() => {
      if(authData.admin === true){
         setFetch(true)
      } else {
         history.push('/admin/login')
      }
   }, [history])

   if (isFetch === false) {
      return (
         <></>
      )
   } else {
      return (
         <Route
            {...rest}
            render={props =>
               localStorage.getItem("token") ? (
                  <>
                     <Component {...props} />
                  </>
               ) : (
                  <Redirect to={{
                     pathname: '/login',
                     state: { from: props.location }
                  }}></Redirect>
               )}
         ></Route>
      )
   }
}
