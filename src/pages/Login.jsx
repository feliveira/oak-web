import React, {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase"
import { NavLink, useNavigate } from 'react-router-dom'
import tooth from "../assets/tooth-icon.svg"
 
export default function Login ( ) {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: "", password: ""
    })

    const [error, setError] = useState({
        hasError: false, message: ""
    })
    
    function handleChange( e )
    {
        setFormData(prevData => ({...prevData, [e.target.name] : e.target.value}))
    }

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
            // Signed in
            navigate("/dashboard")
        })
        .catch((error) => {
            setError(( ) => ( { hasError: true, message: error.message} ))
        });
       
    }
 
    return(
        <main className='flex flex-col justify-center items-center py-28'>
            <div className="flex items-center my-6">
                <img src={tooth} className="w-6 h-6" alt="Imagem Logo" />
                <h3 className="text-[#004441] text-lg select-none">oakdental.</h3>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-xl'>                                              
                <div className='flex flex-col mb-6'>
                    <label htmlFor="email-address" className="text-[#004441] indent-1">
                        Email
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"   
                        value={formData.email}                                 
                        required                                                                                
                        placeholder="email@email.com.br"
                        className="py-1 indent-1 text-[#777672] focus:outline-none focus:outline-2 rounded-md focus:outline-[#004441]"
                        onChange={handleChange}
                    />
                </div>

                <div className='flex flex-col mb-6'>
                    <label htmlFor="password" className="text-[#004441] indent-1">
                        Senha
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}                                    
                        required                                                                                
                        placeholder="Senha"
                        className="py-1 indent-1 text-[#777672] focus:outline-none focus:outline-2 rounded-md focus:outline-[#004441]"
                        onChange={handleChange}
                    />
                </div>

                { 
                    error.hasError &&
                    <div className='text-center max-w-64 py-2 border-red-600 bg-red-300 text-red-600 px-2 my-4'>
                        {error.message}
                    </div>
                }
                                    
                <div className="w-full flex justify-center">
                    <button                                    
                        onClick={onLogin}
                        className="bg-[#37C9B6] text-[#004441] py-2 px-8 2xl:text-xl rounded-md active:shadow-[inset_5px_5px_14px_-1px_#004441] hover:opacity-90"                                   
                    >      
                        Login                                                                  
                    </button>
                </div>                               

                <p className='text-sm text-center text-[#777672] mt-1'>
                    Não tem conta ainda?{' '}
                    <NavLink to="/signup" className="text-[#004441]" >
                        Cadastre-se
                    </NavLink>
                </p>
            </div>
        </main>
    )
}