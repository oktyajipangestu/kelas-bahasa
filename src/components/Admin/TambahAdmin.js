import { useState } from "react";
import { useHistory } from 'react-router-dom';

const TambahAdmin = () => {
    const history = useHistory();
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('loginAdmin');

        const dataSend = {
            nama,
            email,
            password,
            token
        }

        if(nama === "" || email === "" || password === ""){
            alert('Data harus diisi semua');
        } else {
            fetch(`${process.env.REACT_APP_API}/tambahAdmin` , {
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
                    history.push("/listAdmin");
                } else {
                    history.push("/loginAdmin");
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
                <h2 className="my-5"><b>Tambah Admin</b></h2>
                <form>
                <div class="form-group">
                        <label for="nama">Nama</label>
                        <input onChange={(e) => setNama(e.target.value)} type="text" class="form-control" id="nama" />
                    </div>
                    <div class="form-group">
                        <label for="email" onChange={(e) => setEmail(e.target.value)}>Email address</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="email"/>
                    </div>
                    <div class="form-group">
                        <label for="password" onChange={(e) => setPassword(e.target.value)}>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" id="password" />
                    </div>
                    <button onClick={(e) => handleSubmit(e)} type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );
}

export default TambahAdmin;