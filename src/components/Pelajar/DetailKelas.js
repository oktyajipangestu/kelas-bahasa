import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../Footer';
import NavbarLogin from '../NavbarLogin';

const DetailKelas = (props) => {
    const nama = localStorage.getItem("pelajar");
    const { state } = useLocation();
    const [daftarMateri, setDaftarMateri] = useState([]);
    const [idMateri, setIdMateri] = useState();
    const [detailMateri, setDetailMateri] = useState([]);
    const [DaftarKomentar, setDaftarKomentar] = useState([]);
    const [komentar, setKomentar] = useState('');
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        getDataMateri();
        getProgress();
        getDataKomentar();
    })

    const getDataMateri = () => {
        const token = localStorage.getItem("loginPelajar");
        const dataSend = {
            token,
            id_kelas: state.id
        };

        fetch(`${process.env.REACT_APP_API}/listMateriPelajar`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(hasil => {
            setDaftarMateri(hasil.data);
        })
    }

    const getDetailMateri = (id) => {
        const token = localStorage.getItem("loginPelajar");
        const dataSend = {
            token,
            id_materi: id
        };

        fetch(`${process.env.REACT_APP_API}/detailMateri`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(hasil => {
            setIdMateri(id);
            setDetailMateri(hasil.data);
            getDataKomentar();
        })
    }

    const getDataKomentar = () => {
        const token = localStorage.getItem("loginPelajar");
        const dataSend = {
            token,
            id_materi: idMateri
        };

        fetch(`${process.env.REACT_APP_API}/listKomentar`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(hasil => {
            setDaftarKomentar(hasil.data);
        })
    }

    const getProgress = () => {
        const token = localStorage.getItem("loginPelajar");
        const dataSend = {
            token
        };

        fetch(`${process.env.REACT_APP_API}/showProgress`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(hasil => {
            setProgress(hasil.data);
        })
    }

    const handleNext = () => {
        const token = localStorage.getItem("loginPelajar");
        const dataSend = {
            token,
            id_kelas: state.id,
            id_materi: idMateri
        }

        fetch(`${process.env.REACT_APP_API}/onProgress`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(hasil => {
            if(hasil.status === "sukses") {
                getProgress()
                document.querySelector(`.item-${idMateri}`).classList.add("materi-completed");

                getDetailMateri(daftarMateri)
            }
        })
    }

    const handlePrev = () => {

    }

    const handleTambahKomentar = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("loginPelajar");
        const dataSend = {
            token,
            komentar,
            id_materi: idMateri,
            nama_peserta: nama
        }

        fetch(`${process.env.REACT_APP_API}/tambahKomentar`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(hasil => {
            getDataKomentar();
        })
    }

    return(
        <>
            <NavbarLogin nama={nama} />
            <div className="container">
                <div className="row mt-5 mb-3">
                    <div>
                        <h3 style={{borderBottom: "3px solid #F4C700", paddingBottom:"10px"}}><b>{state.judul}</b></h3>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-lg-6 col-sm-12">
                        Progress Belajar:
                        <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar" style={{width: `${progress ? progress : '0'}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress ? progress : '0'}%</div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3 mb-5">
                    <div className="col-lg-7 col-sm-12">
                        <div className="row">
                            <div className="col mb-4">
                                {idMateri ? detailMateri.map((data, index) => {
                                    return (
                                        <div key={index}>
                                            <ReactPlayer
                                            pip={true}
                                            config={{
                                            youtube: {
                                                playerVars: {
                                                showinfo: 1,
                                                origin: window.location.origin
                                                },
                                            },
                                            }}
                                            width="100%"
                                            height="300px"
                                            controls={true}
                                            url={`${data.link_video}`}
                                            />

                                            <div className="my-3">
                                                    <button className="btn btn-outline-info mr-3" onClick={() => handlePrev()}>Sebelumnya</button>
                                                    <button className="btn btn-info ml-auto" onClick={() => handleNext()}>Selesai, dan Lanjutkan</button>
                                            </div>

                                            <div className="description-materi my-4">
                                                <h4><b>{data.judul}</b></h4>
                                                <p>{data.keterangan}</p>
                                                <hr />
                                            </div>
                                        </div>
                                    );
                                }) : 
                                    <img src={state.gambar} width="100%" alt={state.judul}/>
                                }
                            </div>
                        </div>
                        
                        <div className="row komentar">
                            <div className="col">
                                <form>
                                    <div className="form-group">
                                        <label for="exampleFormControlTextarea1"><h5><b>Tulis Komentar</b></h5></label>
                                        <textarea onChange={(e) => setKomentar(e.target.value) } value={komentar} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-outline-primary"  onClick={(e) => handleTambahKomentar(e)}>submit</button>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col list-komentar">
                                    {DaftarKomentar?.map((data, index) => {
                                        return (
                                            <>
                                            <div key={index} className="card my-2">
                                                <div className="card-body">
                                                    <h5 className="card-title"><b>{data.nama_peserta}</b></h5>
                                                    <p className="card-text">{data.komentar}</p>
                                                </div>
                                            </div>
                                            </>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-sm-12">
                        <h4><b>Daftar materi</b></h4>
                        <ul className="list-group">
                            {daftarMateri?.map((data, index) => {
                                return (
                                    <li key={index} className={`list-group-item materi-item item-${data.id_materi}`} onClick={() => getDetailMateri(data.id_materi)}>{data.judul}</li>
                                );
                            })}
                            {progress === 100 ? <li className="list-group-item materi-item"><Link to={{ pathname: 'quiz', state: { id: state.id, judul: state.judul}}} className="quiz-item">Quiz</Link></li> : null}
                        </ul>
                    </div>

                </div>
            </div>

            <Footer />
            
        </>
    );
}

export default DetailKelas;