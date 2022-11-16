import { useEffect } from "react";
import { useState } from "react";
import Button from "./Button";

export default function GenericModal ( { form, modal, closeModal, handleModal } )
{
    const [formData, setFormData] = useState({})

    useEffect (( ) => {
        if( modal.type === "editForm" )
        {
            for(let i = 0; i < form.length; i++)
            {
                setFormData(prevData => ({...prevData, [form[ i ].key] : form[ i ].value }))
            }
        }
    },[ ] ) 

    function handleSubmit( )
    {
        if(modal.type === "form" || modal.type === "editForm")
        {
            handleModal( formData )
        }
    }

    function handleChange( e )
    {
        setFormData(prevData => {
            return {...prevData, [e.target.name] : e.target.value }
        })
    }

    return (
        <div onClick={ closeModal } className="bg-black/60 fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center z-40">
            <div onClick={(e) => e.stopPropagation() } className="bg-[#F5F5F5] p-6 z-50 flex flex-col w-[80%] max-w-[400px] rounded-lg animate__animated animate__fadeInDown">
                <p className="text-center text-xl mb-4">{modal.title}</p>
                {
                    form && form.map( input => (
                        <div key={ input.key } className="mb-3">
                            <label className="block" htmlFor={input.key}>{input.key}</label>
                            <input
                            name={input.key}
                            id={input.key}
                            className="w-full rounded my-2 p-4 shadow-lg"
                            placeholder={ input.placeholder }
                            type={input.type}
                            value={ formData[input.key] ?? ''}
                            onChange={handleChange}
                            required
                            />
                        </div>
                    ))
                }
                <div onClick={handleSubmit} className="mx-auto my-4">
                    <Button text={modal.confirm} />
                </div>
            </div>
        </div>
    )
}