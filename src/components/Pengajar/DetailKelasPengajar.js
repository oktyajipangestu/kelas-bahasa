import { useState, useEffect } from 'react';
import { useLocation, } from 'react-router-dom';
import Footer from '../Footer';
import {Table, Modal, Button } from 'react-bootstrap';
import swal from "sweetalert";
import NavbarPengajar from './NavbarPengajar';

const DetailKelasPengajar = (props) => {
    const { state } = useLocation();
    const [daftarMateri, setDaftarMateri] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [judul, setJudul] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [linkTumbnail, setLinkTumbnail] = useState('');
    const [linkVideoUpload, setLinkVideoUpload] = useState('');
    const [showDelete, setShowDelete] = useState(false);
    const [idDel, setIdDel] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [idUpdate, setIdUpdate] = useState('');
    const [daftarSoal, setDaftarSoal] = useState([]);
    const [uploadPertanyaan, setuploadPertanyaan] = useState('');
    const [uploadOpsi1, setUploadOpsi1] = useState('');
    const [uploadOpsi2, setUploadOpsi2] = useState('');
    const [uploadOpsi3, setUploadOpsi3] = useState('');
    const [uploadOpsi4, setUploadOpsi4] = useState('');
    const [uploadJawaban, setUploadJawaban] = useState('');
    const [tambahSoalShow, setTambahSoalShow] = useState(false);
    const [showDeleteSoal, setShowDeleteSoal] = useState(false);
    const [idSoalDel, setIdSoalDel] = useState(false);

    useEffect(() => {
        getDataMateri();
        getDaftarSoal();
    })

    const getDataMateri = () => {
        const token = localStorage.getItem("loginPengajar");
        const dataSend = {
            token,
            id_kelas: state.id
        };

        fetch(`${process.env.REACT_APP_API}/listMateriPengajar`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(hasil => {
            setDaftarMateri(hasil.data)
        })
    }

    const handleSimpan = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('loginPengajar');
        const dataSend = {
            id_kelas: state.id,
            judul: judul,
            keterangan: keterangan,
            link_thumbnail: linkTumbnail,
            link_video: linkVideoUpload,
            token: token
        }

        if(judul==='' || keterangan==='' || linkTumbnail==='' || linkVideoUpload==='') {
        swal("Failed", "Form Harus diisi Semua", 'error');
        return;
        }

        fetch(`${process.env.REACT_APP_API}/tambahMateri`, {
        method: 'POST',
        body: JSON.stringify(dataSend),
        headers: {
            'Content-Type' : 'application/json'
        }
        })
        .then(res => res.json())
        .then(hasil => {
            if(hasil.status === "berhasil") {
                clearState();
                swal('Success', "Data Bersail ditambahkan", 'success');
                getDataMateri();
            } else {
                swal('Failed', "Data Gagal Ditambahkan", 'error');
            }
        })
    }

    const clearState = () => {
        setJudul('');
        setKeterangan('');
        setLinkTumbnail('');
        setLinkVideoUpload('');
      }

    const handleShowEdit = (data) => {
        setShowEdit(true);
        setIdUpdate(data.id_materi);
        setJudul(data.judul);
        setKeterangan(data.keterangan);
        setLinkTumbnail(data.link_thumbnail);
        setLinkVideoUpload(data.link_video); 
    }

    const handleUpdateSimpan = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('loginPengajar');
        const dataSend = {
          id_materi: idUpdate,
          id_kelas: state.id,
          judul: judul,
          keterangan: keterangan,
          link_thumbnail: linkTumbnail,
          link_video: linkVideoUpload,
          token: token
        }
        fetch(`http://127.0.0.1:8000/editMateri`, {
          method: 'POST',
          body: JSON.stringify(dataSend),
          headers: {
            'Content-Type' : 'application/json'
          }
        })
        .then(res => res.json())
        .then(hasil => {
          if(hasil.status === 'berhasil') {
            getDataMateri();
            clearState();
            setShowEdit(false);
            swal('success', hasil.message, 'success');
          } else {
            clearState();
            swal('failed', hasil.message, 'error');
          }
        })
        .catch((err) => {
          clearState();
          alert(err);
        });
      }

      const handleShowDelete = (id) => {
        setShowDelete(true);
        setIdDel(id);
      }

      const handleDelete = () => {
        const token = localStorage.getItem('loginPengajar');
        const dataSend = {
          id_materi: idDel,
          token: token
        }
    
        fetch(`${process.env.REACT_APP_API}/hapusMateri`, {
          method: 'POST',
          body: JSON.stringify(dataSend),
          headers: {
            'Content-Type' : 'application/json'
          }
        })
        .then(res => res.json())
        .then(hasil => {
          getDataMateri();
          setShowDelete(false);
          swal('Success', 'Data Berhasil dihapus', 'success');
        })
      }

      const handleClose = () => {
        setShowDelete(false);
      }

      const getDaftarSoal = () => {
        const token = localStorage.getItem("loginPengajar");
        const dataSend = {
            token,
            id_kelas: state.id
        };

        fetch(`${process.env.REACT_APP_API}/listSoalPengajar`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(hasil => {
            setDaftarSoal(hasil.data)
        })
      }

      const handleSimpanSoal = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('loginPengajar');
        const dataSend = {
            token,
            id_kelas: state.id,
            pertanyaan: uploadPertanyaan,
            opsi1: uploadOpsi1,
            opsi2: uploadOpsi2,
            opsi3: uploadOpsi3,
            opsi4: uploadOpsi4,
            jawaban: uploadJawaban
        }

        if(uploadPertanyaan==='' || uploadOpsi1==='' || uploadOpsi2==='' || uploadOpsi3==='' || uploadOpsi4===''  || uploadJawaban==='') {
            swal("Failed", "Form Harus diisi Semua", 'error');
            return;
        }

        fetch(`${process.env.REACT_APP_API}/tambahSoal`, {
        method: 'POST',
        body: JSON.stringify(dataSend),
        headers: {
            'Content-Type' : 'application/json'
        }
        })
        .then(res => res.json())
        .then(hasil => {
            if(hasil.status === "berhasil") {
                clearState();
                swal('Success', "Data Bersail ditambahkan", 'success');
                getDaftarSoal();
            } else {
                swal('Failed', "Data Gagal Ditambahkan", 'error');
            }
        })
    }

    const handleDeleteSoal = () => {
        const token = localStorage.getItem('loginPengajar');
        const dataSend = {
          token,
          id_soal: idSoalDel,
        }
    
        fetch(`${process.env.REACT_APP_API}/hapusSoal`, {
          method: 'POST',
          body: JSON.stringify(dataSend),
          headers: {
            'Content-Type' : 'application/json'
          }
        })
        .then(res => res.json())
        .then(hasil => {
          getDaftarSoal();
          setShowDeleteSoal(false);
          swal('Success', 'Data Berhasil dihapus', 'success');
        })
      }

      const handleShowDeleteSoal = (id) => {
        setShowDeleteSoal(true);
        setIdSoalDel(id);
      }

      const handleCloseSoal = () => {
        setShowDeleteSoal(false);
      }

    return(
        <>
            {/* Modal Tambah Materi */}
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Tambah Materi
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                    <div className="form-group">
                    <label htmlFor="judul">
                        Judul
                    </label>
                    <input onChange={(e) => setJudul(e.target.value)} value={judul} type="text" className="form-control" id="judul" placeholder="judul">
                    </input>
                    </div>

                    <div className="form-group">
                    <label htmlFor="keterangan">
                        Keterangan
                    </label>
                    <input onChange={(e) => setKeterangan(e.target.value)} value={keterangan} type="text" className="form-control" id="keterangan" placeholder="keterangan">
                    </input>
                    </div>

                    <div className="form-group">
                    <label htmlFor="link_tumbnail">
                        Link Thumbnail
                    </label>
                    <input onChange={(e) => setLinkTumbnail(e.target.value)} value={linkTumbnail} type="text" className="form-control" id="link_tumbnail" placeholder="Link Tumbnail">
                    </input>
                    </div>

                    <div className="form-group">
                    <label htmlFor="link_video">
                        Link Video
                    </label>
                    <input onChange={(e) => setLinkVideoUpload(e.target.value)} value={linkVideoUpload} type="text" className="form-control" id="link_video" placeholder="Link Video">
                    </input>
                    </div>

                    <button onClick={(e) => handleSimpan(e)} className="btn btn-primary">Simpan</button>
                </form>
                </Modal.Body>
            </Modal>

            {/* Modal Edit Materi */}
            <Modal
                size="lg"
                show={showEdit}
                onHide={() => setShowEdit(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Edit Materi
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                    <div className="form-group">
                    <label htmlFor="judul">
                        Judul
                    </label>
                    <input onChange={(e) => setJudul(e.target.value)} value={judul} type="text" className="form-control" id="judul" placeholder="judul">
                    </input>
                    </div>

                    <div className="form-group">
                    <label htmlFor="keterangan">
                        Keterangan
                    </label>
                    <input onChange={(e) => setKeterangan(e.target.value)} value={keterangan} type="text" className="form-control" id="keterangan" placeholder="keterangan">
                    </input>
                    </div>

                    <div className="form-group">
                    <label htmlFor="link_tumbnail">
                        Link Thumbnail
                    </label>
                    <input onChange={(e) => setLinkTumbnail(e.target.value)} value={linkTumbnail} type="text" className="form-control" id="link_tumbnail" placeholder="Link Tumbnail">
                    </input>
                    </div>

                    <div className="form-group">
                    <label htmlFor="link_video">
                        Link Video
                    </label>
                    <input onChange={(e) => setLinkVideoUpload(e.target.value)} value={linkVideoUpload} type="text" className="form-control" id="link_video" placeholder="Link Video">
                    </input>
                    </div>

                    <button onClick={(e) => handleUpdateSimpan(e)} className="btn btn-primary">Simpan</button>
                </form>
                </Modal.Body>
            </Modal>

            {/* Modal Hapus Data */}
            <Modal show={showDelete} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Hapus Materi</Modal.Title>
                </Modal.Header>
                <Modal.Body>Anda yakin ingin menghapus materi ini?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Hapus
                </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Tambah Soal */}
            <Modal
                size="lg"
                show={tambahSoalShow}
                onHide={() => setTambahSoalShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Tambah Soal
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="judul">
                            Pertanyaan
                        </label>
                        <input onChange={(e) => setuploadPertanyaan(e.target.value)} value={uploadPertanyaan} type="text" className="form-control" id="judul" placeholder="judul">
                        </input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="keterangan">
                            Opsi 1
                        </label>
                        <input onChange={(e) => setUploadOpsi1(e.target.value)} value={uploadOpsi1} type="text" className="form-control" id="keterangan" placeholder="keterangan">
                        </input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="link_tumbnail">
                            Opsi 2
                        </label>
                        <input onChange={(e) => setUploadOpsi2(e.target.value)} value={uploadOpsi2} type="text" className="form-control" id="link_tumbnail" placeholder="Link Tumbnail">
                        </input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="link_video">
                            Opsi 3
                        </label>
                        <input onChange={(e) => setUploadOpsi3(e.target.value)} value={uploadOpsi3} type="text" className="form-control" id="link_video" placeholder="Link Video">
                        </input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="link_video">
                            Opsi 4
                        </label>
                        <input onChange={(e) => setUploadOpsi4(e.target.value)} value={uploadOpsi4} type="text" className="form-control" id="link_video" placeholder="Link Video">
                        </input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="link_video">
                            Jawaban
                        </label>
                        <input onChange={(e) => setUploadJawaban(e.target.value)} value={uploadJawaban} type="text" className="form-control" id="link_video" placeholder="Link Video">
                        </input>
                    </div>

                    <button onClick={(e) => handleSimpanSoal(e)} className="btn btn-primary">Simpan</button>
                </form>
                </Modal.Body>
            </Modal>

            {/* Modal Hapus Soal */}
            <Modal show={showDeleteSoal} onHide={handleCloseSoal}>
                <Modal.Header closeButton>
                <Modal.Title>Hapus Soal</Modal.Title>
                </Modal.Header>
                <Modal.Body>Anda yakin ingin menghapus soal ini?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseSoal}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDeleteSoal}>
                    Hapus
                </Button>
                </Modal.Footer>
            </Modal>

            <NavbarPengajar />
            <div className="container">
                <div className="row mt-5 mb-3">
                    <div>
                        <h3 style={{borderBottom: "3px solid #F4C700", paddingBottom:"10px"}}><b>{state.judul}</b></h3>
                    </div>
                </div>
                <div className="daftar-kelas-heading">
                    <h4><b>Daftar Kelas</b></h4>
                </div>
                <div className="row mb-5">
                    <div className="daftar-kelas-heading">
                        <button className="btn btn-info" onClick={() => setLgShow(true)}>+ Tambah Materi</button>
                    </div>
                    <Table striped bordered hover className="mt-3 mb-5">
                        <thead className="thead-dark">
                            <tr>
                            <th>No</th>
                            <th>Judul</th>
                            <th>Keterangan</th>
                            <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {daftarMateri?.map((data, index) => {
                            return (
                                <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.judul}</td>
                                <td>{data.keterangan}</td>
                                <td>
                                    <button className="btn btn-info mr-2 mb-2" onClick={() => handleShowEdit(data)}>Edit</button>
                                    <button
                                    className="btn btn-danger"
                                    onClick={() => handleShowDelete(data.id_materi)}
                                    >
                                    Hapus
                                    </button>
                                </td>
                                </tr>
                            );
                            })}
                        </tbody>
                    </Table>
                </div>

                <h4><b>Daftar Soal</b></h4>
                <div className="row mt-3 mb-5">
                    <div className="daftar-kelas-heading">
                        <button className="btn btn-info" onClick={() => setTambahSoalShow(true)}>+ Tambah Soal</button>
                    </div>
                    <Table striped bordered hover className="mt-3 mb-5">
                        <thead className="thead-dark">
                            <tr>
                            <th>No</th>
                            <th>Pertanyaan</th>
                            <th>Opsi 1</th>
                            <th>Opsi 2</th>
                            <th>Opsi 3</th>
                            <th>Opsi 4</th>
                            <th>Jawaban</th>
                            <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {daftarSoal?.map((data, index) => {
                            return (
                                <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.pertanyaan}</td>
                                <td>{data.opsi1}</td>
                                <td>{data.opsi2}</td>
                                <td>{data.opsi3}</td>
                                <td>{data.jawaban}</td>
                                <td>{data.opsi4}</td>
                                <td>
                                    <button
                                    className="btn btn-danger"
                                    onClick={() => handleShowDeleteSoal(data.id_materi)}
                                    >
                                    Hapus
                                    </button>
                                </td>
                                </tr>
                            );
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>

            <Footer />
            
        </>
    );
}

export default DetailKelasPengajar;