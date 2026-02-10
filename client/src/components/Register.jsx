function Register() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Register</h3>
        <input placeholder="Name" className="form-control mb-2" />
        <input placeholder="Email" className="form-control mb-2" />
        <input placeholder="Password" type="password" className="form-control mb-3" />
        <button className="btn btn-success w-100">Register</button>
      </div>
    </div>
  );
}

export default Register;
