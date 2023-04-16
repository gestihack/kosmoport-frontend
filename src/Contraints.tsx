import { useMemo } from "react";
import { useLocation } from "react-router";

export function fn(
    route: string,
    params?: {
        token?: string;
        body?: any;
        method?: "POST" | "GET";
        aboba?: boolean;
    },
) {
    return fetch(API_URL + route, {
        method: !params?.body ? "GET" : "POST",
        headers: {
            ...(params?.token
                ? { Authorization: "Bearer " + params?.token }
                : {}),
            ...(params?.aboba ? {} : { "Content-Type": "application/json" }),
        },
        body: params?.body
            ? params?.aboba
                ? params?.body
                : JSON.stringify(params?.body)
            : undefined,
    }).then((res) => res.json());
}

export const API_URL = import.meta.env.VITE_API_URL;
export const VK_APPID = import.meta.env.VITE_VK_APPID;
export const ME = "/me";
export const EMAIL = "/auth/mail";
export const COURSES = "/courses/";
export const MY_COURSES = "/courses/attending";
export const ATTEND_COURSE = "/courses/attend";
export const UNATTEND_COURSE = "/courses/unattend";
export const COURSE_BY_ID = COURSES + "/course/";
export const CREATE_COURSE = "/courses/tutor/new/";
export const UPLOAD_DOC = "/docs/upload";
export const DELIVERY_STATUS = "/status";
export const WAITING_TRUCKS = "/storekeeper/waiting";
export const ACCEPT = "/storekeeper/accept";
export const AUTH = "/auth/login";
export const DELIVERY = "/security/checking";
export const SECURITY = "/security/";
export const QUEUE = "/security/queued";
