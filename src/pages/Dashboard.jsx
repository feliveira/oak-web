import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase"
import axios from "axios";

import Navbar from "../components/Dashboard/Navbar";
import ProductItem from "../components/Dashboard/ProductItem";
import ShopItem from "../components/Dashboard/ShopItem";
import Sidebar from "../components/Dashboard/Sidebar";
import Button from "../components/Dashboard/Button";
import GenericModal from "../components/Dashboard/GenericModal";

export default function Dashboard ( )
{
    const navigator = useNavigate( )
    const [items, setItems] = useState([])
    const [tab, setTab] = useState("produtos")
    const [modalState, setModalState] = useState({
      createProduct: false, editProduct: false, createShop: false, editShop: false
    })
    const [itemToEdit, setItemToEdit] = useState({})

    // useEffect(()=>{
    //     onAuthStateChanged(auth, (user) => {
    //         if (!user) {
    //           navigator("/login")
    //         }
    //     })
         
    // }, [])

    useEffect(( ) => {
      
      setItems([])
      const url = "https://corsproxy.io/?" + encodeURIComponent(`https://oakdental.herokuapp.com/${tab}`)

      async function fetchData(  )
      {
        const response = await axios.get( url )
        const result = await response.data
        setItems( prevItems => result )
      }
      
      fetchData( )

    }, [ tab, modalState ] )

    function handleSidebar ( item ) {
      if( item === "produto" )
      {
        setModalState(prevState => ({...prevState, createProduct: true}))
      }
      else {
        setModalState(prevState => ({...prevState, createShop: true}))
      }
    }

    function handleModal ( type, item )
    {
      
      setItemToEdit( item )

      if( type === "editShop" )
      {
        setModalState(prevState => ({...prevState, editShop: true}))
      }
      if ( type === "editProduct" )
      {
        setModalState(prevState => ({...prevState, editProduct: true}))
      }
    }

    function createProduct ( product )
    {
      const url = "https://corsproxy.io/?" + encodeURIComponent(`https://oakdental.herokuapp.com/produtos`)
      axios.post( url, {...product, valor: parseFloat(product.valor)}, {mode : "no-cors" } )
      .then(response => {
        setModalState(prevState => ({...prevState, createProduct: false}))
      }
      )
      .catch(error => console.log(error))
    }

    function editProduct ( product )
    {

      const url = "https://corsproxy.io/?" + encodeURIComponent(`https://oakdental.herokuapp.com/produtos/${ itemToEdit.id }`)
      axios.put( url, product )
      .then(response => {
        setModalState(prevState => ({...prevState, editProduct: false}))
      }
      )
      .catch(error => console.log(error))
    }

    function deleteProduct( id )
    {
      const url = "https://corsproxy.io/?" + encodeURIComponent(`https://oakdental.herokuapp.com/produtos/${id}`)
      axios.delete( url )
      .catch(error => console.log(error))
    }

    function createShop ( shop )
    {
      const url = "https://corsproxy.io/?" + encodeURIComponent(`https://oakdental.herokuapp.com/lojas`)
      axios.post( url, {...shop, produtos: []}, {mode : "no-cors" } )
      .then(response => {
        setModalState(prevState => ({...prevState, createShop: false}))
      }
      )
      .catch(error => console.log(error))
    }

    function deleteShop( id )
    {
      const url = "https://corsproxy.io/?" + encodeURIComponent(`https://oakdental.herokuapp.com/lojas/${id}`)
      axios.delete( url )
      .catch(error => console.log(error))
    }

    function editShop ( shop )
    {

      const url = "https://corsproxy.io/?" + encodeURIComponent(`https://oakdental.herokuapp.com/lojas/${ itemToEdit.id }`)
      axios.post( url, shop, {method: "PUT" } )
      .then(response => {
        setModalState(prevState => ({...prevState, editShop: false}))
      }
      )
      .catch(error => console.log(error))
    }
    
    return (
      <>
        <Navbar />
        <main className="flex">

         { modalState.createProduct && 
            <GenericModal
              modal={{type: "form", title: "Criar Produto", confirm: "Criar"}}
              form={
              [
                {type: 'text', placeholder: "Nome do Produto", key: 'nome'},
                {type: 'text', placeholder: "Descrição do Produto", key: 'descricao'},
                {type: 'text', placeholder: "Marca do Produto", key: 'marca'},
                {type: 'text', placeholder: "Valor do Produto", key: 'valor'},            
              ]}
              handleModal={createProduct}
              closeModal={ ( ) => setModalState(prevState => ({...prevState, createProduct: false}))}
            /> }
          
          { modalState.editProduct && 
            <GenericModal
              modal={{type: "editForm", title: "Editar Produto", confirm: "Editar"}}
              form={
              [
                {type: 'text', placeholder: "Nome do Produto", key: 'nome', value: itemToEdit.nome},
                {type: 'text', placeholder: "Descrição do Produto", key: 'descricao', value: itemToEdit.descricao},
                {type: 'text', placeholder: "Marca do Produto", key: 'marca', value: itemToEdit.marca},
                {type: 'text', placeholder: "Valor do Produto", key: 'valor', value: itemToEdit.valor},            
              ]}
              handleModal={editProduct}
              closeModal={ ( ) => setModalState(prevState => ({...prevState, editProduct: false}))}
            /> }


          { modalState.createShop && 
            <GenericModal
              modal={{type: "form", title: "Criar Loja", confirm: "Criar"}}
              form={
              [
                {type: 'text', placeholder: "Nome do Produto", key: 'nome'},
                {type: 'text', placeholder: "Link do Website", key: 'path'},        
              ]}
              handleModal={createShop}
              closeModal={ ( ) => setModalState(prevState => ({...prevState, createShop: false}))}
            /> }

            { modalState.editShop && 
            <GenericModal
              modal={{type: "editForm", title: "Editar Loja", confirm: "Editar"}}
              form={
              [
                {type: 'text', placeholder: "Nome da Loja", key: 'nome', value: itemToEdit.nome},
                {type: 'text', placeholder: "Link do Website", key: 'path', value: itemToEdit.path}         
              ]}
              handleModal={editShop}
              closeModal={ ( ) => setModalState(prevState => ({...prevState, editShop: false}))}
            /> }

            <Sidebar handleSidebar={handleSidebar} />

            <div className="w-full border-t-2 xl:pl-6 flex flex-col bg-[#777672] min-h-screen">
              <div className="flex flex-col xl:hidden mx-auto space-y-4 my-6">
                <div onClick={() => handleSidebar ( "produto" )}><Button text="Criar Produto" /></div>
                <div onClick={() => handleSidebar ( "loja" )}><Button text="Criar Loja" /></div>
              </div>
              <div className="flex items-center my-2 xl:my-6 text-[#F5F5F5] mx-auto xl:mx-0">
                <button className="p-6 hover:scale-105" onClick={() => setTab("lojas")}>Lojas</button>
                |
                <button className="p-6 hover:scale-105" onClick={() => setTab("produtos")}>Produtos</button>
              </div>
              <div className="flex flex-wrap justify-center xl:justify-start gap-x-4 gap-y-4 py-6 animate__animated animate__fadeIn">
                {
                  items.length && tab == "produtos" ?
                      items.map(item => (
                      <ProductItem key={item.id} {...item} handleModal={handleModal} handleDelete={deleteProduct} />
                      ))
                  : ""
                }
                {
                  items.length && tab == "lojas" ?
                    items.map(item => (
                      <ShopItem key={item.id} {...item} handleModal={handleModal} handleDelete={deleteShop} />
                    ))
                  : ""
                }
                 
              </div>
            </div>
        </main>
      </>
    )
}