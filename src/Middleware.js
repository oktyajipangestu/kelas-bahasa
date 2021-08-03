import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import HalamanAdmin from './components/Admin/HalamanAdmin';
import ListAdmin from './components/Admin/ListAdmin';
import TambahAdmin from './components/Admin/TambahAdmin';
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
                </Switch>
            </Router>
        </>
    );
}

export default Middleware;