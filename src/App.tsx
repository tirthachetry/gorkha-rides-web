import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Tours from './components/Tours';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <div className="content-wrapper">
        <nav className="sidebar">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#tours">Tours</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <main className="main-content">
          <section id="about"><About /></section>
          <section id="tours"><Tours /></section>
          <section id="contact"><Contact /></section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
