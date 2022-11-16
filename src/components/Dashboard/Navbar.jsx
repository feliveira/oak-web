import tooth from "../../assets/tooth-icon.svg"
import { auth } from "../../../firebase"
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar( )
{
    const navigate = useNavigate( )

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    return (
        <nav className="flex flex-col md:flex-row items-center md:justify-between py-6 px-8 bg-[#F5F5F5]">
            
            <div className="flex items-center">
                <img src={tooth} className="w-6 h-6" alt="Imagem Logo" />
                <h3 className="text-[#004441] text-lg select-none">oakdental.</h3>
            </div>
            <div className="flex flex-col md:flex-row items-center md:justify-between">
                <button onClick={handleLogout} className="text-[#004441]">Sair</button>
            </div>
        </nav>
    )
}