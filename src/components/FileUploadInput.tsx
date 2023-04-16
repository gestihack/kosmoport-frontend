import {
    ChangeEvent,
    ForwardedRef,
    ForwardRefRenderFunction,
    FunctionComponent,
    useState,
} from "react";
import pdf_icon from "../assets/pdf.svg";
import { uniqueId } from "lodash";
import { useMutation } from "react-query";
import { fn, UPLOAD_DOC } from "../Contraints";

interface FileUploadInputProps {
    title: string;
    courseId: string;
    token: string;
}

const FileUploadInput: FunctionComponent<FileUploadInputProps> = (props) => {
    const [file, setFile] = useState<File>();
    const id = uniqueId("file-upload-");

    let { mutate } = useMutation({
        mutationFn: ({ file, courseId, name }: any) => {
            let data = new FormData();
            data.append("file", file);
            data.append("course", courseId);
            data.append("name", name);

            return fn(UPLOAD_DOC, { body: data, token: props.token, aboba: true });
        },
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
        mutate({
            file: e.target.files![0]!,
            courseId: props.courseId,
            name: props.title,
        });
    };

    return (
        <div className="mb-4">
            <input
                className="hidden -z-10 absolute"
                id={id}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
            />
            <label htmlFor={id}>
                <div className="px-7 py-5 cursor-pointer rounded-md border-dashed border-2 box-border border-gray max-w-2xl">
                    <div className="flex flex-col">
                        <div className="flex flex-row py-2">
                            <img
                                className="-ml-1"
                                src={pdf_icon}
                            />
                            <span className="pl-2 font-bold text-lg">
                                {file ? `${props.title}` : props.title}
                            </span>
                        </div>
                        <span className="text-secondary font-semibold text-lg">
                            {file
                                ? `${file.name} - ${Math.round(
                                      file.size / 1024,
                                  )} KiB`
                                : "Прикрепите скан документа (.PDF, .JPG, .PNG)"}
                        </span>
                    </div>
                </div>
            </label>
        </div>
    );
};

export default FileUploadInput;
