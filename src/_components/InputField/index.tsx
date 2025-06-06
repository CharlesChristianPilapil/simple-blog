import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const InputField = ({ label, id, className, ...props }: InputFieldProps) => {
    return (
        <div className="flex flex-col gap-2 max-w-[300px]">
            <label htmlFor={id} className="w-fit"> {label} </label>
            <input
                id={id}
                className={`border border-green-500/25 outline-green-300 rounded-sm p-2 ${className ?? ""}`}
                {...props}
            />
        </div>
    )
}
export default InputField