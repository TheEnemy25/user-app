import React from "react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  required,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-md shadow-sm w-full p-2"
      required={required}
    />
  </div>
);

export default TextInput;
