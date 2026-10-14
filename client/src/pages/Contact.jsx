import { useState } from "react";
import { useNavigate } from "react-router-dom";

const emptyForm = { firstName: "", lastName: "", phone: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const navigate = useNavigate();

  // Keep state in sync with each input (matched by the input's name)
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // capture values, then return to Home (nothing is sent or stored)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Captured form values:", form);
    navigate("/");
  };

  // Form layout
  return (
    <section>
      <h1>Contact</h1>
      <p>Email: daelitecoder1@gmail.com | Phone: (647)-655-0753 | HQ: Toronto, ON</p>
      <form className="form" onSubmit={handleSubmit}>
        <label>First name<input name="firstName" value={form.firstName} onChange={handleChange} required /></label>
        <label>Last name<input name="lastName" value={form.lastName} onChange={handleChange} required /></label>
        <label>Contact number<input name="phone" type="tel" value={form.phone} onChange={handleChange} required /></label>
        <label>Email address<input name="email" type="email" value={form.email} onChange={handleChange} required /></label>
        <label>Message<textarea name="message" rows="5" value={form.message} onChange={handleChange} required /></label>
        <button className="button" type="submit">Send message</button>
      </form>
    </section>
  );
}
