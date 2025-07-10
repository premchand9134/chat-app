import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className=" p-3 border-b border-base-300">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 relative rounded-full">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt="User Avatar"
              />
            </div>
          </div>
          {/* User Info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-xs">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        {/* Close button */}
        <button className="">
          <X onClick={() => setSelectedUser(null)} className="cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
