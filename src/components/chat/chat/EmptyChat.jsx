import { Box ,Typography,styled,Divider } from '@mui/material';
import React from 'react'


const Component = styled(Box)`
    background:#1B2430;
    padding: 30px 0;
    text-align: center;
    height: 100vh;
`;

const Container = styled(Box)`
    padding: 0 200px;
`;
    
const Image = styled('img')({
    marginTop: 100,
    width: 400
})
   
const Title = styled(Typography)`
    font-size: 32px;
    font-family: inherit;
    font-weight: 300;
    color: #41525d;
    margin-top: 25px 0 10px 0;
`;

const SubTitle = styled(Typography)`
    font-size: 14px;
    color: #667781;
    font-weight: 400;
    font-family: inherit;
`;

const StyledDivider = styled(Divider)`
    margin: 40px 0;
    opacity: 1;
    background:rgba(255,255,255,0.7);
`;


const EmptyChat = () => {
    
    return (
        <Component>
            <Container>
                <Image src={ require ('../../../images/dplogo.png')} alt="empty" />
                <Title>ZapChat Web</Title>
                <SubTitle>Now send and receive messages without keeping your phone online.</SubTitle>
                <SubTitle>Use ZapChat on up to 4 linked devices and 1 phone at the same time. </SubTitle>
                <StyledDivider/>
            
           </Container>
        </Component>
    )
}

export default EmptyChat;