import axios from "axios";

const chatAPI = axios.create({
  baseURL: "https://collub-hub.onrender.com/api/chat",
});

type CreatedMessage = {
  message: string;
  user_id: number;
  avatar_url: string;
};

export const createChat = (chatId: string) => {
  return chatAPI.post("/", { chat_id: chatId }).then((response) => {
    return response.data.chat;
  });
};

export const addMemberToChat = (userId: number, chatId: string) => {
  return chatAPI
    .post(`/members/${chatId}`, { user_id: userId })
    .then((response) => {
      return response.data.member;
    });
};

export const getAllMEssagesByChatId = (chatId: string) => {
  return chatAPI.get(`/messages/${chatId}`).then((response) => {
    return response.data.messages;
  });
};

export const postMessageByChatId = (
  chatId: string,
  message: CreatedMessage
) => {
  return chatAPI.post(`/messages/${chatId}`, message).then((response) => {
    return response.data.messages;
  });
};
