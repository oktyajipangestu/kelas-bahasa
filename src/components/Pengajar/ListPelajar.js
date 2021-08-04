import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Table, Modal } from "react-bootstrap";
import NavbarAdmin from "../Admin/NavbarAdmin";

const ListPelajar = () => {
    const history = useHistory();
    const [dataPelajar, setDataPelajar] = useState([]);
    const [show, setShow] = useState('');
    const [idHapus, setIdHapus] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('loginPengajar');
        if(!token) {
            history.push('/loginPengajar')
        } else {
            getDataPelajar();
        }
    }, []);

    const getDataPelajar = () => {
        const token = localStorage.getItem('loginPengajar');
        const dataSend = {
            token
        }
        fetch(`http://127.0.0.1:8000/listPelajar`, {
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

        fetch(`${process.env.REACT_APP_API}/hapusPelajar`, {
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
                getDataPelajar();
            } else {
                history.push("/listPelajar");
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
                <Modal.Title>Hapus Pelajar</Modal.Title>
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
                        {dataPelajar.map((data, index) => {
                        return (
                            <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.nama}</td>
                            <td>{data.email}</td>
                            <td>
                                <button
                                className="btn btn-danger"
                                onClick={() => handleHapus(data.id_pelajar)}
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

export default ListPelajar;