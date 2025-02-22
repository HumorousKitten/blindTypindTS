import React from 'react'
import cl from "./_Datainfo.module.scss"
type TInput = 'text' | 'email' | 'password'

interface IDataINFOProps{
  type: TInput
  placeholder: 'Login' | 'E-mail' | 'Password'
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  value?: string;
}

export const DataINFO = React.forwardRef<HTMLInputElement, IDataINFOProps>((props, ref) => {

  const { type, placeholder, onChange, onBlur, value } = props;
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={cl.dataInfo}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      ref={ref}
      autoComplete='off'
    />
  );
});
 
