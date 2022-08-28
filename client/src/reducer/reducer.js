
import {
    GET_ALL_DOGS,
    GET_DOG_DETAIL,
    SEARCH_DOG,
    CLEAR_SEARCH,
    CLEAR_DETAIL,
    CREATE_DOG,
    GET_TEMPERAMENTS,
    CLEAR_ALLDOG,
    FILTER_TEMPERAMENT,
    FILTER_ORIGIN,
    ORDER_WEIGHT_ASC,
    ORDER_WEIGHT_DESC,
    ORDER_AZ,
    ORDER_ZA,
  } from "../actions/actions";
   
   import {store} from "../store/store";
  
  
  
  const initialState ={
    allDogs: [],
    DogDetail:{},
    temps: [],
    searchDog:[],  
    filter: []  
  }
  
  function ordenar(arr, prop) {   
    let ordenado = [] 
    if(prop === 'name') {
        ordenado = arr.sort(function (a, b) {        
            if (a[prop] < b[prop]) { return -1; }
            if (a[prop] > b[prop]) { return 1; }
            return 0;
        });
    } else 
    {
        ordenado = arr.sort(function (a, b) {            
            if (a[prop][0] < b[prop][0]) { return -1; }
            if (a[prop][0] > b[prop][0]) { return 1; }
            return 0;
        });
    
    }
    return ordenado
  }
  function reducer(state=initialState, {type, payload}){
    switch(type){
        case CREATE_DOG:{
            return {...state, searchDog: payload}
        }
        case FILTER_ORIGIN:{
            if(payload === 'all') return {...state}
            if(payload === 'db') return {...state, searchDog: [...state.allDogs].filter(p=> p.id.length === 36)}
            if(payload === 'api') return {...state, searchDog: [...state.allDogs].filter(p=> p.id.length !== 36)}
                
        }
        case FILTER_TEMPERAMENT:{
            if(payload === '') return {...state}
            let copia = [...state.allDogs]
            let filtrado = copia.filter(p=> p.temperament?.toLowerCase().includes(payload))
            return {...state, searchDog: filtrado }
        }
        case CLEAR_SEARCH:{
            delete state.searchDog
            return {...state}
        }
        
        case ORDER_WEIGHT_ASC:{
            if(!state.searchDog) {
  
                let ordenado = ordenar([...state.allDogs], 'weight' )
                return {...state, allDogs: ordenado}
            } else {
                let ordenado = ordenar([...state.searchDog], 'weight')
                return {...state, searchDog: ordenado}
            }
        }        
        case ORDER_WEIGHT_DESC:{
            if(!state.searchDog) {                
                let ordenado = ordenar([...state.allDogs], 'weight' ).reverse()
                return {...state, allDogs: ordenado}
            } else {
                let ordenado = ordenar([...state.searchDog], 'weight').reverse()
                return {...state, searchDog: ordenado}
            }
        }        
        case ORDER_AZ:{
            if(!state.searchDog) {                
                let ordenado = ordenar([...state.allDogs], 'name' )
                return {...state, allDogs: ordenado}
            } else {
                let ordenado = ordenar([...state.searchDog], 'name')
                return {...state, searchDog: ordenado}
            }
  
        }
        case ORDER_ZA:{
            if(!state.searchDog) {                
                let ordenado = ordenar([...state.allDogs], 'name' ).reverse()
                return {...state, allDogs: ordenado}
            } else {
                let ordenado = ordenar([...state.searchDog], 'name').reverse()
                return {...state, searchDog: ordenado}
            }
  
        }

        case "DB": 
            return {
                ...state,
                allDogs: state.allDogs.filter(b => b.id.length > 6).sort()
            }
        case "API": 
            return {
                ...state,
                allDogs: state.allDogs.filter(b => b.id < 200).sort()
            }
        case CLEAR_ALLDOG:{
            return {
                ...state,
                allDogs: []
            }
        }
  
        case GET_ALL_DOGS:{
            return {
            ...state,
            allDogs: payload
        }
    }
        case GET_DOG_DETAIL:{
            
            return {
                ...state,
                DogDetail: payload
            }
        }
  
        case CLEAR_DETAIL:{
            return {
                ...state,
                DogDetail:{}
            }
        }
  
        case SEARCH_DOG:{
            return {
                ...state,
                searchDog: payload
            }
        }
        case GET_TEMPERAMENTS:{
            return {
                ...store,
                temps: payload
            }
        }
  
        
        default:  return state
        
    }
  }
  
  export default reducer;