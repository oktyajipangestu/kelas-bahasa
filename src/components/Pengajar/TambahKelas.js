import { useState } from "react";
import { useHistory } from 'react-router-dom';

const TambahKelas = () => {
    const history = useHistory();
    const [judul, setJudul] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [linkGambar, setLinkGambar] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('loginPengajar');

        const dataSend = {
            judul,
            keterangan,
            link_gambar: linkGambar,
            token
        }

        if(judul === "" || keterangan === "" || linkGambar === ""){
            alert('Data harus diisi semua');
        } else {
            fetch(`${process.env.REACT_APP_API}/tambahKelas` , {
                method: "POST",
                body: JSON.stringify(dataSend),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((hasil) => {
                console.log(hasil);
                if (hasil.status === "berhasil") {
                    alert("Sukses", "Data Berhasil di Simpan", "success");
                    history.push("/listKelas");
                } else {
                    alert("Kelas Gagal ditambahkan");
                    history.push("/tambahKelas");
                }
            })
            .catch((err) => {
                alert(err);
            });
        }
    }

    return (
        <>
            <div className="container">
                <h2 className="my-5"><b>Tambah Kelas</b></h2>
                <form>
                <div class="form-group">
                        <label for="nama">Kelas</label>
                        <input onChange={(e) => setJudul(e.target.value)} type="text" class="form-control" id="nama" />
                    </div>
                    <div class="form-group">
                        <label for="keterangan">Keterangan</label>
                        <input onChange={(e) => setKeterangan(e.target.value)} type="text" class="form-control" id="keterangan"/>
                    </div>
                    <div class="form-group">
                        <label for="gambar">Link Gambar</label>
                        <input onChange={(e) => setLinkGambar(e.target.value)} type="text" class="form-control" id="gambar" />
                    </div>
                    <button onClick={(e) => handleSubmit(e)} type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );
}

export default TambahKelas;