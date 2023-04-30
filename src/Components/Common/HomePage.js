import React from 'react'
import { Helmet } from 'react-helmet'
import './HomePage.css'

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <img src="/images/Background_top.png" style={{
        width: '100%',
        marginTop: '80px',
      }} />
      <div style={{
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}>
        <p style={{ fontSize: '30px' }}>ভিপিএ সার্ভিস আওতাভুক্ত প্রতিস্থান সমূহ</p>
        <div style={{
          display: 'flex',
          // padding: '20px'
        }}>
          <div className='each_div'>
            <img src='/images/Background.png' />
          </div>
          <div className='each_div'>
            <img src='/images/Background.png' />
          </div>
          <div className='each_div'>
            <img src='/images/Background.png' />
          </div>
          <div className='each_div'>
            <img src='/images/Background.png' />
          </div>
        </div>
        <div style={{
          display: 'flex',
          // padding: '20px'
        }}>
          <div className='each_div'>
            <img src='/images/Background.png' />
          </div>
          <div className='each_div'>
            <img src='/images/Background.png' />
          </div>
          <div className='each_div'>
            <img src='/images/Background.png' />
          </div>
          <div className='each_div'>
            <img src='/images/Background.png' />
          </div>
        </div>
      </div>
      <img src="/images/Background_bottom.png" style={{
        width: '100%',
      }} />
    </div>
  )
}

export default HomePage
