import React, { useState, useEffect, useRef } from 'react'
import './Conversation.css'
import axios from 'axios'
import { BsMicFill, BsMicMuteFill } from 'react-icons/bs'
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2"
import ScrollToBottom from 'react-scroll-to-bottom';
import { Button } from 'react-bootstrap';
import useAuth from '../../hooks/authHooks'

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new speechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = "bn-BD"

const URL_REGEX =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

function Text({ content }) {
    const words = content.split(' ');
    return (
        <p>
            {words.map((word) => {
                return word.match(URL_REGEX) ? (
                    <>
                        <a href={word} style={{ color: 'blue' }}>{word}</a>{' '}
                    </>
                ) : (
                    word + ' '
                );
            })}
        </p>
    );
}


const Conversation = () => {

    const { user } = useAuth()

    const [isListening, setIsListening] = useState(true)
    const [note, setNote] = useState(null)
    const [savedNotes, setSavedNotes] = useState([])

    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState([])
    // const [selectedItem, setSelectedItem] = useState("");

    const [audioSrc, setAudioSrc] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.useRef(null);

    const messagesEndRef = useRef(null);

    const handleQuestion = (e) => {
        setQuestion(e.target.value)
    }
    const handleClick = (item) => {
        // setSelectedItem(item);
        setQuestion(item)
        handleSubmit()
    };
    // console.log(selectedItem);

    useEffect(() => {
        if (answer.length > 0) {
            const lastAnswer = answer[answer.length - 1];
            // console.log(lastAnswer)
            if (lastAnswer.author === "user") {
                axios.post("http://143.110.241.20:5001/api/vpa/response/",
                    lastAnswer.content,
                    {

                        "headers": {

                            "content-type": "application/json",
                            // 'Access-Control-Allow-Origin': '*',
                            // 'Access-Control-Allow-Credentials': 'true',


                        },


                    })
                    .then(result => {
                        // console.log(result.data.response)
                        setAnswer([...answer, { author: 'bot', content: result.data.response }]);
                        handleFetchAudio(result.data.response)

                    })
                    .catch(error => {
                        alert("error")
                    });

            }
        }
    }, [answer]);

    const handleFetchAudio = async (data) => {
        try {
            const response = await axios.post("http://143.110.241.20:5050/api/v1/tts/",
                data,
                {
                    responseType: "blob",
                },
                {

                    "headers": {

                        "content-type": "application/json",
                        // 'Access-Control-Allow-Origin': '*',
                        // 'Access-Control-Allow-Credentials': 'true',

                    },
                }
            );
            const blob = new Blob([response.data], { type: "audio/mpeg" });
            setAudioSrc(URL.createObjectURL(blob));
            // setIsPlaying(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (question.trim() !== "") {
            setAnswer([...answer, { author: "user", content: question }]);
            setQuestion("");
        }
        setIsPlaying(false);
    };


    useEffect(() => {
        handleListen()

    }, [isListening])

    const handleListen = () => {
        if (!isListening) {
            mic.start()
            mic.onend = () => {
                console.log('continue')
                mic.start()
            }
        }
        else {
            mic.stop()
            mic.onend = () => {
                console.log('stopped mic onclick')
            }
        }
        mic.onstart = () => {
            console.log('mics on')
        }

        mic.onresult = event => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
            setNote(transcript)
            // console.log(transcript)
            setQuestion(transcript)
            mic.onerror = event => {
                // console.log(event.error)
            }
        }
    }

    const handleSaveNote = () => {
        setSavedNotes([...savedNotes, note])
        setNote('')
    }

    const handleSpeakClick = () => {
        const utterance = new SpeechSynthesisUtterance("আমি ");
        utterance.lang = 'bn-BD';
        window.speechSynthesis.speak(utterance);
    };

    const [text, setText] = useState("");

    //   const handleTextChange = (event) => {
    //     setText(answer.content);
    //   };


    return (
        <div className='ConversationMainDiv'>
            <div style={{
                height: '35px',
                width: '100%',
                backgroundColor: '#0C6395',
            }}>
                <p style={{
                    color: 'white',
                    padding: '3px 10px',
                    fontWeight: 'bold',
                }}>Virtual Private Assistant</p>
            </div>
            {/* <div style={{
                height: '22px',
                width: '100%',
                backgroundColor: 'white',
            }}>
                <marquee behavior="scroll" direction="left">
                    <p style={{
                        color: 'red',
                        padding: '3px 10px',
                        fontFamily: 'Kalpurush',
                        fontSize: '12px'
                    }}>
                        বিশেষ দ্রষ্টব্যঃ কৃত্তিম বুদ্ধিমত্তা বিশিষ্ট চ্যাটবটটি উন্নয়ন প্রক্রিয়াধীন। জিজ্ঞাসিত প্রশ্নের উত্তর সন্তোষজনক না হলে মার্জনীয় এবং প্রয়োজনে ১৬১২২ নাম্বারে কল করুন।
                    </p>
                </marquee>
            </div> */}

            <ScrollToBottom className='conversation_chat_div' >

                {answer.map((answer, index) => (
                    <div key={index}>
                        {(answer.author === "bot") ?
                            <>
                                <div className='left' >
                                    <div className='left_inside'>
                                        {Array.isArray(answer.content) ?
                                            <>
                                                {(answer.content).map((item, index) => {
                                                    if (index > 0 && index < answer.content.length - 1) {
                                                        return (
                                                            <div key={index} onClick={() => handleClick(item)}
                                                                style={{ cursor: "pointer" }}
                                                                onMouseOver={(e) => (e.target.style.color = "blue")}
                                                                onMouseOut={(e) => (e.target.style.color = "black")}
                                                            >
                                                                <Text content={item} />
                                                            </div>
                                                        )
                                                    }
                                                    else {
                                                        return (
                                                            <div key={index}>
                                                                <Text content={item} />
                                                            </div>
                                                        )
                                                    }

                                                })}
                                            </>
                                            :
                                            <>
                                                <Text content={answer.content} />
                                            </>
                                        }
                                    </div>
                                </div>
                                <img
                                    src="/images/chatbot.png" style={{
                                        height: '40px',
                                        width: '40px',
                                        marginTop: '12px',
                                        marginLeft: '8px',
                                        float: "left",
                                    }} />
                            </>
                            :
                            <>
                                <img
                                    src={user?.profile_image ? ` https://bhumipedia.land.gov.bd${user.profile_image}` : "/images/profile.png"} style={{
                                        height: '40px',
                                        width: '40px',
                                        marginTop: '12px',
                                        marginRight: '8px',
                                        float: "right",
                                    }} />
                                <div className='right'>
                                    <div className="right_inside">
                                        {answer.content}
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                ))}
                {/* <Button type="button" onClick={handleSpeakClick}>Speak</Button> */}
                {audioSrc && (
                    <div style={{
                        marginLeft: '45%',
                        marginTop: '0px',
                        // background: 'black',

                    }}>
                        <audio src={audioSrc} ref={audioRef} />
                        <Button onClick={handlePlayPause} style={{
                            background: 'none',
                        }}>
                            {isPlaying ?
                                <HiSpeakerXMark fontSize={24} style={{
                                    color: '#0C6395',
                                }} />
                                :
                                <HiSpeakerWave fontSize={24} style={{
                                    color: '#0C6395',
                                }} />}
                        </Button>
                    </div>
                )}
            </ScrollToBottom>
            <form onSubmit={handleSubmit}>

                <div className="conversation_input">
                    <button type="button"
                        onClick={() => setIsListening(prevState => !prevState)}
                        style={{
                            marginTop: '10px',
                            marginLeft: '10px',
                            position: 'fixed',
                            border: 'none',

                        }}>
                        {isListening ?
                            <BsMicMuteFill fontSize={18} style={{ color: 'blue' }} />
                            :
                            <BsMicFill fontSize={18} style={{ color: 'blue' }} />

                        }
                    </button>
                    <input type="text" className='msg_send' placeholder="এখানে লিখুন" name="msg"
                        value={question}
                        onChange={handleQuestion}
                    />
                    <button type="button" className="send" id="reply"
                        onClick={handleSubmit}
                    >পাঠান <i className="fas fa-paper-plane"></i></button>
                </div>
            </form>
        </div>
    )
}

export default Conversation
