import React, { useEffect, useState } from "react";
// import Dog from "./Dog";
// import Pagination from "./Pagination";
import { getAllDogs } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
// import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import './Home.css'
import Nav from "./Nav";


export function Home ()  {
    //me traigo el estado de mi action con useSelector
    const dogs = useSelector((state) => state.allDogs);
    const filter = useSelector((state) => state.searchDog);
    // me asigno en el dispatch el useDispatch para poder despachar lo que quiera con esa variable
    // declaro un nuevo estado currentPage = 1 referido a la pag en la que estoy 
    const [currentPage, setCurrentPage] = useState(1);
    // declaro un nuevo estado itemsPerPage = 8 renderizo 8 dogs por pagina 
    // eslint-disable-next-line
    const [itemsPerPage, setItemsPerPage] = useState(8);
    // pagino de a 10
    // eslint-disable-next-line
    const [limitPage, setLimitPage] = useState(10);
    // declaro en el estado que el maximo de paginacion es 10
    const [maxPageLimit, setMaxPageLimit] = useState(10);
    // declaro que el minimo de paginacion es 0
    const [minPageLimit, setMinPageLimit] = useState(0);
    // en seteo mi current page en la pag que este por id
    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    }
    // creo un array pages que va a contener la cantidad de perros dividido 10 (perros a renderizar x pag)
    const pages = [];
    for (let i = 1 ; i <=Math.ceil(dogs?.length/itemsPerPage) ; i++) {
        pages.push(i);
    }
    // en lastItem guardo el ultimo item que estoy renderizando
    const lastItem = currentPage * itemsPerPage;
    // en firstItem guardo el primer item que estoy renderizando 
    const firstItem = lastItem - itemsPerPage;
    //en currentItem guardo los items que estoy renderizando (por ej: del 0 al 10)
    const currentItems = dogs?.slice(firstItem, lastItem);
    // si el numero esta dentro de mi limite maximo y minimo, renderizo los numbers pages
    const renderPages = pages.map((number) => {
        if (number < maxPageLimit +1 && number > minPageLimit) { 
            return (
                <li key={number} id={number} onClick={handleClick}>
                    {number}
                </li>
            )
        } else {
            return null;
        }
    })
    const dispatch = useDispatch(); 
    
    useEffect(() => {
        dispatch(getAllDogs());
    }, 
    // eslint-disable-next-line
    [])

    useEffect(()=>{
        console.log("dogs actualizado")
    },[dogs])

    // hago una funcion handle next que maneje el estado de currentPage, en el if digo que si es mayor 
    // a la paginacion paso a tener 20 pags.

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageLimit) {
            setMaxPageLimit(maxPageLimit + limitPage);
            setMinPageLimit(minPageLimit + limitPage);
        }
    }
    
    // en el if, 
    const handlePrev = () => {
        setCurrentPage(currentPage - 1);
        if ((currentPage - 1) % limitPage === 0) {
            setMaxPageLimit(maxPageLimit - limitPage);
            setMinPageLimit(minPageLimit - limitPage);
        }
    }
    

    const url ='https://res.cloudinary.com/demogorgonn/image/upload/v1659487481/samples/animals/kisspng-dogue-de-bordeaux-english-mastiff-bulldog-cane-cor-french-bulldog-puppy-cartoon-5b559279745b95.9216208515323347134766_drdpuu.jpg'
    // eslint-disable-next-line
    dogs?.map((e) =>{
        // console.log(dogs)
        if(e.id.length > 4){
          e.image = {url}
          e.temperament= ""
          for(let i = 0; i<e.temperament.length; i++){
           e.temperament += e.temperament[i].name.toString() + ", "
          }
       }
    })
    
    function renderData(dogs) {
        return (
            <div className='direccion' >
                <div className='nav'>
                <Nav></Nav>

                </div>
                    {
                        dogs?.map((theDogs) => {
                            //  console.log(theDogs)
                            return (
                                <div className='contenedor' key={theDogs.id}>
                                    
                                    <p className='text'>{theDogs.name}</p>
                                    <Link to={`/detail/${theDogs.id}`}><img  src={theDogs.image.url}  alt="not found" className="image"/></Link>
                                    {/* <p className="text2" >{theDogs.temperament}</p> */}
                                </div>
                            )
                        })
                    }
            </div>
        )
    }
    
    return (

        <div className='backgroun'>
            {filter?.length > 0 ? renderData(filter) : renderData(currentItems)}
            <ul className='pagination'> 
                <li>
                    <button onClick={handlePrev} disabled={currentPage === pages[0] ? true : false}>
                        ←
                    </button>
                </li>
                {renderPages}
                <li>
                    <button onClick={handleNext} disabled={currentPage === pages[pages.length - 1] ? true : false}>
                        →
                    </button>
                </li>  
            </ul>
        </div>
        
    )

}

