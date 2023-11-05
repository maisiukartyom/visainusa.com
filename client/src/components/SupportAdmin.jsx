import React from 'react';

import { ChatEngine } from 'react-chat-engine'
import { PrettyChatWindow } from 'react-chat-engine-pretty';
import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from 'react-chat-engine-advanced';

const SupportAdmin = () => {
  const chatProps = useMultiChatLogic(
    process.env.REACT_APP_PROJECT_ID,
    'Alexey',
    'alexey@gmail.com'
  );
  return (
    <ChatEngine 
      projectID={process.env.REACT_APP_PROJECT_ID}
      userName='Alexey'
      userSecret='alexey@gmail.com'
      height='calc(100vh - 12px)'
    />

  //   <PrettyChatWindow
  //   projectId={process.env.REACT_APP_PROJECT_ID}
  //   username='Alexey'
  //   secret='alexey@gmail.com'
  //   style={{ height: '300vh' }}
  // />
    // <>
    //   <MultiChatWindow {...chatProps} />
    //   <MultiChatSocket {...chatProps} />
    // </>
  );
}

export default SupportAdmin