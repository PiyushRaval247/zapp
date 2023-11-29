// import { useState, useEffect, useContext } from 'react';

// import { Box, styled, Divider } from '@mui/material';

// import { AccountContext } from '../../../context/AccountProvider';

// //components

// import { getUsers } from '../../../service/api';

// import Conversations from './Conversations';

// const Component = styled(Box)`
//     overflow: overlay;
//     height: 81vh;
//     background:#0e1215;

// `;

// const StyledDivider = styled(Divider)`
//     margin: 0 0 0 70px;
//     background-color: #e9edef;
//     opacity: .6;
// `;
// export const Conversation = ({text}) => {
//     const [users, setUsers] = useState([]);
//     const { account} = useContext(AccountContext);

//     useEffect(() => {
//         const fetchData = async () => {
//             let data = await getUsers();
//             let fiteredData = data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
//             setUsers(fiteredData);
//         }
//         fetchData();
//     }, [text]);
//     return (
//         <Component>
//             {
//                 users && users.map((user, index) => (
//                     user.sub !== account.sub && 
//                         <>
//                             <Conversations user={user} />
//                             {
//                                 users.length !== (index + 1)  && <StyledDivider />
//                             }
//                         </>
//                 ))
//             }
//         </Component>
//     )
// }
// export default Conversation; 











// import React from 'react';
// import { Box,Typography,styled} from '@mui/material';
// import { useContext } from 'react';
// import { AccountContext } from '../../../context/AccountProvider';
// import { setConversation} from '../../../service/api';



import { useContext, useEffect, useState } from 'react';

import { styled, Box, Typography } from "@mui/material";

import { UserContext } from '../../../context/UserProvider';
import { AccountContext } from '../../../context/AccountProvider';

import { setConversation, getConversation } from '../../../service/api';
import { emptyProfilePicture } from '../../../constants/data';
import { formatDate } from '../../../utils/common-utils';





const Component = styled(Box)`
    height: 45px;
    display: flex;
    padding: 13px 0;
    cursor: pointer;
    color: #fff;
    
`;
    
const Image = styled('img') ({
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: '50%',
    padding: '0 14px',

});

const Container = styled(Box)`
    display: flex;
    
`;



const Text = styled(Typography)`
    display: block;
    color: rgba(255,255,255,0.5);
    font-size: 14px;
`;

const Timestamp = styled(Typography)`
    font-size: 12px;
    margin-left: auto;
    color: rgba(255,255,255,0.7);
    margin-right: 20px;
`;


const Conversation = ({ user }) => {
    const url = user.picture || emptyProfilePicture;
    
    const { setPerson } = useContext(UserContext);
    const { account, newMessageFlag }  = useContext(AccountContext);

    const [message, setMessage] = useState({});

    useEffect(() => {
        const getConversationMessage = async() => {
            const data = await getConversation({ senderId: account.sub, receiverId: user.sub });
            setMessage({ text: data?.message, timestamp: data?.updatedAt });
        }
        getConversationMessage();
    }, [account.sub, newMessageFlag, user.sub]);

    const getUser = async () => {
        setPerson(user);
        await setConversation({ senderId: account.sub, receiverId: user.sub });
    }

    return (
        <Component onClick={() => getUser()}>
            <Box>
                <Image src={url} alt="display picture" />
            </Box>
            <Box style={{width: '100%'}}>
                <Container>
                    <Typography>{user.name}</Typography>
                    { 
                        message?.text && 
                        <Timestamp>{formatDate(message?.timestamp)}</Timestamp>        
                    }
                </Container>
                <Box>
                    <Text>{message?.text?.includes('localhost') ? 'media' : message.text}</Text>
                </Box>
            </Box>
        </Component>
    )
}
 
export default Conversation;