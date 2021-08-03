const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                
                <div className="container">
                    <a className="navbar-brand" href="#"><i style={{color:"#F4C700"}} className="fab fa-speakap"></i> <strong>SapaBahasa</strong></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                        <button class="btn btn-outline-success my-2 my-sm-0 mx-2" type="submit">Daftar</button>
                        <button class="btn btn-primary my-2 my-sm-0" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;