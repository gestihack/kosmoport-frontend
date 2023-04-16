import { FunctionComponent, useState } from "react";
import Header, { HeaderTabs } from "./Header";
import Courses, { User, UserRole } from "./CoursesTab";
import MyCoursesTab from "./MyCoursesTab";
import CourseTab from "./CourseTab";
import { useQuery } from "react-query";
import { fn, ME } from "../Contraints";
import CreateCourseTab from "./CreateCourseTab";
import { Navigate } from "react-router-dom";

interface UserAppProps {
    token?: string;
    course?: boolean;
    create?: boolean;
}

const UserApp: FunctionComponent<UserAppProps> = (props) => {
    let [currTab, setCurrTab] = useState(HeaderTabs.COURCES);
    let { data, isFetched } = useQuery({
        enabled: true,
        queryKey: "me",
        refetchOnWindowFocus: false,
        queryFn: () => fn(ME, { token: props.token }),
    });
    if (!isFetched) return <>NO INTERNET</>;
    let user = data?.user as User;
    let tab = {} as JSX.Element;

    if (currTab == HeaderTabs.COURCES) {
        tab = <Courses token={props.token} />;
    } else if (currTab == HeaderTabs.MY_COURCES) {
        tab = <MyCoursesTab token={props.token!} />;
    } else if (currTab == HeaderTabs.CREATE_COURSE || props.create) {
        if (user.role == UserRole.TUTOR) {
            tab = <CreateCourseTab user={user} token={props.token!} />;
        } else {
            return <Navigate replace to="/"/>;
        }
    }

    return (
        <div className="w-screen h-screen">
            <Header
                currTab={currTab}
                setCurrTab={setCurrTab}
                user={user}
            />
            {props.course ? <CourseTab userId={user?.id} token={props.token!} /> : tab}
        </div>
    );
};

export default UserApp;
