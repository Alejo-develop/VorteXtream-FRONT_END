import { ChangeEvent, ReactNode } from "react";

interface LabelProps{
    placeholder: string;
    icon: ReactNode;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    type: string
} 

const LabelComponent = (props: LabelProps) => {
    return (
       <div>
            {props.icon}
         <input type={props.type} placeholder={props.placeholder} onChange={props.onChange} />
       </div>
    )
}

export default LabelComponent