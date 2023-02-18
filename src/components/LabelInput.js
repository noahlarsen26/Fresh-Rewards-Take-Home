function LabelInput({ label, type, value, onChange, required }) {
  return (
    <label>
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </label>
  );
}

export default LabelInput;
