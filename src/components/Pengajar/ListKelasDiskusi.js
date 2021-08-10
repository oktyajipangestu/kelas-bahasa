import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Footer from "../Footer";
import NavbarPengajar from "./NavbarPengajar";

const ListKelasDiskusi = () => {
    const history = useHistory();
    const [dataKelas, setDataKelas] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("loginPengajar");
        if(!token) {
            history.push('/loginPelajar')
        } else {
            getDataKelas();
        }
    });

    const getDataKelas = () => {
        const token = localStorage.getItem('loginPengajar');
        const dataSend = {
            token
        }

        fetch(`${process.env.REACT_APP_API}/listKelasPengajar`, {
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
            <NavbarPengajar />
                <div className="container">
                <div className="heading-ruangkelas mt-5 text-center">
                    <h2><b>Ruang Diskusi</b></h2>
                </div>
                <div className="row my-5">
                    {dataKelas.map((data, index) => {
                        return (
                            <div key={index} className="col-md-6 col-lg-4 col-sm-12">
                                <div className="card" style={{width: "18rem"}}>
                                    <div className="card-body">
                                        <h3 className="card-title"><b>{data.judul}</b></h3>
                                        <p className="card-text">{data.keterangan}</p>
                                    </div>
                                    <Link className="card-body btn btn-info" to={{ pathname: '/detailDiskusiPengajar', state: { id: data.id_kelas, judul: data.judul, gambar: data.link_gambar} }} >Masuk Diskusi</Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
                </div>
            <Footer />
        </>
    );
}

export default ListKelasDiskusi;