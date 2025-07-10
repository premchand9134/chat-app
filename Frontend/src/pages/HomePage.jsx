import React from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatAppContainer from "../components/ChatAppContainer";
const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-auto bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className=" bg-base-100 shadow-xl rounded-lg w-full max-w-6xl h-[100vh]">
          <div className="flex h-fit rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatAppContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
