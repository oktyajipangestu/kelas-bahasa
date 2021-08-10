import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import {} from 'react-bootstrap';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';

function App() {
  const [daftarKelas, setDaftarKelas] = useState([]);

  useEffect(() => {
    getKelas();
  });

  const getKelas = () => {
    fetch(`${process.env.REACT_APP_API}/listKelas`, {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        setDaftarKelas(hasil.data);
      });
  }

  return (
    <div className="App">
      <header>
          <Navbar />
          <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <div className="row d-flex flex-column">
              <div className="col-9 align-items-center mt-5">
                <h1 className="display-4"><b>Asyik Berbahasa dengan SapaBahasa</b></h1>
                <p className="lead">Pelajari berbagai bahasa dan tingkatkan kemampuan komunikasi kamu di SapaBahasa</p>
                <a href="#feature-heading" className="btn btn-info">Selengkapnya</a>
                <Link className="btn btn-success my-2 my-sm-0 mx-2" to="/registrasiPelajar">Gabung</Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
          <div className="container">
            <div id="feature-heading" className="row justify-content-center mb-5">
              <div className="features-heading text-center my-5">
                <h2><b>Kenapa Gabung SapaBahasa ?</b></h2>
                <p>Yuk gabung, banyak manfaat dan kemudahan buat kamu dalam belajar bahasa di SapaBahasa</p>
              </div>
              <div className="col-lg-6 col-sm-12">
                <img src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"  alt="percakapan" width="100%"/>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="d-flex flex-column justify-content-left">
                  <div className="features-item mb-3">
                    <h5><b>Belajar Dimana Saja dan Kapan Saja</b></h5>
                    <p>Dengan kelas yang berbentuk pembelajar online, kamu akan lebih mudah untuk belajar dari mana saja dan kapan saja.</p>
                  </div>
                  <div className="features-item mb-3">
                    <h5><b>Daftar Sekali Akses Sepuasnya</b></h5>
                    <p>Dengan kelas yang berbentuk pembelajar online, kamu akan lebih mudah untuk belajar dari mana saja dan kapan saja.</p>
                  </div>
                  <div className="features-item mb-3">
                    <h5><b>Diskusi Materi Sampai Bisa</b></h5>
                    <p>Dengan fitur diskusi dalam setiap materi kamu bisa bertanya atau memberikan komentar pada yang lainnya.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
            
          <div className="kelas-tersedia">
            <div className="heading-kelas-tersedia text-center pt-5">
              <h3><b>Kelas Bahasa Tersedia Untuk kamu</b></h3>
              <p>Tersedia banyak pilihan kelas bahasa yang bisa kamu pelajari di SapaBahasa</p>
            </div>
            <div className="row justify-content-center mt-5">
                {daftarKelas.map((data, index) => {
                        return (
                            <div key={index} className="col-md-6 col-lg-3 col-sm-12 item-class mb-2">
                                <div className="card" style={{width: "18rem"}}>
                                    <img src={data.link_gambar} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title"><b>{data.judul}</b></h5>
                                        <p className="card-text">{data.keterangan}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
          </div>


      </main>
      <Footer />
    </div>
  );
}

export default App;
