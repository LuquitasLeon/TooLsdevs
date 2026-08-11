import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Team from "./components/Team";
import Services from "./components/Services";
import Problems from "./components/Problems";
import Process from "./components/Process";
import Projects from "./components/Projects";
import WhyUs from "./components/WhyUs";
import Philosophy from "./components/Philosophy";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-navy-950">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Team />
        <Services />
        <Problems />
        <Process />
        <Projects />
        <WhyUs />
        <Philosophy />
      </main>
      <Footer />
    </div>
  );
}
