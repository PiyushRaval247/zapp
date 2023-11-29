// import React from 'react';
// import { Box,Typography,styled} from '@mui/material';
// import { useContext } from 'react';
// import { AccountContext } from '../../../context/AccountProvider';
// import { setConversation} from '../../../service/api';
// const Component = styled(Box)`
//     height: 45px;
//     display: flex;
//     padding: 13px 0;
//     cursor: pointer;
//     color: #fff;
    
// `;
    
// const Image = styled('img') ({
//     width: 50,
//     height: 50,
//     objectFit: 'cover',
//     borderRadius: '50%',
//     padding: '0 14px',

// });

// const Container = styled(Box)`
//     display: flex;
    
// `;



// const Text = styled(Typography)`
//     display: block;
//     color: rgba(255,255,255,0.5);
//     font-size: 14px;
// `;


// const Conversations = ({user}) => {
//     const {setPerson,account } =useContext(AccountContext);


//     const getUser = async () => {
//         setPerson(user);
//         await setConversation({ senderId: account.sub, receiverId: user.sub });
//     }
//   return (
//     <Component onClick={() => getUser()}>
//     <Box>
//         <Image src={user.picture} alt="display picture" />
//     </Box>
//     <Box style={{width: '100%'}}>
//         <Container>
//             <Typography color="white">{user.name}</Typography>
           
//         </Container>
//         <Box>
//             <Text>hello</Text>
//         </Box>
//     </Box>
// </Component>
//   )
// } 
 
// export default Conversations;
















import { useState, useEffect, useContext } from 'react';

import { Box, styled, Divider } from '@mui/material';

import { AccountContext } from '../../../context/AccountProvider';
import React from 'react';
//components
import Conversation from './Conversation';
import { getUsers } from '../../../service/api';

const Component = styled(Box)`
    overflow: overlay;
    height: 81vh;
    background:#0e1215;

`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: .6;
`;
const Conversations = ({ text }) => {
    const [users, setUsers] = useState([]);
    
    const { account, socket, setActiveUsers } = useContext(AccountContext);

    useEffect(() => {
        const fetchData = async () => {
            let data = await getUsers();
            let fiteredData = data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
            setUsers(fiteredData);
        }
        fetchData();
    }, [text]);

    useEffect(() => {
        socket.current.emit('addUser', account);
        socket.current.on("getUsers", users => {
            setActiveUsers(users);
        })
    }, [account, setActiveUsers, socket])

    return (
        <Component>
        {users &&
          users.map((user, index) => (
            user.sub !== account.sub && (
              <React.Fragment key={user.sub}>
                <Conversation user={user} />
                {users.length !== index + 1 && <StyledDivider />}
              </React.Fragment>
            )
          ))}
      </Component>
      
    )
}
export default Conversations; 