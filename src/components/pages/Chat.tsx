import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { type Socket } from "socket.io-client";
import { useUserSelector } from "../../store/hooks";
import SendIcon from "@mui/icons-material/Send";

type Props = {
  socket: Socket;
};

export default function Chat({ socket }: Props) {
  const [message, setMessage] = useState("");
  const { state } = useLocation();
  const { room, project } = state;
  const user = useUserSelector((state) => state.user);

  console.log(project);

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: user.username,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <section className=" m-2 w-10/12 lg:w-7/12 p-4 flex flex-col justify-center items-center bg-sky-200 border-2 border-sky-400 rounded-xl">
      <div className="text-sky-800 font-bold text-xl mb-6">
        Live Chat of the{" "}
        <span className="text-violet-500">{project.project_name}</span> Team
      </div>
      <div className="h-96 w-full border-2 border-sky-600 rounded-t-lg"></div>
      <div className="w-full flex justify-center items-center">
        <input
          className="w-full  text-sky-800 p-2 border-l-2 border-b-2 border-sky-600 rounded-bl-lg focus:border-sky-400"
          id="message"
          placeholder="Enter Message"
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
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
