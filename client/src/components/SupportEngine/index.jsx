import Avatar from './Avatar';
import { useRef, useState, useEffect } from 'react';
import SupportWindow from './SupportWindow'
import axios from '../../api/axios';

const SupportEngine = ({user}) => {

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const [visible, setVisible] = useState(false)
    const [chat, setChat] = useState(null)
    const [chatUser, setChatUser] = useState(null)

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setVisible(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useEffect(() => {
        async function getChat () {
            if (!user.isAdmin){
                axios.put(
                    'https://api.chatengine.io/users/',
                    {
                        "username": user.email,
                        "secret": user.email,
                        "email": user.email
                    },
                    {headers: {"Private-Key": process.env.REACT_APP_CHAT_SECRET}}
                ).then(r => setChatUser(r.data))
    
                axios.put(
                    'https://api.chatengine.io/chats/',
                    {
                        "usernames": ["Alexey", user.email],
                        "is_direct_chat": true
                    },
                    {headers: {"Private-Key": process.env.REACT_APP_CHAT_SECRET}}
                ).then(r => setChat(r.data))
            }
        }

        getChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div ref={wrapperRef}>
            <SupportWindow visible={visible} chat={chat} user={chatUser}/>
            <Avatar 
                onClick={() => setVisible(prev => !prev)}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    zIndex: '1000',
                    right: '24px',
                }}
            />
        </div>
    )
}

export default SupportEngine
