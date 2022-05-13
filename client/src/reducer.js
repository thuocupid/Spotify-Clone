export const initialState = {
    user: null,
    playlist: [],
    playing: false,
    item: null,
    token: '',
};

const reducer = (state, action) =>{
    console.log(action);

    //Acyion-> type, [payload]
    
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state, 
                user: action.user
            };
        default:
            return state;
    }
}

export default reducer;