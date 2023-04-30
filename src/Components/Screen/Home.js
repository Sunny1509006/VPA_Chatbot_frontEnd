import React from 'react'
import ChatbotView from "../SupportWindow/ChatbotView";
import HomePage from '../Common/HomePage';
import BodyHead from '../Common/BodyHead';

const Home = () => {
  return (
    <div>
      <BodyHead />
      <HomePage />
      <ChatbotView />
    </div>
  )
}

export default Home
