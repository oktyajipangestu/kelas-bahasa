import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const NavbarLogin = (props) => {
    const history = useHistory();

    const logOut = () => {
        localStorage.removeItem('loginPelajar');
        history.push('/');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                
                <div className="container">
                    <a className="navbar-brand" href="/"><i style={{color:"#F4C700"}} className="fab fa-speakap"></i> <strong>SapaBahasa</strong></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only"></span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/ruangKelas">Kelas<span className="sr-only"></span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/ruangDiskusi">Diskusi<span className="sr-only"></span></a>
                        </li>
                        </ul>
                    </div>
                    <div className="ml-auto">
                        <i className="far fa-user"></i> {props.nama}
                        <Link className="btn btn-primary my-2 my-sm-0 ml-3" to="/dashboard">Dashboard</Link>
                        <button className="btn btn-danger my-2 my-sm-0 ml-3" type="submit" onClick={() => logOut()}>Logout</button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavbarLogin;