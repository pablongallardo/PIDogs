import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {getTemperaments, createDog} from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, } from 'react-router-dom';
import './createDog.css'


export function validate(input) {
    let errors = {};
    if(!input.name) {
        errors.name = 'Name is required';
    }
    
    if(!input.height) {
        errors.height = 'Height is required';
    } else if(!/\d{1,2}-\d{1,2}/g.test(input.height)){
        errors.height =' Add a heighT range. Example: 10-12'
    }
    if(!input.weight) {
        errors.weight = 'Weight is required';
    } else if(!/\d{1,2}-\d{1,2}/g.test(input.weight)){
        errors.weight =' Add a weight range. Example: 10-12'
    }
    if(!input.life_span) {
        errors.life_span = 'Life_span is required';
    }
    if(!input.temperament) {
        errors.temperament = 'Add at least one temperament';
    }
  return errors;
}

export default function CreateDog() {
    const [input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        life_span: '',
        temperament: [],
    })
    const[errors, setErrors] = useState({})

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTemperaments());
    }, [])

    const temper = useSelector(state => state.temps);

    const handleInputChange = function(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value });
            setErrors(validate({...input, [e.target.name]:e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        if(!errors.name && !errors.height && !errors.weight && !errors.life_span){
            //fetch('http://localhost:3001/dog', input);
            //method: 'POST';
            // body: JSON.strinify{name: '',
            //     height: '',
            //     weight: '',
            //     life_span: '',
            //     temperament:[]}
            alert('Your breed has been created successfully');
            axios.post('http://localhost:3001/dog', input)
            .then(setInput({
                name: '',
                height: '',
                weight: '',
                life_span: '',
                temperament:[]
            }))
        }else{
            return alert('Something went wrong. Please try again!');
        }
    }
 
    function handleSelect(e){
        if(input.temperament.includes(parseInt(e.target.value))){
            alert('You already selected this Temperament. Try again');
        } else {
            setInput((prev) => ({  
                ...prev,
                temperament: [...prev.temperament, parseInt((e.target.value))],
            }))
        }
    }


    const temperNames = (array) =>{
        let names = [];
        temper?.forEach((e) =>(
            array.forEach((id) =>{
                if(parseInt(id === e.id)){
                    names.push(e.name)
                }
            })
        ))
        return names;
    }

    return (
        <form onSubmit = {handleSubmit}>
            <div className='backgrou'>
                <ul>
                    <div className='label'>
                    <li>
                        <label>Name:</label>
                    </li>
                    </div>
                    <input className='input' key="name" type="text" name="name" placeholder="Insert name..." onChange={handleInputChange} value={input.name}/>
                    {errors.name && (<p className='danger'>{errors.name}</p>)}
                    <br/>
                    <div className='label'>
                    <li>
                        <label>Height:</label>
                    </li>
                    </div>
                    <input className='input' key="height" type="text" name="height" placeholder="Insert height..." onChange={handleInputChange} value={input.height}/>
                    {errors.height && (<p  className='danger'>{errors.height}</p>)}
                    <br/>
                    <div className='label'>
                    <li>
                        <label>Weight:</label>
                    </li>
                    </div>
                    <input className='input' key="weight" type="text" name="weight" placeholder="Insert weight..." onChange={handleInputChange} value={input.weight}/>
                    {errors.weight && (<p className='danger'>{errors.weight}</p>)}
                    <br/>
                    <div className='label'>
                    <li>
                        <label>Life Span:</label>
                    </li>
                    </div>
                    <input className='input' key="life_span" type="text" name="life_span" placeholder="Insert life span..." onChange={handleInputChange} value={input.life_span}/>
                    {errors.life_span && (<p className='danger'>{errors.life_span}</p>)}
                    <br/>
                    <div className='label'>
                    <li>
                        <label>temperament:</label>
                    </li>
                    </div>
                    <select className='select' key="temperament" name="temperament" onChange={(e) => handleSelect(e)} required value={input.temperament}>
                        {
                            temper?.map((e) => (
                                <option value={e.id} key={e.id}>
                                    {e.name}
                                </option>
                            ))
                        }
                    </select>
                    {errors.temperament && (<p className='danger'>{errors.temperament}</p>)}
                    <br/>
                    {
                        input.temperament.map((e) => (
                            <p id={e}>
                                {temperNames([e])}
                            </p>
                        ))
                    }
                    <button className='button'  type= "submit" name= "submit" onClick={handleSubmit}>Create</button>
                  </ul>
                  {/* <Link to ={'/dogs'} className='button'> volver</Link> */}
                 <Link to ={'/dogs'}><button className='button'>volver</button></Link>
            </div>
        </form>
        
    )

}

module.export = CreateDog;
