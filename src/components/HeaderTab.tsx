import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

interface HeaderTabProps {
    active: boolean;
    icon: string;
    title: string;
    onClick: any;
}

const HeaderTab: FunctionComponent<HeaderTabProps> = (props) => {
    return (
        <Link to="/"
            draggable={false}
            onClick={props.onClick}
            className={
                (props.active ? "text-blue" : "text-gray-dark") +
                " flex flex-row px-6 cursor-pointer select-none"
            }>
            <ReactSVG
                className={(props.active ? "stroke-blue-accent fill-blue-accent" : "stroke-gray-dark fill-gray-dark") +
                " self-center"}
                src={props.icon}
            />
            <span className={(props.active ? "text-blue-accent" : "") +
                " text-sm lg:text-lg md:pl-2 self-center"}>
                {props.title}
            </span>
        </Link>
    );
};

export default HeaderTab;
