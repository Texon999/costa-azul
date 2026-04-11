import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Sedes from '../components/Sedes'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className="bg-[#0A0F1E] min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Sedes />
      <Footer />
    </div>
  );
}
