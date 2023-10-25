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

export const fetchPositionStart = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            dispatch( { type: actionTypes.FETCH_POSITION_START } );
            let res = await getAllcodeService( "POSITION" );
            if ( res && res.errCode === 0 )
            {
                dispatch( fetchPositionSuccess( res.data ) );
            }
            else
            {
                dispatch( fetchPositionFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchPositionFailed() );
            console.log( err );
        }
    }
}


export const fetchPositionSuccess = ( positionData ) => ( {
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
} )

export const fetchPositionFailed = () => ( {
    type: actionTypes.FETCH_POSITION_FAILED
} )

export const fetchRoleStart = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            dispatch( { type: actionTypes.FETCH_ROLE_START } );
            let res = await getAllcodeService( "ROLE" );
            if ( res && res.errCode === 0 )
            {
                dispatch( fetchRoleSuccess( res.data ) );
            }
            else
            {
                dispatch( fetchRoleFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchRoleFailed() );
            console.log( err );
        }
    }
}


export const fetchRoleSuccess = ( RoleData ) => ( {
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData
} )

export const fetchRoleFailed = () => ( {
    type: actionTypes.FETCH_ROLE_FAILED
} )

