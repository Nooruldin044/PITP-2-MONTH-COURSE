import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Valid email required";
    if (form.password.length < 6) err.password = "Password must be 6+ chars";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert("Registration successful!");
      setForm({ name: "", email: "", password: "" });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="page form-page">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
