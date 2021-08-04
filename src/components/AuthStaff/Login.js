import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataSend = {
        email,
        password
    };

    if (email === "" || password === "") {
      alert("Harap isi form yang ada");
    } else {
      fetch(`http://127.0.0.1:8000/loginAdmin`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((hasil) => {
          console.log(hasil);
          localStorage.setItem("loginAdmin", hasil.token);
          history.push("/halamanAdmin");
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h1>Login Admin</h1>
            </div>

            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="email"
                  ></input>
                </div>

                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="password"
                  ></input>
                </div>

                <div className="form-group">
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="btn float-right login_btn"
                  >
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
