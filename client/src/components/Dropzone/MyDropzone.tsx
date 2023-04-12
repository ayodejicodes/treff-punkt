import { AiOutlineArrowUp, AiOutlinePaperClip } from "react-icons/ai";
import { BiPaperPlane } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, DropzoneState, FileRejection } from "react-dropzone";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyDropzone = ({}) => {
  const [acceptedFile, setAcceptedFile] = useState<File[] | undefined>();
  const [rejectedFile, setRejectedFile] = useState<
    FileRejection[] | undefined
  >();
  const [preview, setPreview] = useState<string>();
  const [uploadedPicture, setUploadedPicture] = useState<string>();
  const [file, setFile] = useState<string | null>(null);
  const [content, setContent] = useState<string | undefined>();

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        // Converting to Base 64
        // ---------------------------------------------

        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target && event.target.result) {
            setFile(event.target.result.toString());
          }
        };
        reader.readAsDataURL(acceptedFiles[0]);

        // ---------------------------------------------------------

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
  useEffect(() => {
    if (rejectedFile && acceptedFile === undefined && rejectedFile.length > 0) {
      // Gets the filetype
      const filetype = rejectedFile[0]["file"]["name"].split(".").pop();

      // Gets the errorType and Format text-----
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

      //   console.log("Rejected:", filetype);
      //   console.log("Error:", capitalizedErrorType);
    }
  }, [acceptedFile, rejectedFile]);

  useEffect(() => {
    if (acceptedFile && rejectedFile === undefined && acceptedFile.length > 0) {
      toast.success("Image added successfully");
      //   console.log("acceptedFile", acceptedFile[0]["name"]);
    }
  }, [acceptedFile, rejectedFile]);

  const handleRemove = () => {
    setPreview("");
    setAcceptedFile(undefined);
  };

  console.log(file);

  // Upload to Cloudinary
  const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const handleSubmit = () => {
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", `${upload_preset}`);
      data.append("cloud_name", `${cloud_name}`);

      fetch("https://api.cloudinary.com/v1_1/dpcdcpyln/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUploadedPicture(data.url.toString());
          setPreview("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  console.log(uploadedPicture);

  // console.log("upload_preset:", `"${cloud_name}"`);

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
                <div className="flex flex-col justify-between relative flex-1  pl-7 pr-7 items-center  ">
                  <img src={preview} alt="preview" className="mt-2" />
                  <div className="flex gap-4 mt-3 mb-3">
                    <div
                      className=" flex items-center   gap-2 bg-onlineGreen/[95%] p-2 rounded-full cursor-pointer text-white"
                      onClick={handleSubmit}
                    >
                      <small className="text-[12px]">Send file to Member</small>
                      <AiOutlineArrowUp />
                    </div>
                    <div
                      className=" flex items-center gap-2  bg-red-700/[95%] p-2 rounded-full cursor-pointer text-white"
                      onClick={handleRemove}
                    >
                      <small className="text-[12px]">Remove Attachment</small>
                      <RxCross2 />
                    </div>
                  </div>
                </div>
              )}

              {/* Chat Form------------------------------------------ */}
              <div className="flex items-center pl-7 pr-7 pt-3 pb-3 gap-4">
                <div className="">
                  {preview && (
                    <div className="relative w-8 h-8 bg-red-700">
                      <img
                        src={preview}
                        alt=""
                        className="object-cover w-full h-full"
                        onLoad={() => URL.revokeObjectURL(preview)}
                      />
                      <RxCross2
                        size={12}
                        className="absolute top-0 right-0 cursor-pointer text-reject"
                        onClick={handleRemove}
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
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
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
                          onClick={handleSubmit}
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
