import { useContext } from "react";
import { Dialog, Box, Typography, List, ListItem, styled } from "@mui/material";
import { qrCodeImage } from "../../constants/data";
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { AccountContext } from "../../context/AccountProvider";
import { addUser } from "../../service/api";

const Component = styled(Box)`
  display: flex;
`;
const ToImage = styled("img")`
  height:220px;
  widht:350px;
  position:absolute;
  left:32%;
  top:56%;
`;

const Container = styled(Box)`
  padding: 56px 0 56px 56px;
`;

const QRCOde = styled("img")({
  margin: "50px 0 0 250px",
  height: 264,
  width: 264,
  position:"relative"
});

const Title = styled(Typography)`
  font-size: 26px;
  margin-bottom: 25px;
  color: #525252;
  font-family: Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu,
    Cantarell, Fira Sans, sans-serif;
  font-weight: 300;
`;
const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`;
const dialogStyle = {
  height: "96%",
  marginTop: "12%",
  width: "60%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  overFlow: "none",
};
const LoginDialog = () => {
  const { setAccount } = useContext(AccountContext);

  const onLoginSuccess =async (res) => {
    let decoded = jwt_decode(res.credential);
    setAccount(decoded);
    await addUser(decoded);
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };
  return (
    
      <>
      <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true}>
        <Component>
          <Container>
            <Title>How To Use ZapChat</Title>
            <StyledList>
              <ListItem>1. Open ZapChat Web app</ListItem>
              <ListItem>2. Login or SignUP</ListItem>
              <ListItem>3. Select User And Start Chat </ListItem>
            </StyledList>
            <Typography
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              Tutorial
            </Typography>
          </Container>
          <Box style={{ position: 'absolute', top: '0%', right: '5.6%' }}>
            <QRCOde src={qrCodeImage} alt="qr code" />
            <Box
              style={{
                position: 'absolute',
                top: '50%',
                right: '38px',
              }}
            >
              <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginFailure} />
            </Box>
          </Box>
        </Component>
        <Box>
          <ToImage src={require('../../images/logozap.png')} alt="nothing" />
        </Box>
      </Dialog>
    </>
  );
};

export default LoginDialog;
