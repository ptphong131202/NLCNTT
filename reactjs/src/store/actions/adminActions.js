import actionTypes from './actionTypes';
import { getAllcodeService } from '../../services/userService';
/* 
export const fetchGenderStart = () => ( {
    type: actionTypes.FETCH_GENDER_START
} ) */


export const fetchGenderStart = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            dispatch( { type: actionTypes.FETCH_GENDER_START } );
            let res = await getAllcodeService( "GENDER" );
            if ( res && res.errCode === 0 )
            {
                dispatch( fetchGenderSuccess( res.data ) );
            }
            else
            {
                dispatch( fetchGenderFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchGenderFailed() );
            console.log( err );
        }
    }
}


export const fetchGenderSuccess = ( genderData ) => ( {
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
} )

export const fetchGenderFailed = () => ( {
    type: actionTypes.FETCH_GENDER_FAILED
} )

