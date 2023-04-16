import { FunctionComponent } from "react";
import CourseCard from "./CourseCard";
import { Course } from "./CoursesTab";
import { MY_COURSES, fn } from "../Contraints";
import { useQuery } from "react-query";

interface MyCoursesTabProps {
    token: string;
}
 
const MyCoursesTab: FunctionComponent<MyCoursesTabProps> = (props) => {
    let { data, isFetched } = useQuery({
        queryKey: "my_courses",
        queryFn: () => fn(MY_COURSES, { token: props.token }),
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
                        icon={`/src/assets/${el.icon}.png`}
                        available={el.people - el.users.length}
                    />
                ))
            )}
        </div>
    );
}
 
export default MyCoursesTab;