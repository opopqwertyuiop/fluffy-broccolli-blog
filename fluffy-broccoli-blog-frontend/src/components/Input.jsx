const Input = ({
  type = 'text',
  input,
  isDisabled = false,
  isError = false,
  name,
}) => {
  return (
    <input
      {...input}
      type={type}
      id={name}
      disabled={isDisabled}
      className={`${'w-full text-base px-1 py-1 border-b '}${
        isError ? 'border-red-600' : ''
      }`}
    />
  );
};
// co
export default Input;
