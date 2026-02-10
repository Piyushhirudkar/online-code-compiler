import { useEffect, useState } from "react";
import axios from "axios";

const Compiler = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // 🔁 Load submission history
  useEffect(() => {
    if (!token) return;

    const loadSubmissions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/compiler/submissions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubmissions(res.data);
      } catch {
        console.log("Failed to load submissions");
      }
    };

    loadSubmissions();
  }, [token]);

  // 🚀 Submit code
  const handleSubmit = async () => {
    setMessage("");

    try {
      await axios.post(
        "http://localhost:5000/api/compiler/submit",
        { language, code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Code submitted successfully ✅");
      setCode("");

      // reload history
      const refreshed = await axios.get(
        "http://localhost:5000/api/compiler/submissions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubmissions(refreshed.data);
    } catch {
      setMessage("Code submission failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Compiler</h2>

      {/* Language */}
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="c">C</option>
        <option value="cpp">C++</option>
        <option value="python">Python</option>
      </select>

      <br /><br />

      {/* Code */}
      <textarea
        rows="8"
        style={{ width: "100%" }}
        placeholder="Write your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Submit</button>

      <p>{message}</p>

      <hr />

      <h3>History</h3>

      {submissions.length === 0 && <p>No submissions yet</p>}

      {submissions.map((s) => (
        <div
          key={s._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <strong>Language:</strong> {s.language}
          <pre
            style={{
              background: "#f4f4f4",
              padding: "10px",
              overflowX: "auto",
            }}
          >
            {s.code}
          </pre>
        </div>
      ))}
    </div>
  );
};

export default Compiler;
