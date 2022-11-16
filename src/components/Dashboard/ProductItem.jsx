export default function ProductItem({id, nome, descricao, marca, valor, handleDelete, handleModal})
{
    return (
        <div className="w-64 h-32 p-6 bg-[#F5F5F5] rounded-xl hover:scale-105 cursor-pointer relative">
            <div onClick={() => handleDelete( id )} className="absolute right-0 top-0 bg-red-500 rounded-full p-1.5 translate-x-2 -translate-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F5F5F5" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <p className="text-lg">{nome ? `${nome.substring(0,16)}...` : ''}</p>
            <p className="text-xs">{descricao ? `${descricao.substring(0,20)}...` : ''}</p>
            <div className="flex justify-between">
                <p>{marca ?? ''}</p>
                <p className="text-xl">{ valor ? `R$${valor}` : ''}</p>
            </div>
            <div onClick={( ) => handleModal( "editProduct", { id: id , nome: nome, descricao: descricao, marca: marca, valor: valor } )} className="ml-[98%]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0B4C49" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </div>
        </div>
    )
}