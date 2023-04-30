import React, { useState, useEffect } from 'react'
import './Chatbot.css'
import { motion } from "framer-motion"

const Chatbot = props => {

    const [hovered, setHovered] = useState(false)
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
          setShouldAnimate(true);
        }, 5000); // 5 minutes in milliseconds
    
        return () => clearInterval(interval);
      }, []);

    return (
        <>
            <div className='chatbot_div_main'
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => props.onClick && props.onClick()}
            >


                {hovered ?
                    <motion.div>
                        <img src='/images/chatbot.png' className='transition_div'
                            style={{ height: '64px', width: '65px', marginLeft: '7px', marginTop: '7px' }} />
                    </motion.div>
                    :
                    <motion.div 
                        animate={shouldAnimate ? { rotate: [0, 360, 0, 0, 0, 0],
                            x: [0, -100, -100, 0, 0, 0] }: {}}  
                        transition={{duration: 5}}
                        onAnimationComplete={() => setShouldAnimate(false)}
                    >
                        <img src='/images/chatbot.png' className='transition_div'
                            style={{ height: '49px', width: '50px', marginLeft: '15px', marginTop: '15px' }} />
                    </motion.div>
                }
            </div>
        </>
    )
}

export default Chatbot
