import React from "react";

interface InputFieldProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type: string;
    required?: boolean;
    className?: string;
    id?: string;
    name?: string;
}

const InputField: React.FC<InputFieldProps> = ({
                                                   value,
                                                   onChange,
                                                   placeholder,
                                                   type,
                                                   required = false,
                                                   className = '',
                                                   id,
                                                   name,
                                               }) => {
    const defaultClasses =
        'bg-gray-700 rounded w-full p-2 text-gray-200 outline-none';
    const inputClasses = `${defaultClasses} ${className}`;

    return (
        <input
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            required={required}
            className={inputClasses}
        />
    )

}

export default InputField;