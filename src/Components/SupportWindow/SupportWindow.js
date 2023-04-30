import React, { useState, useEffect } from 'react'
import './SupportWindow.css'

import EmailForm from './EmailForm'
import Conversation from './Conversation'
import useAuth from '../../hooks/authHooks'

const SupportWindow = props => {

  const { isAuthenticated, removeToken } = useAuth();
  const [localAccess, setLocalAccess] = useState(false)
  console.log('localAccess', localAccess);

  useEffect(() => {
    if (localStorage.getItem('access')) {
      setLocalAccess(true)
    }
  }, [])

  return (
    <div
      className='Support_window_transition'
      style={{
        height: '480px',
        width: '60%',
        background: 'white',
        bottom: '70px',
        right: props.visible ? '250px' : '-1000px',
        position: 'fixed',
        overflow: 'hidden',
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
        zIndex: '10000',
        borderColor: '#0C6395',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '10px',
        opacity: props.visible ? '1' : '0'

      }}
    >
      {/* {isAuthenticated ?
        <Conversation />:
        <EmailForm />
      } */}
      <Conversation/>

    </div>
  )
}

export default SupportWindow
