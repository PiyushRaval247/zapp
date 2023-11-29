
import React from "react";
import Messenger from "./components/Messenger";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccountProvider from "./context/AccountProvider";
import UserProvider from "./context/UserProvider";
const App = () => {
  const clientId =
    "154096238935-ag96p7m7bb4b6h47f3su50rbd3q9ng3e.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <UserProvider>
        <AccountProvider>
      
            <Messenger/>

        </AccountProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
