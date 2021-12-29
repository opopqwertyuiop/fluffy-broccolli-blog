import Input from './Input';
// //
const Field = ({ errors, name, label, mb = '0px', ...props }) => {
  const isError = !!(errors && errors[name]);
  return (
    <div style={{ marginBottom: mb }}>
      <label
        htmlFor={name}
        className={`${''}${isError ? ' text-red-600' : ''}`}
      >
        {label}
      </label>
      <Input {...props} name={name} isError={isError} />
      {isError && (
        <ul>
          {errors[name].map((error) => (
            <li className='text-red-600 text-sm'>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Field;
