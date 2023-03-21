import SingleUserChatComponent from "./SingleUserChatComponent";

const SideChat = () => {
  return (
    <div className="flex flex-col gap-2">
      <SingleUserChatComponent />
      <SingleUserChatComponent />
      <SingleUserChatComponent />
      <SingleUserChatComponent />
      <SingleUserChatComponent />
      <SingleUserChatComponent />
    </div>
  );
};
export default SideChat;
