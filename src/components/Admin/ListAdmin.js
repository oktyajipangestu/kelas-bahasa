import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";

const ListAdmin = () => {
    const history = useHistory();
    const [dataAdmin, setDataAdmin] = useState([]);
    const [show, setShow] = useState('');
    const [idHapus, setIdHapus] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('loginAdmin');
        if(!token) {
            history.push('/loginAdmin')
        } else {
            getDataAdmin();
        }
    }, []);

    const getDataAdmin = () => {
        const token = localStorage.getItem('loginAdmin');
        const dataSend = {
            token
        }
        fetch(`http://127.0.0.1:8000/listAdmin`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(hasil => {
            if(hasil.status === 'berhasil') {
                setDataAdmin(hasil.data);
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
            id_admin : idHapus
        }

        fetch(`${process.env.REACT_APP_API}/hapusAdmin`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
              "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((hasil) => {
            if (hasil.status === "berhasil") {
                alert("Data Berhasil di Simpan");
                setShow(false);
                getDataAdmin();
            } else {
                history.push("/login-admin");
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
                <Modal.Title>Hapus Admin</Modal.Title>
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
                <Link className="btn btn-info" to="/tambahAdmin">+ Tambah Admin</Link>
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
                        {dataAdmin.map((data, index) => {
                        return (
                            <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.nama}</td>
                            <td>{data.email}</td>
                            <td>
                                <button
                                className="btn btn-danger"
                                onClick={() => handleHapus(data.id_admin)}
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

export default ListAdmin;