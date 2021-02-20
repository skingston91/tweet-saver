import React, {SFC, InputHTMLAttributes} from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

export const Input: SFC<InputProps> = ({name, ...rest}) => {
    return (
        <input className="Input" id={name} {...rest} />
    )
}

export default Input