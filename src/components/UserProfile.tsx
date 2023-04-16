import { FunctionComponent, useEffect } from "react";
import { useQuery } from "react-query";
import { User } from "./CoursesTab";
import { ME, fn } from "../Contraints";
import exit_icon from "../assets/exit_icon.svg"
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";

interface UserProfileProps {
    // token: string;
    user: User;
}

const UserProfile: FunctionComponent<UserProfileProps> = (props) => {
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    // let { data, isFetched } = useQuery({
    //     enabled: true,
    //     queryKey: "me",
    //     refetchOnWindowFocus: false,
    //     queryFn: () => fn(ME, { token: props.token }),
    // });
    // if (!isFetched) return <></>;
    // let user = data?.user as User;
    let user = props.user;

    return (
        <div className="flex flex-row pr-[6rem]">
            <div>
                <img
                    className="rounded-[100px] m-2 w-10 h-10"
                    src={user.avatar}
                    alt=""
                />
            </div>
            <div className="flex flex-col justify-center">
                <Link to="/" className="flex flex-row text-sm font-bold justify-center">
                    <span>
                        {user.lastname} {user.name} {user.surname}
                    </span>
                    <span onClick={logout}
                     className="text-red pl-4 flex flex-row justify-center cursor-pointer">
                        Выход
                        
                        <ReactSVG
                            src={exit_icon}
                            //@ts-ignore
                            className="w-5 h-5 pl-1 stroke-red fill-red"
                        />
                    </span>
                </Link>
                <span className="text-gray text-sm text-bold">{user.email}</span>
            </div>
        </div>
    );
};

export default UserProfile;
