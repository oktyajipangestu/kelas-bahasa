import './App.css';
import Navbar from './components/Navbar';
import {} from 'react-bootstrap';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
        <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4">Asyik Berbahasa dengan SapaBahasa</h1>
          <p class="lead">Pelajari berbagai bahasa dan tingkatkan kemampuan komunikasi kamu di SapaBahasa</p>
        </div>
      </div>
      </header>
      <Footer />
    </div>
  );
}

export default App;
