import "./inputFields.css"; 

const inputFields = ({ type, placeholder, value, onChange, id, labelName }) => {
  return (
    <div className="input-container">
      <label htmlFor={id} className="label">
        {labelName}
      </label>
      <input
        className="input"
        placeholder={placeholder}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default inputFields;
