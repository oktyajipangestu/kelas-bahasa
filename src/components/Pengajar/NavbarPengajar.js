import { useHistory } from 'react-router-dom';

const NavbarPengajar = () => {
    const history = useHistory();

    const logOut = () => {
        localStorage.removeItem('dataLoginAdmin');
        history.push('/loginPengajar');
      }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                
                <div className="container">
                    <a className="navbar-brand" href="/"><i style={{color:"#F4C700"}} className="fab fa-speakap"></i> <strong>Pengajar</strong></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <form class="form-inline my-2 my-lg-0 ml-auto">
                            <button class="btn btn-danger my-2 my-sm-0" type="submit" onClick={() => logOut()}>Logout</button>
                        </form>
                    </div>
                </div>
            </nav>
        </> 
    );
}

export default NavbarPengajar;