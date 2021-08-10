import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Footer from "../Footer";
import NavbarLogin from "../NavbarLogin";

const Dashboard = () => {
    const history = useHistory();
    const [daftarProgress, setDaftarProgress] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("loginPelajar");
        if(!token) {
            history.push('/loginPelajar')
        } else {
            getDaftarProgress();
        }
    });

    const getDaftarProgress = () => {
        const token = localStorage.getItem('loginPelajar');

        const dataSend = {
            token
        }

        fetch(`${process.env.REACT_APP_API}/ringkasanPelajar`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(result => {
            setDaftarProgress(result.data);
        })
    }

    return (
        <>
            <NavbarLogin />
            <div className="container">
                <div className="row mb-5">
                    <div className="progress-heading my-5">
                        <h2><b>Progress Belajar Kamu</b></h2>
                        <p>Lihat progrss kamu tekan lanjutkan untuk melanjutkan pembelajaran kamu</p>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">No</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Kelas</th>
                            <th scope="col">Progress</th>
                            <th scope="col">Status</th>
                            <th scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            { daftarProgress.length > 0 ? 
                                daftarProgress?.map((data, index) => {
                                    return (
                                        <tr key="index">
                                            <th scope="row">{index + 1}</th>
                                            <td>{data.nama}</td>
                                            <td>{data.kelas}</td>
                                            <td>{data.progress}</td>
                                            <td>
                                                {data.progress === 100 ? 
                                                    <p className="text-success"><b>Selesai</b></p> 
                                                : <p className="text-warning"><b>Sedang Berlangsung</b></p>}</td>
                                            <td>
                                                {data.progress === 100 ? 
                                                    <Link className="btn btn-success" to={{ pathname: 'detailKelas', state: { id: data.id_kelas, judul: data.kelas, gambar: data.link_gambar} }} >Lihat</Link>
                                                    
                                                :   <Link className="btn btn-primary" to={{ pathname: 'detailKelas', state: { id: data.id_kelas, judul: data.kelas, gambar: data.link_gambar} }} >Lanjutkan</Link>
                                            }
                                            </td>
                                        </tr>
                                    );
                                })
                            : 
                            <tr>
                                <td colSpan="6"></td>
                            </tr>
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
}


export default Dashboard;