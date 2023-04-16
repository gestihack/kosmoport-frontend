import React,{ FunctionComponent } from "react";

export interface ButtonProps {
    children: string | string[] | JSX.Element | JSX.Element[];
    slim?: boolean;
    icon?: string;
    accent: string;
    invert?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;

}

// const Button: FunctionComponent<ButtonProps> = (props) => {
//     return (
//         <button
//             type={props.submit ? "submit" : "button"}
//             onClick={props.onClick}
//             className={(props.slim ? " py-1" : " py-3") +
//                         (props.secondary ? " bg-blue-light text-blue" : " bg-blue text-white") +
//                         (props.full ? " w-full" : " w-auto") +
//                 " cursor-pointer w-full min-h-full rounded-md"}>
//             {props.children}
//         </button>
//     );
// }
// export default Button;
 
const Button: FunctionComponent<ButtonProps> = (props) => {
    return ( 
        <div onClick={props.onClick} 
        className={(props.slim ? "mx-4 my-2 p-2 " : "") +
        ` max-w-[600px] flex flex-row rounded-xl  px-2 py-3 justify-center items-center cursor-pointer bg-${props.accent} `}>
            {props.icon ? <img src={props.icon} className="pr-3 w-8 h-8" /> : <></>}
            <span className="text-white align-middle font-sans-serif">{props.children}</span>
        </div>
    );
}
 
export default Button;