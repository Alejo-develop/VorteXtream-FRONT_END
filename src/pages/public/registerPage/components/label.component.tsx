import { ChangeEvent, ReactNode } from "react";

interface LabelProps{
    placeholder?: string;
    icon?: ReactNode;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    type: string;
    className?: string;
    valueDefault?: string;
    disable?: boolean;
} 

const LabelComponent = (props: LabelProps) => {
    return (
       <div >
            {props.icon}
         <input className={props.className} type={props.type} placeholder={props.placeholder} onChange={props.onChange} value={props.valueDefault} disabled={props.disable} />
       </div>
    )
}

export default LabelComponent