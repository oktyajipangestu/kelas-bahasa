const NavbarLogin = (props) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                
                <div className="container">
                    <a className="navbar-brand" href="/"><i style={{color:"#F4C700"}} className="fab fa-speakap"></i> <strong>SapaBahasa</strong></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="/">Home <span class="sr-only"></span></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="/ruangKelas">Kelas <span class="sr-only"></span></a>
                        </li>
                        </ul>
                    </div>
                    <div className="ml-auto">
                        <i class="far fa-user"></i> {props.nama}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavbarLogin;