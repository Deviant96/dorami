import type { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
    label: string;
}

const Input: React.FC<InputProps> = ({
    label,
    ...props
}) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        className="input input-bordered w-full"
        {...props}
      />
    </div>
  );
}

export default Input;