import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import NavbarLogin from '../NavbarLogin';

const DetailKelas = (props) => {
    const { state } = useLocation();
    const [daftarMateri, setDaftarMateri] = useState([]);
    const [idMateri, setIdMateri] = useState();
    const [detailMateri, setDetailMateri] = useState([]);
    const [DaftarKomentar, setDaftarKomentar] = useState([]);

    useEffect(() => {
        getDataMateri();
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
            getDataKomentar(id);
        })
    }

    const getDataKomentar = (id) => {
        const token = localStorage.getItem("loginPelajar");
        const dataSend = {
            token,
            id_materi: id
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

    const handleTambahKomentar = () => {
        const token = localStorage.getItem("loginPelajar");
        const dataSend = {
            token,
            id_materi: idMateri
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
            getDataKomentar(idMateri);
        })
    }

    return(
        <>
            <NavbarLogin />
            <div className="container">
                <div className="row my-3">
                    <h1>{state.judul}</h1>
                </div>
                <div className="row my-5">
                    <div className="col-lg-7 col-sm-12">
                        <div className="row">
                            <div className="col">
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

                                            <div className="description-materi my-3">
                                                <h3>{data.judul}</h3>
                                                <hr />
                                                <p>{data.keterangan}</p>
                                            </div>
                                        </div>
                                    );
                                }) : 
                                    <h3>Pilih materi disamping</h3>
                                }
                            </div>
                        </div>
                        <div className="row komentar">
                            <div className="col">
                                <form onSubmit={() => handleTambahKomentar()}>
                                    <div class="form-group">
                                        <label for="exampleFormControlTextarea1"><h2>Tulis Komentar</h2></label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-outline-primary">submit</button>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div class="card my-2">
                                    {DaftarKomentar ? DaftarKomentar.map((data, index) => {
                                        return (
                                            <>
                                                <div class="card-body">
                                                    <h5 class="card-title">{data.nama_peserta}</h5>
                                                    <p class="card-text">{data.komentar}</p>
                                                </div>
                                            </>
                                        );
                                    }) : "Belum ada komentar"}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-sm-12">
                        <ul class="list-group">
                            {daftarMateri.map((data, index) => {
                                return (
                                    <li key={index} class="list-group-item materi-item" onClick={() => getDetailMateri(data.id_materi)}>{data.judul}</li>
                                );
                            })}
                        </ul>
                    </div>

                </div>
            </div>
            
        </>
    );
}

export default DetailKelas;