const Footer = () => {
    return (
        <>
            <footer>
                <div className="container">
                    <div className="row pt-5">
                        <div className="col-6 justify-conten-left">
                            <h5><b>SapaBahasa</b></h5>
                            <p>tempat asyik belajar bahasa</p>
                        </div>

                        <div className="col-6 text-right">
                            <h5><b>Kontak</b></h5>
                            <p>oktyajipangestu@gmail.com</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <hr style={{ borderColor: "#fff"}}/>
                            <p>Copyright &copy; 2021 | Okty Aji Pangestu</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;