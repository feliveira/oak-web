import Button from "./Button"

export default function Sidebar( props )
{
    return (
        <aside className="bg-[#F5F5F5] min-h-screen w-56 p-6 border-r-2 hidden xl:flex">
            <div className="flex flex-col items-center space-y-6">
                <span onClick={() => props.handleSidebar( "produto" )}>
                    <Button text="Criar Produto" />
                </span>
                <span onClick={() => props.handleSidebar( "loja" )}>
                    <Button text="Criar Loja" />
                </span>
            </div>
        </aside>
    )
}