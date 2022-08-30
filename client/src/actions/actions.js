import axios from 'axios';

export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DOG_DETAIL  = 'GET_DOG_DETAIL';
export const SEARCH_DOG = 'SEARCH_DOG';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
 export const CREATE_DOG = 'CREATE_DOG';
 export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
 export const CLEAR_ALLDOG = 'CLEAR_ALLDOG';
 export const FILTER_TEMPERAMENT = 'FILTER_TEMPERAMENT';
 export const FILTER_ORIGIN = 'FILTER_ORIGIN';
 export const ORDER_WEIGHT_ASC = 'ORDER_WEIGHT_ASC';
 export const ORDER_WEIGHT_DESC = 'ORDER_WEIGHT_DESC';
 export const ORDER_AZ = 'ORDER_AZ';
 export const ORDER_ZA = 'ORDER_ZA';
 export const FILTERBYTEMPS = 'FILTERBYTEMPS';
 export const ORDERBYTHEHEAVY = "ORDER_BY_THE_HEAVY";
export const ORDERBYTHELIGHT = "ORDER_BY_THE_LIGHT";
//declaro constantes
const URL = "https://vercel.com/pablongallardo/pid-ogs";
const URL_DOGS = URL + '/dogs';
// const URL_DB = URL + '/dog';
// const URL_TEMPS = URL +'/temperament';

export function getAllDogs() {
    return async function (dispatch) {
        try{
            return fetch (URL_DOGS)
            .then(r => r.json())
            .then(res => dispatch({type: GET_ALL_DOGS, payload: res}))
            // .chatch(error => console.log("Error    --->", error))

        } catch(error){
            return(                
                (error => console.log("Error    --->", error))
            )
        }
                    
    }
}

export const getDogDetail = (id) => async dispatch => {
    try {
        const res = await axios('http://localhost:3001/dogs/' + id);    
        // const res = await axios(`${URL_DOGS}/${id}`);  
        return dispatch({type:GET_DOG_DETAIL, payload :res.data})
        
    } catch (error) {
        return(
            (error => console.log("Error    --->", error))
        )
    }
}

export function clearAllDogs() {
    return { type: CLEAR_ALLDOG }
}
export function clearDetail() {
    return { type: CLEAR_DETAIL }
}

export function clearSearch() {
    return { type: CLEAR_SEARCH }
}

export function orderZA() {
    return {type: ORDER_ZA}
}
export function orderAZ() {
    return {type: ORDER_AZ}
}
export function orderWeightDesc() {
    return {type: ORDER_WEIGHT_DESC}
}
export function orderWeightAsc() {
    return {type: ORDER_WEIGHT_ASC}
}

export function filterOrigin(origin){
    return {type:FILTER_ORIGIN, payload:origin}
}
export function filterTemperament(temp){
    return {type:FILTER_TEMPERAMENT, payload:temp}
}

// export function searchBar(name) {
//     return  async function (dispatch) {
//         try {
//         const r = await fetch(`${URL_DOGS}?name=${name}`)
//         const res = await r.json();
//         return dispatch({type:SEARCH_DOG, payload: res})
//         } catch (error) {
//            return (error => console.log("Error    --->", error))
//         }
//     }
// }
export function searchBar(name) {
    return async function(dispatch) {
        try {
            var response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            console.log(response)
            return dispatch({type: SEARCH_DOG, payload: response.data});

        } catch (error) {
            return alert('Dog not Found!');
        }
    }
}

export function getTemperaments(){
   return async function(dispatch) {
    try{
    const r = await axios("http://localhost:3001/temperament")
    const res = r.data
    return dispatch({ type:GET_TEMPERAMENTS, payload: res})
   } catch (error) {
    return (error => console.log("Error    --->", error))
   }
   }
}

export function createDog(dog){
    return {
        type: CREATE_DOG,
        payload: dog,
    }
}

export function filter(array) {
    return {
        type: FILTERBYTEMPS,
        payload: array
    }
}
export function filterBy(value) {
    
    if (value === "DB") {
      return {
        type: "DB",
      };
    } else if (value === "API") {
      return {
        type: "API",
      };
    } else if (value === "ALL") {
      return {
        type: "ALL",
      };
    }
}
export function getHeaviest() {
    return function (dispatch) {
        return axios.get('http://localhost:3001/dogs')
            .then(dog => {
                const orderHeaviest = dog.data.sort((b, a) => {
                    if (typeof dog.data.id === 'string') {
                        if (a.weight > b.weight) return 1
                        if (a.weight < b.weight) return -1
                        return 0
                    } else {
                        if (parseInt(a.weight.metric) > parseInt(b.weight.metric)) return 1
                        if (parseInt(a.weight.metric) < parseInt(b.weight.metric)) return -1
                        return 0
                    }
                })
                dispatch({
                    type: ORDERBYTHEHEAVY,
                    payload: orderHeaviest
                })
            })
    }
}

export function getLightiest() {
    return function (dispatch) {
        return axios.get('http://localhost:3001/dogs')
            .then(dog => {
                const orderLightiest = dog.data.sort((a, b) => {
                    if (typeof dog.data.id === 'string') {
                        if (a.weight > b.weight) return 1
                        if (a.weight < b.weight) return -1
                        return 0
                    } else {
                        if (parseInt(a.weight.metric) > parseInt(b.weight.metric)) return 1
                        if (parseInt(a.weight.metric) < parseInt(b.weight.metric)) return -1
                        return 0
                    }
                })
                dispatch({
                    type: ORDERBYTHELIGHT,
                    payload: orderLightiest
                })
            })
    }
}