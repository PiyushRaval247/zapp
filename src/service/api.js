  
import axios from 'axios';

const url = 'https://zapchat.onrender.com';

export const addUser = async (data) => {
    try {
        let response = await axios.post(`${url}/add`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling addUser API ', error);
    }
}

export const getUsers = async () => {
    try {
        let response = await axios.get(`${url}/users`);
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}

export const setConversation = async (data) => {
    try {
        await axios.post(`${url}/conversation/add`, data);
    } catch (error) {
        console.log('Error while calling setConversation API ', error);
    }
}

export const getConversation = async (users) => {
    try {
        const response = await axios.post(`${url}/conversation/get`, users);
        return response.data;
    } catch (error) {
        console.error('Error during getConversation API call:', error);
        throw error; // Re-throw the error to propagate it to the calling code
    }
};



export const getMessages = async (id) => {
    try {
        const response = await axios.get(`${url}/message/get/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error during getMessages API call:', error);
        throw error; // Re-throw the error to propagate it to the calling code
    }
};


export const newMessages = async (data) => {
    try {
        return await axios.post(`${url}/message/add`, data);
    } catch (error) {
        console.log('Error while calling newConversations API ', error);
    }
}

export const uploadFile = async (data) => {
    try {
        const response = await axios.post(`${url}/file/upload`, data);
        return response.data;
    } catch (error) {
        console.error('Error during file upload:', error);
        throw error; // Re-throw the error to propagate it to the calling code
    }
};