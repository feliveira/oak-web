export default function ShopItem( { id, nome, path, produtos, handleDelete, handleModal } )
{
    return (
        <div className="w-64 h-32 p-6 bg-[#F5F5F5] rounded-xl cursor-pointer relative">
            <div onClick={() => handleDelete( id )} className="absolute right-0 top-0 hover:scale-105 bg-red-500 rounded-full p-1.5 translate-x-2 -translate-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F5F5F5" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <p className="text-lg">{ nome ? `${nome.substring(0,14)}...` : '' }</p>
            <p className="text-xs">{ path ?? '' }</p>
            <p className="text-xl">{ produtos ? `${produtos.length} produto${ produtos.length > 1 || produtos.length == 0 ? "s" : "" }` : ''}</p>
            <div onClick={( ) => handleModal( "editShop", { id: id , nome: nome, path: path } )} className="ml-[98%]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0B4C49" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </div>
        </div>
    )
}