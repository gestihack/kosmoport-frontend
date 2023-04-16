import { FunctionComponent, forwardRef, useState } from "react";
import { MutableRefObject } from "react";
import { ReactSVG } from "react-svg";
import { TagsInput } from "react-tag-input-component";

export interface IInputFieldProps {
    placeholder: string;
    errorText?: string;
    type?: string;
    password?: boolean;
    textbox?: boolean;
    tags?: boolean;
    setInput: any;
    input: any;
}

const InputField: FunctionComponent<IInputFieldProps> = (
    props: IInputFieldProps,
) => {
    let input = {} as JSX.Element;
    // let [selected, setInput] = useState<string[]>([]);

    // setSelected.app

    if (props.textbox) {
        input = (
            <textarea
                cols={2}
                rows={4}
                onChange={(e) => props.setInput(e.target.value)}
                className="w-full h-full text-xl placeholder:font-semibold placeholder:text-gray"
                placeholder={props.placeholder}
            />
        );
    } else if (props.tags) {
        input = (
            <TagsInput
                //classNames="h-full py-2 text-xl flex-1 placeholder:font-semibold placeholder:text-gray"
                // placeHolder={props.placeholder}
                value={props.input}
                onChange={(e) => props.setInput(e)}
                name={""}
                placeHolder={props.placeholder}
            />
        );
    } else {
        input = (
            <input
                onChange={(e) => props.setInput(e.target.value)}
                className="focus:outline-0 h-full py-2 text-xl flex-1 placeholder:font-semibold placeholder:text-gray"
                type={props.type ?? "text"}
                placeholder={props.placeholder}
            />
        );
    }

    return props.tags ? (
        <div className="max-w-[600px]">{input}</div>
    ) : (
        <div className="mb-2 flex p-3 rounded-[15px] border-gray-light border-[1px] max-w-[600px]">
            {input}
        </div>
    );
};

export default InputField;
