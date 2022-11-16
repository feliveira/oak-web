import { Link } from "react-router-dom"

export default function Hero ( )
{
    return (
        <section className="py-44 2xl:py-40 flex items-center text-center justify-center  flex-col bg-[#F8F7F2] p-6">
            <h1 className="text-5xl xl:text-7xl 2xl:text-8xl font-extrabold text-[#004441] mb-2 animate__animated animate__fadeIn select-none">Economia e Praticidade</h1>
            <h2 className="px-14 text-sm xl:text-base 2xl:text-2xl text-[#777672] mb-8 2xl:mb-14 animate__animated animate__fadeIn select-none">Compare os melhores preços e realize o seu orçamento de forma efetiva!</h2>
            <Link to="/signup" className="bg-[#37C9B6] text-[#004441] py-4 px-6 2xl:text-xl rounded-md active:shadow-[inset_5px_5px_14px_-1px_#004441] hover:opacity-90 animate__animated animate__heartBeat">Clique para Economizar</Link>
        </section>
    )
}