import { useState, useEffect } from "react";
import LabelInput from "./LabelInput";
import LabelSelect from "./LabelSelect";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState("");
  const [state, setState] = useState("");
  const [occupations, setOccupations] = useState([]);
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://frontend-take-home.fetchrewards.com/form")
      .then((response) => response.json())
      .then((data) => {
        setOccupations(data.occupations);
        setStates(data.states);
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      name,
      email,
      password,
      occupation,
      state,
    };
    try {
      const response = await fetch(
        "https://frontend-take-home.fetchrewards.com/form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSuccess(true);

        // reset the form
        setName("");
        setEmail("");
        setPassword("");
        setOccupation("");
        setState("");
      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>fetch rewards frontend test</h1>
      <div className="form-container">
        <div className="form-label">
          <LabelInput
            label="Full Name:"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-label">
          <LabelInput
            label="Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-label">
          <LabelInput
            label="Password:"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-label">
          <LabelSelect
            label="Occupation:"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            options={occupations}
            required
          />
        </div>
        <div className="form-label">
          <LabelSelect
            label="State:"
            value={state}
            onChange={(e) => setState(e.target.value)}
            options={states.map((state) => state.name)}
            required
          />
        </div>
        <button className="btn" type="submit">
          {isLoading ? "Loading..." : "Submit"}
        </button>
        {success && <SuccessMessage message="Form submitted successfully!" />}
        {error && <ErrorMessage message={error} />}
      </div>
    </form>
  );
}

export default UserForm;
