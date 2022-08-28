import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { filterBy, getHeaviest, getLightiest, getTemperaments, orderAZ, orderZA, filter, getAllDogs } from '../actions/actions';
import style from "./Order.css"

export function Order() {

    const [selectTemp, setSelectTemp] = useState();
    const [filterTemp, setFilterTemp] = useState([]);

    const dispatch = useDispatch();

    const tempers = useSelector(state => state.temps);

    const allTheDogs = useSelector(state => state.allDogs);

    function orderByAz(e) {
        e.preventDefault();
        dispatch(orderAZ());
    }

    function orderByZa(e) {
        e.preventDefault();
        dispatch(orderZA());
    }

    function handleSelect(e) {
        dispatch(filterBy(e.target.value));
    }
    
    function handleSelected(e) {
        dispatch(getAllDogs());
    }

    function orderByHeaviest(e) {
        e.preventDefault();
        dispatch(getHeaviest());
    }

    function orderByLightiest(e) {
        e.preventDefault();
        dispatch(getLightiest());
    }

    useEffect(() => {
        dispatch(getTemperaments());
    }, [])

    function handleChange(e) {
        setSelectTemp(e.target.value);
    }

    function handleClick() {
        let filtering = [];
        tempers?.forEach((e) => {
            if (e.id.length) {
                e.temperaments.map((t) => (
                    t.name === selectTemp ? filtering.push(e) : null
            ))
            } else {
                if (e.temperament?.includes(selectTemp)) {
                    filtering.push(e);
                }
            }
        })
        dispatch(filter(filtering))
    }

    function handleSubmit(e) {
        e.preventDefault();
        setFilterTemp([...filterTemp, selectTemp]);
        handleClick();
    }

    return (
        <div className={style.container}>
            <button className={style.button} onClick={(e) => orderByAz(e)}>A to Z</button>
            <button className={style.button} onClick={(e) => orderByZa(e)}>Z to A</button>
            <button className={style.button} value="DB" type="submit" onClick={(e) => handleSelect(e)}>MY DOGS</button> 
            <button className={style.button} value="ALL" type="submit" onClick={(e) => handleSelected(e)}>ALL</button> 
            <button className={style.button} value="API" type="submit" onClick={(e) => handleSelect(e)}>API</button> 
            {/* <button className={style.button} onClick={(e) => orderByHeaviest(e)}>HEAVY</button>
            <button className={style.button} onClick={(e) => orderByLightiest(e)}>LIGHT</button> */}

        <div className={style.container}>
            <form onSubmit={handleSubmit}>
                <select className={style.containerFilt} onChange={handleChange} name="temperaments" value={selectTemp}>
                    {
                        tempers?.map((t) => {
                            return (
                                <option  key={t.id} value={t.name}>{t.name}</option>
                            )
                        })
                    }
                </select>
                <button className={style.button2} type="submit">Filter</button>
            </form>
        </div>
    </div>
    )
}

module.export = Order;