import { FunctionComponent } from "react";
import CourseCard from "./CourseCard";
import { useQuery } from "react-query";
import { COURSES, fn } from "../Contraints";
import modelling from "../assets/modelling.png";
import programming from "../assets/PROGRAMMING.png";
import projects from "../assets/PROJECTS.png";

export interface Course {
    id:                number;
    name:              string;
    people:            number;
    description:       string;
    tutor:             string;
    age:               string;
    place:             string;
    icon:              string;
    schedule:          string;
    requiredDocuments: string[];
    users:             User[];
    queuedUsers:       User[];
    attending:         boolean;
    queued:            boolean;
}

export interface User {
    id:       number;
    email:    string;
    name:     string;
    lastname: string;
    surname?: string;
    vkId:     number;
    role:     UserRole;
    avatar:   string;
}

export enum UserRole {
    TUTOR = "TUTOR",
    STUDENT = "STUDENT",
}


interface CourcesTabProps {
    token?: string;
}

const Courses: FunctionComponent<CourcesTabProps> = (props) => {
    let chooseIcon = (s: string) => {
        if (s == "MODELLING") {
            return modelling;
        }
        else if (s == "PROGRAMMING") {
            return programming;
        }
        else {
            return projects;
        }
    }

    let { data, isFetched } = useQuery({
        queryKey: ["courses"],
        queryFn: () => fn(COURSES, { token: props.token }),
    });
    let courses = data as Course[];
    if (!isFetched) {
        return <>Loading...</>;
    }

    return (
        <div className="pl-16 pr-8 py-[50px] w-full pb-0 flex flex-1 flex-shrink h-auto basis-2 flex-wrap">
            {(
                courses.map(el => (
                    <CourseCard
                        id={el.id.toString()}
                        key={el.id}
                        title={el.name}
                        subtitle={el.place}
                        description={el.description}
                        age={el.age}
                        icon={chooseIcon(el.icon)}
                        available={el.people - el.users.length}
                    />
                ))
            )}
            {/* <CourseCard
                id={"0"}
                title={"3D-Моделирование"}
                subtitle={"Космопорт"}
                description={
                    "Инновационная платформа для онлайн обучения & живая online-доска. Позволяет удобно проводить онлайн-уроки и взаимодействовать с учениками"
                }
                age={"14-18 лет"}
                icon={"/src/assets/" + "modelling" + ".png"}
                available={0}
            /> */}
        </div>
    );
};

export default Courses;
