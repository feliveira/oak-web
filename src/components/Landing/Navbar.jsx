import { Link } from "react-router-dom"
import tooth from "../../assets/tooth-icon.svg"

export default function Navbar( )
{
    return (
        <nav className="flex flex-col md:flex-row items-center md:justify-between py-6 px-8 border-b-2 bg-[#F5F5F5]">
            
            <div className="flex items-center">
                <img src={tooth} className="w-6 h-6" alt="Imagem Logo" />
                <h3 className="text-[#004441] text-lg select-none">oakdental.</h3>
            </div>
            <Link to="/login" className="text-[#004441]">Entrar</Link>
        </nav>
    )
}