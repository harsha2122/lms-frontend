import React, { useState, useRef, useEffect } from 'react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, ConversationHeader, Avatar, StarButton, InfoButton, } from '@chatscope/chat-ui-kit-react';
import pic from '../User/programmer.png'
import Header from '../Header'
import io from 'socket.io-client'
import { useAuth } from '../../Auth/auth'
import { useParams } from 'react-router-dom'
import Courses from './Courses'
import { getSocket } from './Service/socket'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
// const socket = io.connect(process.env.REACT_APP_SERVER)

const Discussion = () => {

  const [socket, setSocket] = useState();
  const { slug } = useParams();
  
  useEffect(() => {
    const tmpSocket = getSocket();
    setSocket(tmpSocket);
    tmpSocket.emit('join', slug);

    tmpSocket.off('receivedMessage').on('receivedMessage', (message) => {
      console.log("received msg", message)
      console.log("all messages : ", messages)
      setMessages(messages => [...messages, message]);
      // console.log(messages)
    });

    tmpSocket.on('disconnect', function () {
      // connected = false;
      toast.error('disconnected');
      // content.html("<b>Disconnected! Trying to automatically to reconnect in " +                   
      //               RETRY_INTERVAL/1000 + " seconds.</b>");
      // retryConnectOnFailure(RETRY_INTERVAL);
    });
    // tmpSocket.off('MY_EVENT', doThisOnlyOnce).on('MY_EVENT', doThisOnlyOnce);
    tmpSocket.off('allmessage').on('allmessage', (data) => {
      console.log("allmessage", data)
      setMessages(data.messages);
    })

    tmpSocket.on("error", (error) => {
      console.log("errorr : ", error);
    });
    //   return () => {
    //     tmpSocket.off('allmessage');
    //  };

    return () => {
      tmpSocket.close();
    }
  }, []);


  const token = Cookies.get('token')
  const userRole = Cookies.get('userRole')
  const userName = Cookies.get('userName')
  const auth = useAuth()
  // const token = auth.token
  // const userName = auth.userName
  const inputRef = useRef();
  const [msgInputValue, setMsgInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = message => {

    // console.log("handleSubmit",messages)
    // setMessages(messages=>[...messages, {     
    // message,
    // direction: 'outgoing',  
    // }]);
    const data = {
      user: userName,
      message,
      room: slug
    }

    socket.emit('sendMessages', data)
    setMessages(messages => [...messages, data]);
    setMsgInputValue("");
    inputRef.current.focus();
    // console.log("after handleSubmit",messages)
  };

  // useEffect(() => {
  //   socket.emit('join', slug)
  //   // console.log("UserName:",userName)
  //   //   return () => {
  //   //     socket.off('join');
  //   //  };
  // }, [])

  /*
  useEffect(() => {
    if(socket){
      socket.off('receivedMessage').on('receivedMessage', (message) => {
        console.log("received msg", message)
        console.log("all messages : ", messages)
        setMessages(messages => [...messages, message]);
        // console.log(messages)
      });

      socket.on('disconnect', function () {
        // connected = false;
        toast.error('disconnected');
        // content.html("<b>Disconnected! Trying to automatically to reconnect in " +                   
        //               RETRY_INTERVAL/1000 + " seconds.</b>");
        // retryConnectOnFailure(RETRY_INTERVAL);
      });
      // socket.off('MY_EVENT', doThisOnlyOnce).on('MY_EVENT', doThisOnlyOnce);
      socket.off('allmessage').on('allmessage', (data) => {
        console.log("allmessage", data)
        setMessages(data.messages);
      })

      socket.on("error", (error) => {
        console.log("errorr : ", error);
      });
      //   return () => {
      //     socket.off('allmessage');
      //  };
    }
  }, [socket])
*/

  return (
    <div className='relative '>

      <div className='sticky top-0 z-50'>
        <Header />
      </div>
      <aside className="flex flex-row ">

      <div className='flex -mt-6 '>
                        <Courses courseId={slug} />
                    </div>
          <div className='w-full -mt-3 h-screen'>
          <MainContainer>
            <ChatContainer>
              <ConversationHeader>
                <Avatar src={pic} name="Discussion" />
                <ConversationHeader.Content userName="Discussion" info="" />
                <ConversationHeader.Actions>
                </ConversationHeader.Actions>
              </ConversationHeader>
              <MessageList scrollBehavior="smooth" >
                {/* {console.log("common",messages)} */}
                {
                  messages.map((m, i) => {
                    return (
                      <Message key={i} model={m}>
                        {/* <Message.Header sender="Emily" sentTime="just now" /> */}
                        console.log(m.user)
                        <Message.Header sender={(m.user === userName) ? 'You' : m.user} />
                      </Message>

                    )
                  })
                }
              </MessageList>
              <MessageInput placeholder="Type message here" onSend={handleSend} onChange={setMsgInputValue} value={msgInputValue} ref={inputRef} />
            </ChatContainer>
          </MainContainer>
          </div>
      </aside>
    </div>
    // <>
    //   <input placeholder="Message" />
    //   <button onClick={sendMessage}>Send</button>
    // </>

  )
}

export default Discussion