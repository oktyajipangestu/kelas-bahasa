import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import HalamanAdmin from './components/Admin/HalamanAdmin';
import ListAdmin from './components/Admin/ListAdmin';
import ListPengajar from './components/Admin/ListPengajar';
import TambahAdmin from './components/Admin/TambahAdmin';
import TambahPengajar from './components/Admin/TambahPengajar';
import Login from './components/AuthStaff/Login';

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
                    <Route exact path="/listPengajar" render={() => <ListPengajar />} />
                    <Route exact path="/tambahPengajar" render={() => <TambahPengajar />} />
                </Switch>
            </Router>
        </>
    );
}

export default Middleware;