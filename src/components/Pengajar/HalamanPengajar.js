import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavbarPengajar from "./NavbarPengajar";

const HalamanPengajar = () => {
    const history = useHistory();
    const [dataPelajar, setDataPelajar] = useState([]);
    const [DataKelas, setDataKelas] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('loginPengajar');
        if(!token) {
            history.push('/loginPengajar')
        } else {
            getDataPelajar();
            getDataKelas();
        }
    }, []);

    const getDataPelajar = () => {
        const token = localStorage.getItem('loginPengajar');
        const dataSend = {
            token
        }
        fetch(`${process.env.REACT_APP_API}/listPelajar`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(hasil => {
            console.log(hasil)
            if(hasil.status === 'berhasil') {
                setDataPelajar(hasil.data);
            }
        })
    }

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
            console.log(hasil)
            if(hasil.status === 'berhasil') {
                setDataKelas(hasil.data);
            }
        })
    }

    return (
        <>
            <NavbarPengajar />
            <Container className="mt-5">
                <div class="card my-3">
                    <div class="card-body">
                        <h4 class="card-title">Ringkasan Pelajar</h4>
                        <p class="card-text">Jumlah Pelajar: <b> {dataPelajar.length}</b> Pelajar</p>
                        <Link to="/listPelajar" className="btn btn-primary">Selengkapnya</Link>
                    </div>
                </div>
                <div class="card my-3">
                    <div class="card-body">
                        <h4 class="card-title">Ringkasan Kelas</h4>
                        <p class="card-text">Jumlah Kelas: <b> {DataKelas.length}</b> Kelas</p>
                        <Link to="/listKelas" className="btn btn-primary">Selengkapnya</Link>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default HalamanPengajar;