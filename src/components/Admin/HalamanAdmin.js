import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";

const HalamanAdmin = () => {
    return (
        <>
            <NavbarAdmin />
            <Container className="mt-5">
                <div class="card my-3">
                    <div class="card-body">
                        <h4 class="card-title">Ringkasan Admin</h4>
                        <p class="card-text">Jumlah Admin <b>10</b></p>
                        <Link to="/listAdmin" className="btn btn-primary">Selengkapnya</Link>
                    </div>
                </div>
                <div class="card my-3">
                    <div class="card-body">
                        <h4 class="card-title">Ringkasan Pengajar</h4>
                        <p class="card-text">Jumlah Pengajar <b>10</b></p>
                        <Link to="/listAdmin" className="btn btn-primary">Selengkapnya</Link>
                    </div>
                </div>
                <div class="card my-3">
                    <div class="card-body">
                        <h4 class="card-title">Ringkasan Pelajar</h4>
                        <p class="card-text">Jumlah Pelajar <b>10</b></p>
                        <Link to="/listAdmin" className="btn btn-primary">Selengkapnya</Link>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default HalamanAdmin;