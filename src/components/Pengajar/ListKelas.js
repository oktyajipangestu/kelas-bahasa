import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarPengajar from "./NavbarPengajar";

const ListKelas = () => {
    const history = useHistory();
    const [dataKelas, setDataKelas] = useState([]);
    const [show, setShow] = useState('');
    const [idHapus, setIdHapus] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('loginPengajar');
        if(!token) {
            history.push('/loginPengajar')
        } else {
            getDataKelas();
        }
    }, []);

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

    const handleHapus = (id) => {
        setShow(true);
        setIdHapus(id);
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleTriggerHapus = () => {
        const token = localStorage.getItem('loginPengajar');
        const dataSend = {
            token,
            id_kelas : idHapus
        }

        fetch(`${process.env.REACT_APP_API}/hapusKelas`, {
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
                getDataKelas();
            } else {
                history.push("/listKelas");
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

            <NavbarPengajar />
            <div className="container my-5">
                <Link className="btn btn-outline-info mr-2" to="/halamanPengajar">Kembali</Link>
                <Link className="btn btn-info" to="/tambahKelas">+ Tambah Kelas</Link>
                <Table striped bordered hover className="my-5">
                    <thead className="thead-dark">
                        <tr>
                        <th>#</th>
                        <th>Kelas</th>
                        <th>Deskripsi</th>
                        <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataKelas.map((data, index) => {
                        return (
                            <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.judul}</td>
                            <td>{data.keterangan}</td>
                            <td>
                                <Link
                                className="btn btn-primary mr-2"
                                to={{
                                    pathname: "/detailKelasPengajar",
                                    state: { id: data.id_kelas, judul: data.judul },
                                  }}
                                >
                                detail
                                </Link>
                                <button
                                className="btn btn-danger"
                                onClick={() => handleHapus(data.id_kelas)}
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

export default ListKelas;