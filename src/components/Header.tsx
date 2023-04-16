import { FunctionComponent, useState } from "react";
import Logos from "./Logos";
import HeaderTab from "./HeaderTab";
import cources_logo from "../assets/courses.svg";
import my_cources_logo from "../assets/my_cources.svg";
import VkAuthButton from "./VkAuthButton";
import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";
import ks_logo from "../assets/ks_logo.svg";
import plus_icon from "../assets/plus.svg";
import { User, UserRole } from "./CoursesTab";
import Button from "./Button";

export enum HeaderTabs {
    MY_COURCES = "my_cources",
    COURCES = "cources",
    CREATE_COURSE = "create_course",
}

interface HeaderProps {
    currTab: HeaderTabs;
    setCurrTab: React.Dispatch<React.SetStateAction<HeaderTabs>>;
    user: User;
}

const Header: FunctionComponent<HeaderProps> = (props) => {
    return (
        <header
            className="l-0 t-0 box-border border-b-[2px] border-gray-light flex flex-row min-h-4
        max-h-[64px]">
            <div className="flex flex-1 flex-row">
                <div className="pl-8 items-center lg:flex flex-row justify-center max-w-[18rem] md:w-[28rem] lg:visible hidden">
                    <Link replace to="/">
                        <div
                        onClick={() => props.setCurrTab(HeaderTabs.COURCES)}
                         className=" flex align-middle justify-center">
                            <img src={ks_logo} />
                        </div>
                    </Link>
                </div>
                {/* <Logos dClassName={"hidden md:visible "} className={"pl-8"}/> */}
                <span className="hidden relative after:h-full w-[3rem]"></span>
                <HeaderTab
                    title="Поиск курсов"
                    active={props.currTab == HeaderTabs.COURCES}
                    icon={cources_logo}
                    onClick={() => props.setCurrTab(HeaderTabs.COURCES)}
                />
                {props.user ? <HeaderTab
                    title="Мои курсы"
                    active={props.currTab == HeaderTabs.MY_COURCES}
                    icon={my_cources_logo}
                    onClick={() => props.setCurrTab(HeaderTabs.MY_COURCES)}
                /> : <></>}
            </div>

            <div className="flex flex-row justify-end">
                {props.user ? (
                    props.user.role == UserRole.TUTOR ? (
                        <>
                            <Link className="flex p-[1px]" to="/course/create/">
                                <Button
                                    accent="black"
                                    onClick={() =>
                                        props.setCurrTab(
                                            HeaderTabs.CREATE_COURSE,
                                        )
                                    }
                                    icon={plus_icon}
                                    slim>
                                    Создать курс
                                </Button>
                            </Link>
                            <UserProfile user={props.user} />
                        </>
                    ) : (
                        <UserProfile user={props.user} />
                    )
                ) : (
                    <VkAuthButton />
                )}

                {/* {props.user ? (
                    (true ? (
                        <Button
                            accent="black"
                            onClick={() => props.setCurrTab(HeaderTabs.CREATE_COURSE)}
                            icon={plus_icon}
                            slim>
                            Создать проект
                        </Button>
                    ) 
                    <UserProfile user={props.user} />)
                ) : (
                    <VkAuthButton />
                )} */}
            </div>
        </header>
    );
};

export default Header;
