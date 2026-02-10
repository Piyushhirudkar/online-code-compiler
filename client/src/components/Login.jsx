import { useState } from "react";
import { loginUser } from "../api/auth";

const Login = () => {
  console.log("LOGIN COMPONENT RENDERED");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("");

    try {
      const res = await loginUser({ email, password });
      setMessage(res.data.message);

      // Save login info
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button
  onClick={() => {
    console.log("LOGIN BUTTON CLICKED");
    handleLogin();
  }}
>
  Login
</button>


      <p>{message}</p>
    </div>
  );
};

export default Login;
