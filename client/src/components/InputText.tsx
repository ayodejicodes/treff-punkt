import { FunctionComponent } from "react";

interface InputTextProps {
  placeholder: string;
  icon: React.ReactNode;
}

const InputText: FunctionComponent<InputTextProps> = ({
  placeholder,
  icon,
}) => {
  return (
    <div>
      <div className="flex items-center bgSecondaryColorLight dark:bgWhiteColorLight gap-1 rounded-full ">
        <input
          type="text"
          name=""
          id=""
          placeholder={placeholder}
          className=" md:inputStyle bg-transparent w-full focus:outline-none text-secondaryColor dark:text-whiteColor"
        />
        {icon}
      </div>
    </div>
  );
};
export default InputText;
