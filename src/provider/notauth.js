import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context';


export const NotAuth = ({ component: Component, ...rest }) => {

   const [authData, setAuthData] = useContext(AuthContext)

   return (
      <Route
         {...rest}
         render={props =>
            authData.admin === true ? (
               <Redirect to={{
                  pathname: '/admin',
                  state: { from: props.location }
               }}></Redirect>
            ) : (
               <div>
                  <Component {...props} />
               </div>
            )}
      ></Route>
   )
}