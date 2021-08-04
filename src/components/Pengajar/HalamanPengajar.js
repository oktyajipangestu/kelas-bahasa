import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarAdmin from "../Admin/NavbarAdmin";

const HalamanPengajar = () => {
    return (
        <>
            <NavbarAdmin />
            <Container className="mt-5">
                <div class="card my-3">
                    <div class="card-body">
                        <h4 class="card-title">Ringkasan Pelajar</h4>
                        <p class="card-text">Jumlah Pelajar <b>10</b></p>
                        <Link to="/listPelajar" className="btn btn-primary">Selengkapnya</Link>
                    </div>
                </div>
                <div class="card my-3">
                    <div class="card-body">
                        <h4 class="card-title">Ringkasan Kelas</h4>
                        <p class="card-text">Jumlah Kelas<b>10</b></p>
                        <Link to="/listKelas" className="btn btn-primary">Selengkapnya</Link>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default HalamanPengajar;