import { useState, useEffect } from "react";
import Footer from "../Footer"
import NavbarLogin from "../NavbarLogin";
import { Link, useHistory } from "react-router-dom";

const RuangDiskusi = () => {
    const history = useHistory();
    const [cari, setCari] = useState('');
    const [dataKelas, setDataKelas] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("loginPelajar");
        if(!token) {
            history.push('/loginPelajar')
        } else {
            getDataKelas();
        }
    });

    const getDataKelas = () => {
        const token = localStorage.getItem('loginPelajar');
        const dataSend = {
            token
        }

        fetch(`${process.env.REACT_APP_API}/listKelasPelajar`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(hasil => {
            if(hasil.status === 'berhasil') {
                setDataKelas(hasil.data);
            }
        })
    }

    return (
        <>
            <NavbarLogin />
                <div className="container">
                <div className="heading-ruangkelas mt-5 text-center">
                    <h2><b>Ruang Diskusi</b></h2>
                    <p>belajar bersama diruang diskusi. berikut ruang diskusi tersedia</p>
                </div>
                <input className="form-control my-5" type="text" placeholder="Cari Kelas" onChange={(e) => setCari(e.target.value)}/>
                <div className="row my-5">
                    {dataKelas.filter((data) => data.judul.toLowerCase().includes(cari.toLowerCase())).map((data, index) => {
                        return (
                            <div key={index} className="col-md-6 col-lg-4 col-sm-12">
                                <div className="card" style={{width: "18rem"}}>
                                    <div className="card-body">
                                        <h3 className="card-title"><b>{data.judul}</b></h3>
                                        <p className="card-text">{data.keterangan}</p>
                                    </div>
                                    <Link className="card-body btn btn-info" to={{ pathname: '/detailDiskusi', state: { id: data.id_kelas, judul: data.judul, gambar: data.link_gambar} }} >Masuk Diskusi</Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
                </div>
            <Footer />
        </>
    )
}

export default RuangDiskusi;