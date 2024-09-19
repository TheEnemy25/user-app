import React from "react";

interface FilterSelectProps {
  label: string;
  options: { name: string; value: string }[];
  selectedValue?: string;
  selectedValues?: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  multiple?: boolean;
  disabled?: boolean;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  options,
  selectedValue,
  selectedValues,
  onChange,
  multiple,
  disabled,
}) => (
  <div className="mb-4">
    <label className="block mb-2">{label}</label>
    <select
      multiple={multiple}
      onChange={onChange}
      value={selectedValues || selectedValue || ""}
      className="p-2 border border-gray-300 rounded"
      disabled={disabled}
    >
      {!multiple && <option value="">Select {label.replace(":", "")}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

export default FilterSelect;
