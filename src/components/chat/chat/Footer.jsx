// import { useEffect } from 'react';

// import { EmojiEmotions, AttachFile, Mic } from '@mui/icons-material';
// import { Box, styled, InputBase } from '@mui/material';

// import { uploadFile } from '../../../service/api';

// const Container = styled(Box)`
//   height: 55px;
//   background: #1b2430;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   padding: 0 15px;
//   & > * {
//     margin: 5px;
//     color: rgba(255, 255, 255, 0.7);
//   }
// `;

// const Search = styled(Box)`
//   border-radius: 18px;
//   background-color: #1b2430;
//   width: calc(94% - 100px);
//   border: 1px solid;
// `;

// const InputField = styled(InputBase)`
//   width: 100%;
//   padding: 20px;
//   padding-left: 25px;
//   font-size: 14px;
//   height: 20px;
//   width: 100%;
//   color: rgba(255, 255, 255, 1);
// `;

// const ClipIcon = styled(AttachFile)`
//   transform: "rotate(40deg)";
// `;






// const Footer = ({ sendText, value, setValue, setFile, file, setImage }) => {

//   useEffect(() => {
//       const getImage = async () => {
//           if (file) {
//               const data = new FormData();
//               data.append("name", file.name);
//               data.append("file", file);

//               const response = await uploadFile(data);
//               setImage(response.data);
//           }
//       }
//       getImage();
//   }, [file, setImage])

//   const onFileChange = (e) => {
//       setValue(e.target.files[0].name);
//       setFile(e.target.files[0]);
//   }

//   return (
//       <Container>
//           <EmojiEmotions />
//           <label htmlFor="fileInput">
//               <ClipIcon />
//           </label>
//           <input
//               type='file'
//               id="fileInput"
//               style={{ display: 'none' }}
//               onChange={(e) => onFileChange(e)}
//           />

//           <Search>
//               <InputField
//                   placeholder="Type a message"
//                   inputProps={{ 'aria-label': 'search' }}
//                   onChange={(e) => setValue(e.target.value)}
//                   onKeyPress={(e) => sendText(e)}
//                   value={value}
//               />
//           </Search>
//           <Mic />
//       </Container>
//   )
// }

// export default Footer;

import { useEffect } from 'react';
import { EmojiEmotions, AttachFile, Mic } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';
import { uploadFile } from '../../../service/api';

const Container = styled(Box)`
  height: 55px;
  background: #1b2430;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Search = styled(Box)`
  border-radius: 18px;
  background-color: #1b2430;
  width: calc(94% - 100px);
  border: 1px solid;
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 20px;
  padding-left: 25px;
  font-size: 14px;
  height: 20px;
  width: 100%;
  color: rgba(255, 255, 255, 1);
`;

const ClipIcon = styled(AttachFile)`
  transform: rotate(40deg); /* Remove the extra quotes around rotate(40deg) */
`;

const Footer = ({ sendText, value, setValue, setFile, file, setImage }) => {
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append('name', file.name);
        data.append('file', file);

        const response = await uploadFile(data);
        setImage(response.data);
      }
    };
    getImage();
  }, [file, setImage]);

  const onFileChange = (e) => {
    setValue(e.target.files[0].name);
    setFile(e.target.files[0]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendText(e);
    }
  };

  return (
    <Container>
      <EmojiEmotions />
      <label htmlFor="fileInput">
        <ClipIcon />
      </label>
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={(e) => onFileChange(e)}
      />

      <Search>
        <InputField
          placeholder="Type a message"
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
          value={value}
        />
      </Search>
      <Mic />
    </Container>
  );
};

export default Footer;