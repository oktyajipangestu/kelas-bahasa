import {useState, useEffect} from "react";
import { useHistory, Link } from "react-router-dom";
import NavbarLogin from "../NavbarLogin";

const RuangKelas = (props) => {
    const nama = localStorage.getItem("pelajar");
    const history = useHistory();
    const [dataKelas, setDataKelas] = useState([]);
    const [cari, setCari] = useState('');

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

        fetch(`http://127.0.0.1:8000/listKelasPelajar`, {
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
            <NavbarLogin nama={nama} />
            <div className="container">
                <input class="form-control my-5" type="text" placeholder="Cari Kelas" onChange={(e) => setCari(e.target.value)}/>
                <div className="row my-5">
                    {dataKelas.filter((data) => data.judul.toLowerCase().includes(cari.toLowerCase())).map((data, index) => {
                        return (
                            <div key={index} className="col-md-6 col-lg-4 col-sm-12">
                                <div class="card" style={{width: "18rem;"}}>
                                    <img src={data.link_gambar} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{data.judul}</h5>
                                        <p class="card-text">{data.keterangan}</p>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Materi : {data.materi}</li>
                                        <li class="list-group-item">Pelajar : {data.pelajar}</li>
                                    </ul>
                                        <Link className="card-body btn btn-info" to={{ pathname: 'detailKelas', state: { id: data.id_kelas, judul: data.judul} }} >Selengkapnya</Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default RuangKelas;