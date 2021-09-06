export const Types = {
    setUserLoggedIn : "SET_USER_LOGGED_IN",
    setUser : "SET_USER",
    setTranactions : "SET_USER_TRANSACTIONS",
    setMatches : "SET_UPCOMING_MATCHES"
}

export const AppActions = {
        setUserLogged : (data) => ({ type : Types.setUserLoggedIn, payload : {data} }),
        setUser : (data) => ({ type : Types.setUser, payload : data }),
        setTranactions : (data) => ({ type : Types.setTranactions, payload : data })
    }