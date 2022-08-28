import React, {useEffect}from 'react';
import { Link } from 'react-router-dom';
// import {connect} from 'react-redux';
 import {  useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getDogDetail , clearDetail} from '../actions/actions'
import './DogDetail.css';



export default function DogDetail({match}) {
    const {id} =  useParams()
    const d = useSelector(state => state.DogDetail)
    const tempers = useSelector(state => state.temps)


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDogDetail(id))    
        return () => {
          dispatch(clearDetail())
        }
      }, [])

    function renderDog(dog) {
        const url ="https://res.cloudinary.com/demogorgonn/image/upload/v1659576571/samples/animals/dogo-de-burdeos_rm9twx.png"

        if (id.length < 10) {
            return (
                <div  >
                    <div className='cont'>
                        <p className='text'>{d?.name}</p>
                        <Link to ={'/dogs'} className='buttoon'><img src={d?.image?.url} className='image' alt="LOADING"/></Link>
                        <p className='text2'>{d?.height?.metric}</p>
                        <p className='text2'>{d?.weight?.metric}</p>
                        <p className='text2'>{d?.life_span}</p>
                        <p className='text2'>{d?.temperament}</p>
                    </div>
                    <Link to ={'/dogs'} className='buttoon'></Link>
                                    </div>
            )
        } else {
            if (!d.id) {
                <h1>Loading...</h1>
            }
            // d?.forEach((e) =>{
            //     e.temperament= ""
            //     for(let i = 0; i<e.temperaments.length; i++){
            //         e.temperament += e.temperaments[i].name.toString() + ", "
            //     }
            // })
            return (
                <div >
                    <div className='cont'>
                        <p  className='text'>{d[0]?.name}</p>
                        <Link to ={'/dogs'}> <img src={url}  className='image' alt="NOT FOUND"/></Link>
                        {/* <p> {'NOT FOUND'}</p> */}
                        <p className='text2'>{d[0]?.height}</p>
                        <p className='text2'>{d[0]?.weight}</p>
                        <p className='text2'>{d[0]?.life_span}</p>
                        <p className='text2'>{d[0]?.temperament}</p>

                       
                        <div >
        </div>
                    </div>
                </div>
            )
        }
    }
    
    return (
        <div>
        {typeof(d) === "undefined" 
        ? <h1>Loading...</h1>
        : renderDog(d)
        }
        </div>
    )
    
}
module.export = DogDetail;