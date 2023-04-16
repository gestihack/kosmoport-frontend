import _ from "lodash";
import {
    createRef,
    ForwardedRef,
    ForwardRefRenderFunction,
    FunctionComponent,
    useState,
} from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import {
    ATTEND_COURSE,
    COURSES,
    COURSE_BY_ID,
    UNATTEND_COURSE,
    fn,
} from "../Contraints";
import { Course } from "./CoursesTab";
import FileUploadInput from "./FileUploadInput";
import Button from "./Button";
import VkAuthButton from "./VkAuthButton";

interface CourseTabProps {
    token: string;
    userId?: number;
}

enum CourseTabs {
    DESCRIPTION = "description",
    SCHEDULE = "schedule",
}

const CourseTab: FunctionComponent<CourseTabProps> = (props) => {
    const queryCLient = useQueryClient();
    let [currTab, setCurrTab] = useState(CourseTabs.DESCRIPTION);

    let { courseId } = useParams();
    let { data, isFetched } = useQuery({
        queryKey: "course",
        refetchOnWindowFocus: false,
        refetchInterval: 3000,
        queryFn: () =>
            fn(COURSE_BY_ID + courseId + "?user=" + props.userId, {
                token: props.token,
            }),
    });

    let attend = useMutation({
        mutationFn: ({ course }: { course: number }) =>
            fn(ATTEND_COURSE, {
                token: props.token,
                body: { course },
            }),
        onSuccess: () => {
            queryCLient.invalidateQueries("course");
        },
    });
    let unattend = useMutation({
        mutationFn: ({ course }: { course: number }) =>
            fn(UNATTEND_COURSE, {
                token: props.token,
                body: { course },
            }),
        onSuccess: () => {
            queryCLient.invalidateQueries("course");
        },
    });

    if (!isFetched) return <>LOADING...</>;

    let course = data as Course;

    return (
        <div className="py-20 pl-[90px] flex flex-col h-[calc(100%-4rem)] w-auto max-w-screen-lg">
            <span className="text-blue-accent font-bold text-xl">
                &gt;&nbsp; {course.place}
            </span>
            <span className="font-bold text-3xl py-4">{course.name}</span>

            <div className="flex flex-row py-4">
                <span
                    onClick={() => setCurrTab(CourseTabs.DESCRIPTION)}
                    className={
                        (currTab == CourseTabs.DESCRIPTION
                            ? "course-tab-selected"
                            : "text-gray") + " course-tab pr-6"
                    }>
                    Основные данные
                </span>
                <span
                    onClick={() => setCurrTab(CourseTabs.SCHEDULE)}
                    className={
                        (currTab == CourseTabs.SCHEDULE
                            ? "course-tab-selected"
                            : "text-gray") + " course-tab"
                    }>
                    Расписание
                </span>
            </div>
            {currTab == CourseTabs.DESCRIPTION ? (
                <div className="font-semibold text-lg">
                    {course.description}
                </div>
            ) : (
                <div className="font-bold text-3xl py-8">{course.schedule}</div>
            )}
            <span className="font-bold text-3xl py-8">
                {course.queued ? "В очереди" : course.attending ? "Записан на курс" : props.userId ? "Отправить заявку" : <>Для того чтоб отправить заявку авторизуйтесь <VkAuthButton/> </>}
                </span>
            {course.attending || course.queued || !props.userId ? (
                <></>
            ) : (
                course.requiredDocuments.map((el) => (
                    <FileUploadInput
                        token={props.token}
                        courseId={courseId!}
                        key={el}
                        title={el}
                    />
                ))
            )}
            <div className="py-4">
                {course.attending ? (
                    <Button
                        onClick={() => unattend.mutate({ course: course.id })}
                        accent="red">
                        Покинуть курс
                    </Button>
                ) : course.queued ? (
                    <Button
                        onClick={() => unattend.mutate({ course: course.id })}
                        accent="blue">
                        Выйти из очереди
                    </Button>
                ) : props.userId ? (
                    <Button
                        onClick={() => attend.mutate({ course: course.id })}
                        accent="black">
                        Отправить
                    </Button>
                ) : <></>}
            </div>
        </div>
    );
};

export default CourseTab;
