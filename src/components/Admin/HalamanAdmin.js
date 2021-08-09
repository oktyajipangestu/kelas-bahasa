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
                        <Link to="/listAdmin" className="btn btn-primary">Selengkapnya</Link>
                    </div>
                </div>
                <div class="card my-3">
                    <div class="card-body">
                        <h4 class="card-title">Ringkasan Pengajar</h4>
                        <Link to="/listPengajar" className="btn btn-primary">Selengkapnya</Link>
                    </div>
                </div>
                <div class="card my-3">
                    <div class="card-body">
                        <h4 class="card-title">Ringkasan Pelajar</h4>
                        <Link to="/listPelajarAdmin" className="btn btn-primary">Selengkapnya</Link>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default HalamanAdmin;