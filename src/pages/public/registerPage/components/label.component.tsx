import { ReactNode } from "react";

interface LabelProps{
    placeholder: string;
    icon: ReactNode
} 

const LabelComponent = (props: LabelProps) => {
    return (
       <div>
            {props.icon}
         <input type="text" placeholder={props.placeholder} />
       </div>
    )
}

export default LabelComponent