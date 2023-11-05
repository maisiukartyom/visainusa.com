import {ChatEngineWrapper, ChatSocket, ChatFeed} from 'react-chat-engine';

const ChatEngine = props => {
    props.visible && console.log(props.chat)
    return(
        <div
            className='transition-5'
            style={
                {
                    height: '100%',
                    zIndex: '100',
                    width: '100%',
                    backgroundColor: 'white'
                }
            }
            >
                {
                    props.visible &&
                    <ChatEngineWrapper>
                        <ChatSocket
                            projectID={process.env.REACT_APP_PROJECT_ID}
                            chatID={props.chat.id}
                            chatAccessKey={props.chat.access_key}
                            senderUsername={props.user.username}
                            />   

                        <ChatFeed activeChat={props.chat.id}/>
                    </ChatEngineWrapper>
                }
        </div>
    )
}

export default ChatEngine