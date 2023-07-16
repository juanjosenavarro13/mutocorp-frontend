import { ChangeEvent, useState } from 'react';

type InputProps = {
  type: 'text' | 'number' | 'email' | 'password';
  initialValue: string | number;
  label: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: 'on' | 'off';
  onChangeValue?: (value: string) => void;
  onBlur?: () => void;
};

export default function Input(props: InputProps) {
  const {
    type = 'text',
    initialValue = '',
    label = '',
    placeholder = '',
    disabled = false,
    name = '',
    autoComplete = 'on',
    onChangeValue,
    onBlur,
  } = props;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChangeValue && e) onChangeValue(e.target.value);
  };

  const [value, setValue] = useState(initialValue);

  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        autoComplete={autoComplete}
        onChange={handleOnChange}
        onBlur={onBlur}
      />
    </div>
  );
}
