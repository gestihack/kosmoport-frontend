import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface CourseCardProps {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    age: string;
    icon: string;
    available: number;
}

const CourseCard: FunctionComponent<CourseCardProps> = (props) => {
    return (
        <div className="m-2 md:min-w-[24rem] md:max-w-[26rem] w-[27rem] lg:min-w-[26rem] lg:max-w-[28rem] border-[2px] border-gray-light rounded-[15px] flex flex-col py-[15px] px-[15px] justify-between ">
            <div className="flex flex-col self-start w-full">
                <Link to={"/course/" + props.id}>
                    <span className="font-bold text-lg font-sans-serif">{props.title}</span>
                </Link>
                <span className="text-blue-accent font-semibold text-base mt-[-5px]">
                    &gt;&nbsp;{props.subtitle}
                </span>
                <span className="text-base py-4">{props.description}</span>
                <div className="absolute self-end w-16 h-16 l-[calc(100%-3rem)]">
                    <img src={props.icon} />
                </div>
            </div>
            <div className="justify-end">
                <div className="flex flex-row justify-between">
                    <div>
                        <span className="text-secondary self-start">
                            {props.age}
                        </span>
                    </div>
                    <div>
                        <span className="pr-4 text-secondary self-end">
                            Свободных мест: {props.available}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
