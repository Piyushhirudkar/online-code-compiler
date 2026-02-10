import { useEffect, useState } from "react";
import axios from "axios";

const Compiler = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [submissions, setSubmissions] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
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

    if (token) {
      loadSubmissions();
    }
  }, [token]);

  const handleSubmit = async () => {
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

      setMessage("Code submitted successfully");
      setCode("");

      // reload submissions
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
      setMessage("Code submission failed");
    }
  };

  return (
    <div>
      <h2>Online Code Compiler</h2>

      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="c">C</option>
        <option value="cpp">C++</option>
        <option value="python">Python</option>
      </select>

      <br /><br />

      <textarea
        rows="6"
        placeholder="Write code here"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Submit</button>

      <p>{message}</p>

      <hr />

      <h3>Submission History</h3>
      {submissions.map((s) => (
  <div
    key={s._id}
    style={{
      border: "1px solid #ccc",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
    }}
  >
    <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
      Language: {s.language}
    </div>

    <pre
      style={{
        background: "#f5f5f5",
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
