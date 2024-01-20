import { ChangeEvent } from "react";

interface InputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ id, label, type, value, error, onChange }: InputProps) => {
  return (
    <div className="input-field">
      <p className="input-field__label">
        {label}
      </p>

      <input
        id={id}
        type={type}
	value={value}
	onChange={onChange}
	className="input-field__text-box"
      />

      {error &&
        <p className="auth-form__error">
	  {error}
	</p>
      }
    </div>
  )
}

export default InputField;
