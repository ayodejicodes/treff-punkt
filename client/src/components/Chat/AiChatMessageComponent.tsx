const AiChatMessageComponent = ({ content, index }: any) => {
  return (
    <div className="flex-1  pl-7 pr-7">
      {index % 2 === 0 && content !== "" && (
        <div className="flex flex-col items-end">
          <div className="flex items-center justify-end max-w-[48%]  bg-primaryColor rounded-lg pl-2 pr-2 pt-1 pb-1 mt-3 ">
            <small className="break-words text-secondaryColor ">
              {content}
            </small>
          </div>
        </div>
      )}
      {index % 2 !== 0 && content !== "" && (
        <div className="flex flex-col items-start">
          <div className="flex items-center justify-end max-w-[48%]  bg-primaryColor rounded-lg pl-2 pr-2 pt-1 pb-1 mt-3 ">
            <small className="break-words text-secondaryColor ">
              {content}
            </small>
          </div>
        </div>
      )}
    </div>
  );
};
export default AiChatMessageComponent;
