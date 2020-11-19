import React, { useState, useEffect } from 'react';
import db from '../firebase';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/lib/userSlice';
import { selectThreadId, selectThreadName } from '../features/lib/threadSlice';
import Message from './Message';
import ModalAlert from './Alert/ModalAlert';

import {
  MicNoneOutlined,
  MoreHoriz,
  TimerOutlined,
  SendRounded,
  AttachFileOutlined,
  EmojiEmotionsOutlined
} from '@material-ui/icons';
import { 
  Avatar, 
  IconButton  
} from '@material-ui/core';
import './Thread.css';

const Thread = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const [showModalAlert, setShowModalAlert] = useState(false);

  const user = useSelector(selectUser);
  const threadId = useSelector(selectThreadId);
  const threadName = useSelector(selectThreadName);

  useEffect(() => {
    if (threadId) {
      db.collection('threads')
        .doc(threadId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => 
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [threadId]);

  const sendMessage = (event) => {
    event.preventDefault();

    //firebase
    db.collection('threads')
      .doc(threadId)
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
      }).then(() => {
        setInput('');
      });
  }

  const startTimeOut = (input, uid) => {
    console.log('this worked!');
    db.collection('threads')
      .doc(threadId)
      .collection('messages')
      .where('message', '==', input)
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              console.log('Message successfully deleted!');
            })
            .catch(function (error) {
              console.log('Error removing message: ', error);
            });
        });
      });
  };

  return (
    <div className="thread">
      <div className="thread__header">
        <div className="thread__header__contents">
          <Avatar />
          <div className="thread__header__contents__info">
            <h4>{threadName}</h4>
            <h5>
              Last seen{' '}
            </h5>
          </div>
        </div>
        <IconButton onClick={() => setShowModalAlert(true)} >
          <MoreHoriz className="thread__header__details" />
        </IconButton>
      </div>
      <div className="thread__messages">
        {messages.map(({ id, data }) => (
          <Message
            key={id}
            data={data}
          />
        ))}
      </div>
      <div className="thread__input">
        <form>
          <IconButton onClick={() => setShowModalAlert(true)} >
            <AttachFileOutlined />
          </IconButton>

          <input
            placeholder="Write message..."
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <IconButton onClick={() => setShowModalAlert(true)} >
            <TimerOutlined />
          </IconButton>

          <IconButton onClick={() => setShowModalAlert(true)} >
            <EmojiEmotionsOutlined />
          </IconButton>

          <IconButton 
            onClick={sendMessage}
            type="submit"
          >
            <SendRounded />
          </IconButton>

          <IconButton onClick={() => setShowModalAlert(true)}>
            <MicNoneOutlined />
          </IconButton>
        </form>
      </div>
      {showModalAlert ? <ModalAlert show={showModalAlert}
        content="Tính năng này đang được phát triển!"
        setShow={setShowModalAlert} /> : null}
    </div>
  );
};

export default Thread;
