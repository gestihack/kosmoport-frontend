import { FunctionComponent } from "react";
import { useLocation, redirect, Navigate } from "react-router";
import { useQuery } from "react-query";
import { EMAIL, ME, fn } from "../Contraints";

const OAuth: FunctionComponent = (props) => {
    let { hash } = useLocation();
    // let token = hash.substring(1).split('=')[1].split('&')[0];
    let token = hash.substring(hash.indexOf("access_token"))
                    .split("=")[1]
                    .split("&")[0];

    let email = hash.substring(hash.indexOf("email"))
                    .split("=")[1]
                    .split("&")[0];
    

    const email_query = useQuery({
        enabled: true,
        retry: false,
        cacheTime: 0,
        queryKey: "email",
        queryFn: () => fn(EMAIL, {token, body: {email}})
    })

    const { data, isSuccess } = useQuery({
        enabled: true,
        queryKey: ["oauth"],
        cacheTime: 0,
        retry: false,
        queryFn: () => fn(ME, {token})
    })

    if (token && isSuccess) {
        localStorage.setItem("token", token!);
    }
    else {
        return <>...</>
    }
    
    return (
        <Navigate replace to="/" />
    )
}
 
export default OAuth;