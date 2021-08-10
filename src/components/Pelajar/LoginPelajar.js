import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import swal from 'sweetalert';

const LoginPelajar = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataSend = {
      email,
      password,
    };

    if (email === "" || password === "") {
      swal('Failed', 'Gagal Login', 'error');
    } else {
      fetch(`${process.env.REACT_APP_API}/loginPelajar`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((hasil) => {
            console.log(hasil)
            if(hasil.status === 'berhasil') {
                localStorage.setItem("loginPelajar", hasil.token);
                localStorage.setItem("pelajar", hasil.data);
                history.push("/ruangKelas");
            }

        })
        .catch((err) => {
            alert(err);
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center form-login-pelajar">
            <div className="col-md-4 col-sm-9 form-login">
                <div className="form-header">
                  <h2>Login Pelajar</h2>
                  <p>Silahkan login untuk lanjut belajar</p>
                </div>
                <div className="form-body">
                  <form>
                  <div class="form-group">
                    <label htmlFor="form-email">Email</label>
                    <input type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="email" id="form-email"/>
                  </div>

                  <div class="form-group">
                    <label htmlFor="form-password">Password</label>
                    <input type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      placeholder="password" id="form-password"/>
                  </div>

                  <div className="form-group">
                    <button
                      onClick={(e) => handleSubmit(e)}
                      className="btn login_btn"
                    >
                      LOGIN
                    </button>
                  </div>
                </form>
                <hr />
                <div>
                  <p>belum punya akun? <Link to="/registrasiPelajar">Daftar</Link></p>
                </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default LoginPelajar;
