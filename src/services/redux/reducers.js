import {Types} from './actions'
const initialState = {
    isUserLoggedIn : false,
    user : {},
    transactions :  {},
    matches : {}
};

export default function authReducer(state = initialState, action){
    let newState = state
    switch(action.type){
        case Types.setUserLoggedIn:
            return {...newState, isUserLoggedIn : action.payload.data}
        case Types.setUser:
            return {...newState, user : action.payload}
        case Types.setTranactions:
            return {...newState, transactions: action.payload}
        case Types.setMatches:
                return {...newState, matches: action.payload}
        default: 
            return newState
    }
}