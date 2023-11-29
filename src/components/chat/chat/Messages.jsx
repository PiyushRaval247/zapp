import React, { useState, useEffect, useContext, useRef } from "react";
import { Box, styled } from "@mui/material";

import { getMessages, newMessages } from "../../../service/api";
import { AccountContext } from "../../../context/AccountProvider";

//components
import Message from "./Message";
import Footer from "./Footer";

const Wrapper = styled(Box)`
  background-image: url("https://wallpapers.com/images/hd/nightwing-in-the-dark-5axdksiyaliax4wt.webp");
  background-size: cover;
  background-repeat: no-repeat;
`;

const Component = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
`;

const Container = styled(Box)`
  padding: 1px 80px;
`;

const Messages = ({ person, conversation }) => {
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [value, setValue] = useState('');
  const [file, setFile] = useState();
  const [image, setImage] = useState('');
  const [error, setError] = useState(null); // New state for error handling

  const scrollRef = useRef();

  const { account, socket, newMessageFlag, setNewMessageFlag } =
    useContext(AccountContext);

  useEffect(() => {
    socket.current.on('getMessage', (data) => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    const getMessageDetails = async () => {
      try {
        let data = await getMessages(conversation?._id);
        setMessages(data);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError('Error fetching messages.'); // Set an error message
      }
    };
    getMessageDetails();
  }, [conversation?._id, person._id, newMessageFlag]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    incomingMessage &&
      conversation?.members?.includes(incomingMessage.senderId) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation]);

  const receiverId = conversation?.members?.find(
    (member) => member !== account.sub
  );

  const sendText = async (e) => {
    let code = e.keyCode || e.which;
    if (!value) return;

    if (code === 13) {
      try {
        let message = {};
        if (!file) {
          message = {
            senderId: account.sub,
            receiverId: receiverId,
            conversationId: conversation._id,
            type: 'text',
            text: value,
          };
        } else {
          message = {
            senderId: account.sub,
            conversationId: conversation._id,
            receiverId: receiverId,
            type: 'file',
            text: image,
          };
        }

        socket.current.emit('sendMessage', message);

        await newMessages(message);

        setValue('');
        setFile();
        setImage('');
        setNewMessageFlag((prev) => !prev);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError('Error sending message.'); // Set an error message
      }
    }
  };

  return (
    <Wrapper>
      <Component>
        {error ? (
          <div>Error: {error}</div>
        ) : (
          messages &&
          messages.map((message) => (
            <Container key={message.id}>
              <Message message={message} />
            </Container>
          ))
        )}
        <div ref={scrollRef}></div>
      </Component>

      <Footer
        sendText={sendText}
        value={value}
        setValue={setValue}
        setFile={setFile}
        file={file}
        setImage={setImage}
      />
    </Wrapper>
  );
};

export default Messages;
