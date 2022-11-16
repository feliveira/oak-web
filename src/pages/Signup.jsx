import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import tooth from "../assets/tooth-icon.svg"
 
export default function Signup ( ) {
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

    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/login")
            // ...
        })
        .catch((error) => {
            setError(( ) => ( { hasError: true, message: error.message} ))
        });
 
   
    }
 
  return (                                                                         
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
                        type="email"
                        label="Email"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className="py-1 indent-1 text-[#777672] focus:outline-none focus:outline-2 rounded-md focus:outline-[#004441]"
                        required
                        placeholder="email@email.com.br"
                    />
                </div>
                <div className='flex flex-col mb-6'>
                    <label htmlFor="password" className="text-[#004441] indent-1">
                        Senha
                    </label>
                    <input
                        type="password"
                        label="Senha"
                        name="password"
                        className="py-1 indent-1 text-[#777672] focus:outline-none focus:outline-2 rounded-md focus:outline-[#004441]"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Senha"
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
                        type="submit"
                        onClick={onSubmit}
                        className="bg-[#37C9B6] text-[#004441] py-2 px-8 2xl:text-xl rounded-md active:shadow-[inset_5px_5px_14px_-1px_#004441] hover:opacity-90"
                    >
                        Cadastrar
                    </button>
                </div>
                <p className='text-sm text-center text-[#777672] mt-1'>
                    Já tem uma conta?{' '}
                    <NavLink to="/login" className="text-[#004441]" >
                        Login
                    </NavLink>
                </p>
            </div>
        </main>                 
    )
}