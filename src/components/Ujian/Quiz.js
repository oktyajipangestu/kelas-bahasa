import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

const Quiz = () => {
    const { state } = useLocation();
    const history = useHistory();
    const [dataSoal, setDataSoal] = useState([]);
    const [cek, setCek] = useState([]);
    const [status, setStatus] = useState("");
    const [showLihatSkor, setShowLihatSkor] = useState(false);

    useEffect(() => {
        const login = localStorage.getItem('loginPelajar');
        if(!login) {
            history.push('/');
            return
        }
        getListSoal();
    }, []);

    const getListSoal = async () => {
        const token = localStorage.getItem("loginPelajar");
        const sendData = {
            token,
            id_kelas: state.id
        };
        fetch(`http://127.0.0.1:8000/quiz`, {
        method: "POST",
        body: JSON.stringify(sendData),
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((res) => res.json())
        .then((hasil) => {
            if (hasil.status === "berhasil") {
                setDataSoal(hasil);
            } else {
                localStorage.removeItem("loginPelajar");
                history.replace("/");
            }
        })
        .catch((err) => {
            alert(err);
        });
    };

    const handleSubmit = (e, index, data) => {
        setStatus("");
        const token = localStorage.getItem("loginPelajar");
        let newData = cek;
        const dataSend = {
            token,
            id_kelas: state.id,
            id_soal: data.id_soal,
            jawaban: e.target.value,
            id_skor: dataSoal.id_skor,
        };

        const sendDataSoal = {
            token,
            id_kelas: state.id
        }

        fetch(`http://127.0.0.1:8000/jawab`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((res) => res.json())
        .then((hasil) => {
            newData[index] = true;
            setCek(newData);
            setStatus("hasil");
            if (hasil.status === "gagal") {
                history.replace("/");
                localStorage.removeItem("loginPelajar");
                 return;
            }
            fetch(`http://127.0.0.1:8000/quiz`, {
                method: "POST",
                body: JSON.stringify(sendDataSoal),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(res => res.json())
            .then(hasil => {
                if(hasil.data === "gagal") {
                    history.replace("/")
                    return
                }
                if(hasil.data[0].jumlah_jawaban === 10) {
                    setShowLihatSkor(true);
                    return
                }
            })
            .catch((err) => {
            alert(err);
            })
        })
        .catch((err) => {
            alert(err);
        });
    };

    return (
        <>
        <div className="soal-lomba" style={{ paddingTop: "100px" }}>
        <h1 className="text-center pb-5">Soal Quiz</h1>

        <div className="container soal-card">
          <form>
            {dataSoal?.data?.map((data, index) => {
              return (
                <div className="soal-1" key={index}>
                  <div>
                    <p className="m-0">{`${index + 1}. ${data.pertanyaan}`}</p>
                    <div className="soal-1 d-flex flex-column">
                      {index + 1 > data.jumlah_jawaban ? (
                        <>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={data.opsi1}
                                onClick={(e) => handleSubmit(e, index, data)}
                                type="radio"
                                name={`soal-${index + 1}`}
                                id={`s${index + 1}-option${index + 1}`}
                                disabled={cek[index]}
                              />
                            </div>
                            <div className="ml-3">
                              <label
                                htmlFor={`s${index + 1}-option${index + 1}`}
                              >
                                A. {data.opsi1}
                              </label>
                            </div>
                          </div>

                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={data.opsi2}
                                onClick={(e) => handleSubmit(e, index, data)}
                                type="radio"
                                name={`soal-${index + 1}`}
                                id={`s${index + 1}-option${index + 2}`}
                                disabled={cek[index]}
                              />
                            </div>
                            <div className="ml-3">
                              <label
                                htmlFor={`s${index + 1}-option${index + 2}`}
                              >
                                B. {data.opsi2}
                              </label>
                            </div>
                          </div>

                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={data.opsi3}
                                onClick={(e) => handleSubmit(e, index, data)}
                                type="radio"
                                name={`soal-${index + 1}`}
                                id={`s${index + 1}-option${index + 3}`}
                                disabled={cek[index]}
                              />
                            </div>
                            <div className="ml-3">
                              <label
                                htmlFor={`s${index + 1}-option${index + 3}`}
                              >
                                C. {data.opsi3}
                              </label>
                            </div>
                          </div>

                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={data.opsi4}
                                onClick={(e) => handleSubmit(e, index, data)}
                                type="radio"
                                name={`soal-${index + 1}`}
                                id={`s${index + 1}-option${index + 4}`}
                                disabled={cek[index]}
                              />
                            </div>
                            <div className="ml-3">
                              <label
                                htmlFor={`s${index + 1}-option${index + 4}`}
                              >
                                D. {data.opsi4}
                              </label>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={data.opsi1}
                                onClick={(e) => handleSubmit(e, index, data)}
                                type="radio"
                                name={`soal-${index + 1}`}
                                id={`s${index + 1}-option${index + 1}`}
                                disabled
                              />
                            </div>
                            <div className="ml-3">
                              <label
                                htmlFor={`s${index + 1}-option${index + 1}`}
                              >
                                A. {data.opsi1}
                              </label>
                            </div>
                          </div>

                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={data.opsi2}
                                onClick={(e) => handleSubmit(e, index, data)}
                                type="radio"
                                name={`soal-${index + 1}`}
                                id={`s${index + 1}-option${index + 2}`}
                                disabled
                              />
                            </div>
                            <div className="ml-3">
                              <label
                                htmlFor={`s${index + 1}-option${index + 2}`}
                              >
                                B. {data.opsi2}
                              </label>
                            </div>
                          </div>

                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={data.opsi3}
                                onClick={(e) => handleSubmit(e, index, data)}
                                type="radio"
                                name={`soal-${index + 1}`}
                                id={`s${index + 1}-option${index + 3}`}
                                disabled
                              />
                            </div>
                            <div className="ml-3">
                              <label
                                htmlFor={`s${index + 1}-option${index + 3}`}
                              >
                                C. {data.opsi3}
                              </label>
                            </div>
                          </div>

                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={data.opsi4}
                                onClick={(e) => handleSubmit(e, index, data)}
                                type="radio"
                                name={`soal-${index + 1}`}
                                id={`s${index + 1}-option${index + 4}`}
                                disabled
                              />
                            </div>
                            <div className="ml-3">
                              <label
                                htmlFor={`s${index + 1}-option${index + 4}`}
                              >
                                D. {data.opsi4}
                              </label>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </form>
          {showLihatSkor ? <Link to={{ pathname: '/skor', state: { id: state.id, judul: state.judul} }}>Lihat Skor</Link> : null}
        </div>
      </div>
        </>
    );
}

export default Quiz