

import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({children}) => {
  
    const token = sessionStorage.getItem("token");

    return token ? children : <Navigate to="/login"/>

}


