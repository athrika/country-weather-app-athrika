import { style } from "@mui/system";
import { ChangeEvent, FC } from "react";
import  "./inputLabel.css";

type InputWithLabelProps = {
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
};

const Input_Label: FC<InputWithLabelProps> = ({
  id,
  value,
  placeholder,
  onChange,
}) => (
  <div className='container'>
    <label className='label' htmlFor={id}>
    </label>
    <input
      className='input'
      id={id}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  </div>
);

export default Input_Label;
