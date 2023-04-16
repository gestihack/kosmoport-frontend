import { FunctionComponent } from "react";
import ks_logo from "../assets/ks_logo.svg";

interface LogosProps {
    className: string;
    dClassName: string;
}

const Logos: FunctionComponent<LogosProps> = (props) => {
    return (
        <div className={props.dClassName + " flex flex-row justify-center max-w-[18rem] md:w-[28rem]"}>
            {/* <div
                id="zink"
                className="flex align-middle w-1/2 justify-end pr-8">
                <img src={zink_logo} />
            </div>
            <div
                id="ugmc"
                className="flex align-middle w-1/2 justify-start pl-8">
                <img src={ugmc_logo} />
            </div> */}
            <div
            id="kosmo"
            className={props.className + " flex align-middle justify-center"}>
                <img src={ks_logo} />
            </div>
        </div>
    );
}

export default Logos
