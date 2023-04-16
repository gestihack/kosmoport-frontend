import { FunctionComponent, useState } from "react";
import UserApp from "./components/UserApp";

interface AppProps {
    token?: string;
    course?: boolean;
    create?: boolean;
}

const App: FunctionComponent<AppProps> = (props) => {
    let [token, setToken] = useState(localStorage.getItem("token") ?? undefined);

    return <UserApp token={token} course={props.course} create={props.create}/>
}
export default App;