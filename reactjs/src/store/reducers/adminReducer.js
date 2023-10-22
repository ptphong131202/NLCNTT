import actionTypes from '../actions/actionTypes';

const initialState = {
    isloadingGender: false,
    genders: [],
    roles: [],
    position: []
}

const adminReducer = ( state = initialState, action ) =>
{
    switch ( action.type )
    {
        case actionTypes.FETCH_GENDER_START:
            let copystate = { ...state };
            copystate.isloadingGender = true;
            console.log( "FETCH_GENDER_START", action )
            return {
                ...copystate,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copystate1 = { ...state };
            copystate1.isloadingGender = false;
            copystate1.genders = action.data;
            console.log( "FETCH_GENDER_SUCCESS", copystate1 )

            return {
                ...copystate1,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log( "FETCH_GENDER_FAILED", action )
            let copystate2 = { ...state };
            copystate2.isloadingGender = false;
            copystate1.genders = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;