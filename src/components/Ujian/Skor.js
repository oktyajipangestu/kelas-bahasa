import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const Skor = () => {
    const { state } = useLocation();
  const history = useHistory();
  const [skor, setSkor] = useState([]);

  useEffect(() => {
    const login = localStorage.getItem("loginPelajar");
    if (!login) {
      history.push("/");
      return;
    }

    getNilai();
  }, []);

  const handleCobaLagi = () => {
    const token = localStorage.getItem("loginPelajar");
    const dataSend = {
      token,
    };
    fetch(`http://127.0.0.1:8000/selesaiUjian`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        if (hasil.status === "berhasil") {
          history.push("/quiz");
          return;
        } else {
          history.push("/");
          return;
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getNilai = () => {
    const token = localStorage.getItem("loginPelajar");
    const dataSend = {
      token,
      id_kelas: state.id,
    };
    fetch(`http://127.0.0.1:8000/hitungSkor`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        if (hasil.status === "gagal") {
          history.push("/");
          return;
        }
        setSkor(hasil);
      });
  };

  return (
    <>
      <div className="card" style={{ margin: "auto" }}>
        <div className="card-content" style={{ padding: "94px" }}>
          <div className="content text-center text-black">
            <h3>Nilai yang kamu peroleh</h3>
            <h1>{skor.skor ? skor.skor * 10 : null}</h1>
            <button
              className="btn btn-info mt-2"
              onClick={() => handleCobaLagi()}
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skor;
