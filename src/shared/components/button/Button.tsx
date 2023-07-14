type Props = {
  label: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
};

export default function Button(props: Props) {
  const { label = '', type = 'button' } = props;
  return (
    <button
      className="bg-transparent hover:bg-blue-500 text-blue-700 dark:text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      style={{ width: '100%' }}
      type={type}
      onClick={props.onClick}
    >
      {label}
    </button>
  );
}
