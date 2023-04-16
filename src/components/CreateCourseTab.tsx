import { FunctionComponent, useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { useMutation } from "react-query";
import { CREATE_COURSE, fn } from "../Contraints";
import { User } from "./CoursesTab";
import { Link, Navigate } from "react-router-dom";

interface CreateCourseTabProps {
    token: string;
    user: User;
}

const CreateCourseTab: FunctionComponent<CreateCourseTabProps> = (props) => {
    let { mutate, isSuccess } = useMutation({
        mutationFn: (b: {
            name?: string;
            description?: string;
            age?: string;
            people?: number;
            schedule?: string;
            requiredDocuments?: string[];
        }) => {
            if (Object.values(b).filter((el) => !el).length > 0) throw "";

            return fn(CREATE_COURSE, {
                token: props.token,
                body: {
                    place: "AO Космопорт",
                    tutor: `${props.user.lastname} ${props.user.name}`,
                    ...b,
                },
            });
        },
    });

    

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [age, setAge] = useState();
    const [people, setPeople] = useState();
    const [schedule, setSchedule] = useState<string>();
    const [requiredDocuments, setDocs] = useState<string[]>(["Согласие на обработку персональных данных"]);
    // let schedule = {};
    // let setSchedule = {};
    // let docs: string[] = [];
    // let setDocs = {};

    if (isSuccess) window.location.reload()

    return (
        <div className="py-20 mb-12 pl-[90px] flex flex-col h-[calc(100%-4rem)] w-auto max-w-screen-lg">
            <span className="font-bold text-2xl pb-5">Создание курса</span>
            <InputField
                input={name}
                setInput={setName}
                placeholder="Название курса"
            />
            <InputField
                input={description}
                setInput={setDescription}
                textbox
                placeholder="Описание курса"
            />
            <InputField
                input={age}
                setInput={setAge}
                placeholder="Возраст участников"
            />
            <InputField
                type="number"
                input={people}
                setInput={setPeople}
                placeholder="Максимальное количество участников"
            />
            <InputField
                input={schedule}
                setInput={setSchedule}
                textbox
                placeholder="Расписание"
            />
            <InputField
                input={requiredDocuments}
                setInput={setDocs}
                tags
                placeholder="Список необходимых документов"
            />

            <div className="py-4">
                <Button
                    onClick={() =>
                        mutate({
                            name,
                            description,
                            age,
                            people,
                            schedule,
                            requiredDocuments,
                        })
                    }
                    accent="black">
                    Сохранить
                </Button>
            </div>
        </div>
    );
};

export default CreateCourseTab;
