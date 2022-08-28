import React, { useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {searchBar} from '../actions/actions'


export default function SearchBar() {
   
    const[search, setSearch] = useState('');

    const dispatch = useDispatch();

    const handleChange = async (e) =>{
         setSearch(e.target.value)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch(searchBar(search));
        setSearch('')
    }

    return (
        <div className="">
            <form className="form">
                <input className="form" type="text" placeholder="Insert breed" value={search} onChange={(e) => handleChange(e)}/>
                 <button className="btnn" type="submit" onClick={(e) => handleSubmit(e)}>ir</button>
            </form>
        </div>
    )

}