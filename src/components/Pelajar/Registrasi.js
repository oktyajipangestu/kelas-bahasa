import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import swal from 'sweetalert';

const Registrasi = () => {
  const history = useHistory();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmPassword, setKonfirmPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const dataSend = {
      nama,
      email,
      password,
      password_confirmation: konfirmPassword
    };

    if (nama === "" || email === "" || password === "" || konfirmPassword === "") {
      swal('Failed', 'Gagal Daftar', 'error');
    } else {
      fetch(`${process.env.REACT_APP_API}/registrasiPelajar`, {
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
              history.push("/loginPelajar");
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
                  <h2>Registrasi Pelajar</h2>
                  <p>Yuk Gabung, untuk mulai belajar</p>
                </div>
                <div className="form-body">
                  <form>
                    <div class="form-group">
                      <label htmlFor="form-name">Nama Lengkap</label>
                      <input type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className="form-control"
                      placeholder="nama"/>
                    </div>

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

                    <div class="form-group">
                      <label htmlFor="form-password">Konfirmasi Password</label>
                      <input type="password"
                      value={konfirmPassword}
                      onChange={(e) => setKonfirmPassword(e.target.value)}
                      className="form-control"
                      placeholder="konfirmasi password"/>
                    </div>

                    <div className="form-group">
                    {password !== konfirmPassword && (password.length > 0 || konfirmPassword.length > 0) ? 
                      <span style={{color:"red", fontSize:"14px"}}>password dan konfirm password harus sama</span> : ""  
                    }
                  </div>
                  

                  <div className="form-group">
                    <button
                      onClick={(e) => handleSubmit(e)}
                      className="btn float-right login_btn"
                    >
                      REGISTRASI
                    </button>
                  </div>
                </form>
                <br />
                <br />
                <hr />
                <div>
                  <p>Sudah punya akun? <Link to="/loginPelajar">Masuk</Link></p>
                </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Registrasi;
