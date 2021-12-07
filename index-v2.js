
const preloadedState={
    producto:{},
    productos:[]
};

const reducer =(state,action) => {
    if(action.type == "producto-agregado"){
        return {
            ...state,
            productos:[
                ...state.productos,
                action.payload
            ]
        };
    }

    return state;
};

const store=Redux.createStore(reducer, preloadedState);

let latestState;

store.subscribe(() => {

    let currentState=store.getState();
    if(currentState!=latestState){
        latestState=currentState;
        console.log("subscribe ejecutado", store.getState());
    }
    

})



store.dispatch({
    type:"producto-agregado",
    payload: {
        id: 1,
        nombre: "prueba A"
    }
})

store.dispatch({
    type:"producto-modificado",
    payload: {
        id: 2,
        nombre: "prueba V2"
    }
})
store.dispatch({
    type:"producto-agregado",
    payload: {
        id: 2,
        nombre: "prueba B"
    }
})
//console.log(store);