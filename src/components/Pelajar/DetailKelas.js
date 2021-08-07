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
        getProgress()
    })

    const getDataMateri = () => {
        const token = localStorage.getItem("loginPelajar");
        const dataSend = {
            token,
            id_kelas: state.id
        };

        fetch(`http://127.0.0.1:8000/listMateriPelajar`, {
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

        fetch(`http://127.0.0.1:8000/detailMateri`, {
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

        fetch(`http://127.0.0.1:8000/listKomentar`, {
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

        fetch(`http://127.0.0.1:8000/showProgress`, {
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

    const handleTambahKomentar = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("loginPelajar");
        const dataSend = {
            token,
            komentar,
            id_materi: idMateri,
            nama_peserta: nama
        }

        fetch(`http://127.0.0.1:8000/tambahKomentar`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(hasil => {
        })
    }

    return(
        <>
            <NavbarLogin nama={nama}/>
            <div className="container">
                <div className="row mt-5">
                    <div>
                        <h3><b>{state.judul}</b></h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style={{width: `${progress ? progress : '0'}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress ? progress : '0'}%</div>
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
                                                    <button className="btn btn-outline-info mr-3">Sebelumnya</button>
                                                    <button className="btn btn-info ml-auto">Selesai, dan Lanjutkan</button>
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
                                <form onSubmit={(e) => handleTambahKomentar(e)}>
                                    <div class="form-group">
                                        <label for="exampleFormControlTextarea1"><h5><b>Tulis Komentar</b></h5></label>
                                        <textarea onChange={(e) => setKomentar(e.target.value) } class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-outline-primary">submit</button>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col list-komentar">
                                    {DaftarKomentar?.map((data, index) => {
                                        return (
                                            <>
                                            <div key={index} class="card my-2">
                                                <div class="card-body">
                                                    <h5 class="card-title"><b>{data.nama_peserta}</b></h5>
                                                    <p class="card-text">{data.komentar}</p>
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
                        <ul class="list-group">
                            {daftarMateri?.map((data, index) => {
                                return (
                                    <li key={index} class="list-group-item materi-item" onClick={() => getDetailMateri(data.id_materi)}>{data.judul}</li>
                                );
                            })}
                            <li class="list-group-item materi-item"><Link to={{ pathname: 'quiz', state: { id: state.id, judul: state.judul} }}>Quiz</Link></li>
                        </ul>
                    </div>

                </div>
            </div>

            <Footer />
            
        </>
    );
}

export default DetailKelas;