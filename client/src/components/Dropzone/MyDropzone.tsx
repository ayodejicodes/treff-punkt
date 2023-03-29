import { AiOutlineArrowUp, AiOutlinePaperClip } from "react-icons/ai";
import { BiPaperPlane } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, DropzoneState, FileRejection } from "react-dropzone";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const MyDropzone: React.FC = ({}) => {
  const [acceptedFile, setAcceptedFile] = useState<File[] | undefined>();
  const [rejectedFile, setRejectedFile] = useState<FileRejection[] | undefined>(
    []
  );
  const [preview, setPreview] = useState<string>();

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        acceptedFiles;
        setAcceptedFile(acceptedFiles);
        setRejectedFile(undefined);
        setPreview(URL.createObjectURL(acceptedFiles[0]));
      }

      if (fileRejections.length > 0) {
        setRejectedFile(fileRejections);
        setAcceptedFile(undefined);
      }
    },
    []
  );

  const maxSize = 1024 * 5000;

  const { getRootProps, getInputProps, open }: DropzoneState = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    onDrop,
    noClick: true,
    maxSize: maxSize,
    multiple: false,
  });

  //   Gets the Error Message from the rejectedFiles
  let errorCode: any = null;

  useEffect(() => {
    if (rejectedFile && acceptedFile === undefined && rejectedFile.length > 0) {
      // Gets the filetype
      const filetype = rejectedFile[0]["file"]["name"].split(".").pop();

      // Gets the filetype and Formatii=ng text-----
      const errorType = rejectedFile[0]["errors"][0]["code"]
        .split("-")
        .join(" ");

      const capitalizedErrorType =
        errorType.charAt(0).toUpperCase() + errorType.slice(1);

      // ---------------------------------------------------

      if (capitalizedErrorType === "File too large") {
        toast.error(
          `${capitalizedErrorType}, please upload an image below ${
            maxSize / 1024000
          } mb.`
        );
      } else {
        toast.error(`${filetype} files not supported, Please upload an image.`);
      }

      console.log("Rejected:", filetype);
      console.log("Error:", capitalizedErrorType);
    }
  }, [acceptedFile, rejectedFile]);

  useEffect(() => {
    if (acceptedFile && rejectedFile === undefined && acceptedFile.length > 0) {
      toast.success("Image added successfully");
      console.log("acceptedFile", acceptedFile[0]["name"]);
    }
  }, [acceptedFile, rejectedFile]);

  return (
    <div {...getRootProps()} className="my-dropzone">
      <input {...getInputProps()} />

      <>
        <div>
          <div className="flex-1 ">
            <div className="flex flex-col h-[calc(73vh)] divide-y-[2px] divideSecondaryColorLight dark:divideWhiteColorLight">
              {/* Chat Messages------------------------------------------ */}
              {!preview && <div className="flex-1  pl-7 pr-7 ">Messages</div>}
              {preview && (
                <div className="relative flex-1  pl-7 pr-7 ">
                  <img src={preview} alt="preview" />
                  <div className=" flex items-center gap-1 absolute left-[43%] top-[94%] bg-whiteColor/[80%] p-1.5 rounded-full">
                    <small>Send file to Member</small>
                    <AiOutlineArrowUp />
                  </div>
                </div>
              )}
              {/* {preview && } */}

              {/* Chat Form------------------------------------------ */}
              <div className="flex items-center pl-7 pr-7 pt-3 pb-3 gap-4">
                <div className="">
                  {preview && (
                    <div className="relative w-7 h-7 object-cover bg-red-500">
                      <img
                        src={preview}
                        alt=""
                        className=""
                        onLoad={() => URL.revokeObjectURL(preview)}
                      />
                      <RxCross2
                        size={15}
                        className="absolute top-0 right-0 cursor-pointer text-reject  "
                        onClick={() => {
                          setPreview("");
                          setAcceptedFile(undefined);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className=" w-full ">
                  <div className="flex items-center bgSecondaryColorLight dark:bgWhiteColorLight gap-1 rounded-full ">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Start a Conversation"
                      className=" md:inputStyle bg-transparent w-full focus:outline-none text-secondaryColor dark:text-whiteColor"
                    />

                    <div className="flex gap-1.5 items-center justify-center pl-3 pr-3">
                      <div>
                        <AiOutlinePaperClip
                          size={18}
                          className="cursor-pointer text-secondaryColor dark:text-whiteColorcursor-pointer  dark:text-whiteColor"
                          onClick={open}
                        />
                      </div>

                      <div>
                        <BiPaperPlane
                          size={18}
                          className="cursor-pointer text-secondaryColor dark:text-whiteColorcursor-pointer  dark:text-whiteColor"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default MyDropzone;
