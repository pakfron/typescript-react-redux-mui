import React from 'react'
import { useSelector } from 'react-redux'
import { authSelector } from '../store/Slice/authSlice'
import { Navigate } from 'react-router-dom'


export default function AuthenticatedUser({children}:any) {

    const authReducer = useSelector(authSelector)
    
    if(authReducer.accessToken!==""){
       return <Navigate to={'/'}/>
      
    }

  return (
    children
  )
}