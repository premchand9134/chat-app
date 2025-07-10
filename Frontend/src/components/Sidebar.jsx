import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./Skeleton/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const {
    users,
    selectedUser,
    getUsers,
    setSelectedUser,
    isUserLoading,
    getMessages,
  } = useChatStore();

  const [showOnlineUsersOnly, setShowOnlineUsersOnly] = useState(false);
  const [searchUser, setSearchUser] = useState("");

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) {
    return <SidebarSkeleton />;
  }

  const filteredUsers = showOnlineUsersOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  const filterbyName = filteredUsers.filter((user) =>
    user.fullName.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <aside className="h-screen w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 ">
      <div className="border-b border-base-300 w-full p-5 shrink-0">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* Online Filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineUsersOnly}
              onChange={(e) => setShowOnlineUsersOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      <div className="w-full p-2 ">
        <label htmlFor="search" className="ml-1 font-semibold font-mono">
          Search User :
        </label>
        <input
          type="text"
          placeholder="Search"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          name="search"
          className="w-full input 

          input-bordered rounded-lg input-sm sm:input-md mt-1"
        />
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 w-full py-3">
        {filterbyName.map((user) => (
          <button
            key={user._id}
            className={`w-full p-3 flex items-center gap-3 transition-colors cursor-pointer 
              font-mono hover:bg-base-300 ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }`}
            onClick={() => {
              setSelectedUser(user);
            }}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 rounded-full object-cover"
              />
              {onlineUsers.includes(user._id) && (
                <span className=" size-2 absolute bottom-1 right-1  bg-green-500 rounded-full ring-1 ring-zinc-900"></span>
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0 ">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {!filterbyName.length && <div className="p-3">No users found</div>}
      </div>
    </aside>
  );
};

export default Sidebar;
