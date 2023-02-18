function LabelSelect({ label, value, onChange, options, required }) {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange} required={required}>
        <option value="">-- Select {label} --</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default LabelSelect;
