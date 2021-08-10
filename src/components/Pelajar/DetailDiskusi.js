import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Footer"
import NavbarLogin from "../NavbarLogin";

const DetailDiskusi = () => {
    const { state } = useLocation();
    const [uploadDiskusi, setUploadDiskusi] = useState([]);
    const [daftarDiskusi, setDaftarDiskusi] = useState([]);

    useEffect(() => {
        getDaftarDiskusi();
    });

    const getDaftarDiskusi = () => {
        const token = localStorage.getItem("loginPelajar");
        const dataSend = {
            token,
            id_kelas : state.id
        }

        fetch(`${process.env.REACT_APP_API}/listDiskusi`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(hasil => {
            setDaftarDiskusi(hasil.data);
        })
    }

    const handleTambahDiskusi = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("loginPelajar");
        const dataSend = {
            token,
            id_kelas : state.id,
            diskusi: uploadDiskusi
        }

        fetch(`${process.env.REACT_APP_API}/tambahDiskusi`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(hasil => {
            getDaftarDiskusi();
            clearForm();
        })
    }

    const clearForm = () => {
        setUploadDiskusi("");
    }

    return (
        <>
            <NavbarLogin />
            <div className="container my-5">
                <div className="row">
                        <div className="col">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1"><h5><b>Tulis topik diskusi <span className="text-info">{state.judul}</span></b></h5></label>
                                    <textarea onChange={(e) => setUploadDiskusi(e.target.value) } value={uploadDiskusi} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                <button type="submit" className="btn btn-outline-primary"  onClick={(e) => handleTambahDiskusi(e)}>submit</button>
                            </form>
                        </div>
                </div>
                <div className="row">
                            <div className="col list-komentar">
                                    {daftarDiskusi?.map((data, index) => {
                                        return (
                                            <>
                                            <div key={index} className="card my-2">
                                                <div className="card-body">
                                                    <h5 className="card-title"><b>{data.nama}</b></h5>
                                                    <p className="card-text">{data.diskusi}</p>
                                                </div>
                                            </div>
                                            </>
                                        );
                                    })}
                            </div>
                        </div>
            </div>
            <Footer />
        </>
    );
}

export default DetailDiskusi;