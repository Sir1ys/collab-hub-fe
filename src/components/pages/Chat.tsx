import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { type Socket } from "socket.io-client";
import { useUserSelector } from "../../store/hooks";
import SendIcon from "@mui/icons-material/Send";
import {
  getAllMEssagesByChatId,
  postMessageByChatId,
} from "../../utils/chat_api";

type Props = {
  socket: Socket;
};

type Message = {
  room: string;
  user_id: number | string;
  message: string;
  avatar_url: string;
};

export default function Chat({ socket }: Props) {
  const message = useRef<HTMLInputElement>(null);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const { state } = useLocation();
  const { room, project } = state;
  const user = useUserSelector((state) => state.user);

  const sendMessage = async () => {
    if (message.current !== null) {
      const messageData: Message = {
        room: room,
        user_id: user.user_id,
        message: message.current.value,
        avatar_url: user.avatar_url,
      };

      await socket.emit("send_message", messageData);
      await postMessageByChatId(room, {
        message: message.current.value,
        user_id: user.user_id,
        avatar_url: user.avatar_url,
      });
      setMessageList((prevState) => [...prevState, messageData]);
      message.current.value = "";
    }
  };

  useEffect(() => {
    getAllMEssagesByChatId(room).then((response: Message[]) => {
      setMessageList(response);
    });

    const messageReceiver = (data: Message) => {
      setMessageList((prevState) => [...prevState, data]);
    };

    socket.on("receive_message", messageReceiver);

    return () => {
      socket.off("receive_message", messageReceiver);
    };
  }, [socket]);

  return (
    <section className=" m-2 w-10/12 lg:w-7/12 p-4 flex flex-col justify-center items-center bg-sky-200 border-2 border-sky-400 rounded-xl">
      <div className="text-sky-800 font-bold text-xl mb-6">
        Live Chat of the{" "}
        <span className="text-violet-500">{project.project_name}</span> Team
      </div>
      <div className="h-96 w-full p-4 border-2 border-sky-600 rounded-t-lg flex flex-col gap-2 items-start overflow-auto">
        {messageList.map((m, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 ${
              user.user_id === m.user_id ? "self-end" : "self-start"
            }`}
          >
            <img
              className={`w-16 h-16 rounded-full ${
                user.user_id === m.user_id ? "order-1" : ""
              }`}
              src={`${
                user.user_id === m.user_id ? user.avatar_url : m.avatar_url
              }`}
              alt="The avatar of user"
            />
            <span
              className={`p-2 rounded-xl ${
                user.user_id === m.user_id
                  ? "bg-sky-300 text-sky-900"
                  : "bg-sky-800 text-white"
              }`}
              key={index}
            >
              {m.message}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center items-center">
        <input
          className="w-full  text-sky-800 p-2 border-l-2 border-b-2 border-sky-600 rounded-bl-lg focus:border-sky-400"
          id="message"
          placeholder="Enter Message"
          type="text"
          ref={message}
          onKeyPress={(event) => event.key === "Enter" && sendMessage()}
        />
        <button
          className="w-20 border-b-2 border-x-2 p-2 rounded-br-lg hover:bg-sky-200 border-sky-600 active:bg-sky-600 text-sky-600 active:text-white"
          onClick={sendMessage}
        >
          <SendIcon fontSize="small" />
        </button>
      </div>
    </section>
  );
}
