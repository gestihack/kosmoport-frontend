import { FunctionComponent } from "react";
import vkauth_button from "../assets/vkauth_button.svg";
import { VK_APPID } from "../Contraints";

interface VkAuthButtonProps {
    
}
 
const VkAuthButton: FunctionComponent<VkAuthButtonProps> = () => {
    // console.log(VK_APPID);
    let vk_oath_url = `https://oauth.vk.com/authorize?client_id=${VK_APPID}&display=page&redirect_uri=https://kp.gesti.tech/oauth/&scope=offline,email&response_type=token&v=5.131&state=123456`;

    return ( 
        <div className="py-6 content-center self-center pr-7">
            <a className="" href={vk_oath_url}>
                <img className="max-w-12" src={vkauth_button} alt="" />
            </a>
        </div>
    );
}
 
export default VkAuthButton;