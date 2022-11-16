import Hero from "../components/Landing/Hero"
import Navbar from "../components/Landing/Navbar"

export default function Landing ( )
{
    return ( 
        <div className="h-screen">
            <Navbar />
            <Hero />
        </div>
    )
}