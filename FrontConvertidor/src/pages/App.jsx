import { Navbar } from '../components/navbar/Navbar.jsx'
import { Convertidor } from '../components/convertidor/Convertidor.jsx'
import { Footer } from '../assets/footer/Footer.jsx'

export const App = () => {
    return (
        <main>
            <Navbar />
            <Convertidor />
            <Footer />
        </main>
    )
}