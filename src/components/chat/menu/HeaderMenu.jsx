import React from 'react'
import { MoreVert } from '@mui/icons-material';
import { useState } from 'react';
import { Menu,MenuItem ,styled} from '@mui/material';

const MenuOption = styled(MenuItem)`
    font-size: 14px
    padding: 15px 60px 5px 24px;
    color: #4A4A4A;
`;

const HeaderMenu = ({setOpenDrawer}) => {

    const [open ,setOpen]=useState(false); 
    
    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };
  return (
    <>
        <MoreVert onClick={handleClick}/>
        <Menu
        anchorEl={open}
        open={open}
        keepMounted
        getContentAnchorEl={null}
        onClose={handleClose}
        anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
       
      >
        <MenuOption onClick={() => { handleClose(); setOpenDrawer(true);}}>Profile</MenuOption>
        
      </Menu>
    </>
  )
}

export default HeaderMenu;