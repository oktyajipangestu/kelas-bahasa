import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";

const ListPengajar = () => {
    const history = useHistory();
    const [dataPengajar, setDataPengajar] = useState([]);
    const [show, setShow] = useState('');
    const [idHapus, setIdHapus] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('loginAdmin');
        if(!token) {
            history.push('/loginAdmin')
        } else {
            getDataPengajar();
        }
    }, []);

    const getDataPengajar = () => {
        const token = localStorage.getItem('loginAdmin');
        const dataSend = {
            token
        }
        fetch(`${process.env.REACT_APP_API}/listPengajar`, {
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
                setDataPengajar(hasil.data);
            }
        })
    }

    const handleHapus = (id) => {
        setShow(true);
        setIdHapus(id);
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleTriggerHapus = () => {
        const token = localStorage.getItem('loginAdmin');
        const dataSend = {
            token,
            id_pengajar : idHapus
        }

        fetch(`${process.env.REACT_APP_API}/hapusPengajar`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
              "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((hasil) => {
            if (hasil.status === "berhasil") {
                alert("Data Berhasil di Hapus");
                setShow(false);
                getDataPengajar();
            } else {
                history.push("/listPengajar");
            }
      })
      .catch((err) => {
        alert(err);
      });

    }
    
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Hapus Pengajar</Modal.Title>
                </Modal.Header>
                <Modal.Body>Anda Yakin Untuk Menghapus Data</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => handleTriggerHapus()}>
                    Hapus
                </Button>
                </Modal.Footer>
            </Modal>

            <NavbarAdmin />
            <div className="container my-5">
                <Link className="btn btn-info" to="/tambahPengajar">+ Tambah Pengajar</Link>
                <Table striped bordered hover className="my-5">
                    <thead className="thead-dark">
                        <tr>
                        <th>#</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataPengajar.map((data, index) => {
                        return (
                            <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.nama}</td>
                            <td>{data.email}</td>
                            <td>
                                <button
                                className="btn btn-danger"
                                onClick={() => handleHapus(data.id_pengajar)}
                                >
                                hapus
                                </button>
                            </td>
                            </tr>
                        );
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default ListPengajar;