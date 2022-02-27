import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const ProtectedRoutes = ({
  auth,
  component: Component,
  ...rest
}) => {
  return <>
    <Route {...rest}
      render={(props) => {
        if (auth) {
          return <Component />;
        } else {
          return <Redirect to={{ path: '/login', state: { from: props.location } }} />
        }
      }} />
  </>
}

export default ProtectedRoutes
