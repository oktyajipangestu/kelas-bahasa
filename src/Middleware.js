import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import HalamanAdmin from './components/Admin/HalamanAdmin';
import ListAdmin from './components/Admin/ListAdmin';
import ListPengajar from './components/Admin/ListPengajar';
import TambahAdmin from './components/Admin/TambahAdmin';
import TambahPengajar from './components/Admin/TambahPengajar';
import Login from './components/AuthStaff/Login';
import HalamanPengajar from './components/Pengajar/HalamanPengajar';
import LoginPengajar from './components/Pengajar/LoginPengajar';
import ListPelajar from './components/Pengajar/ListPelajar';
import ListKelas from './components/Pengajar/ListKelas';
import TambahKelas from './components/Pengajar/TambahKelas';
import Registrasi from './components/Pelajar/Registrasi';
import LoginPelajar from './components/Pelajar/LoginPelajar';
import RuangKelas from './components/Pelajar/RuangKelas';
import DetailKelas from './components/Pelajar/DetailKelas';
import Quiz from './components/Ujian/Quiz';
import Skor from './components/Ujian/Skor';
import DetailKelasPengajar from './components/Pengajar/DetailKelasPengajar';
import ListPelajarAdmin from './components/Admin/ListPelajarAdmin';
import Dashboard from './components/Pelajar/Dashboard';
import RuangDiskusi from './components/Pelajar/RuangDiskusi';
import DetailDiskusi from './components/Pelajar/DetailDiskusi';
import ListKelasDiskusi from './components/Pengajar/ListKelasDiskusi';
import DetailDiskusiPengajar from './components/Pengajar/DetailDiskusiPengajar';

const Middleware = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <App /> }/>
                    <Route exact path="/loginAdmin" render={() => <Login />} />
                    <Route exact path="/halamanAdmin" render={() => <HalamanAdmin />} />
                    <Route exact path="/listAdmin" render={() => <ListAdmin />} />
                    <Route exact path="/tambahAdmin" render={() => <TambahAdmin />} />
                    <Route exact path="/listPelajarAdmin" render={() => <ListPelajarAdmin />} />

                    <Route exact path="/loginPengajar" render={() => <LoginPengajar />} />
                    <Route exact path="/listPengajar" render={() => <ListPengajar />} />
                    <Route exact path="/tambahPengajar" render={() => <TambahPengajar />} />
                    <Route exact path="/halamanPengajar" render={() => <HalamanPengajar />} />
                    <Route exact path="/detailKelasPengajar" render={() => <DetailKelasPengajar />} />
                    <Route exact path="/listKelasDiskusi" render={() => <ListKelasDiskusi />} />
                    <Route exact path="/detailDiskusiPengajar" render={() => <DetailDiskusiPengajar />} />

                    <Route exact path="/listPelajar" render={() => <ListPelajar />} />
                    <Route exact path="/listKelas" render={() => <ListKelas />} />
                    <Route exact path="/tambahKelas" render={() => <TambahKelas />} />

                    <Route exact path="/registrasiPelajar" render={() => <Registrasi />} />
                    <Route exact path="/loginPelajar" render={() => <LoginPelajar />} />
                    <Route exact path="/ruangKelas" render={() => <RuangKelas />} />

                    <Route exact path="/detailKelas" render={() => <DetailKelas />} />
                    <Route exact path="/quiz" render={() => <Quiz />} />
                    <Route exact path="/skor" render={() => <Skor />} />
                    <Route exact path="/dashboard" render={() => <Dashboard />} />

                    <Route exact path="/ruangDiskusi" render={() => <RuangDiskusi />} />
                    <Route exact path="/detailDiskusi" render={() => <DetailDiskusi />} />
                    
                </Switch>
            </Router>
        </>
    );
}

export default Middleware;