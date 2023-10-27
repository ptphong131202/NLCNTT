import actionTypes from './actionTypes';
import { getAllcodeService, createNewUserService, getAllUser, deleteUserService, editUserService } from '../../services/userService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// gender

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

export const createNewUser = ( data ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await createNewUserService( data );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Create new user success!" );
                dispatch( saveUserSuccess() );
                dispatch( fetchAllUserStart() );
            }
            else
            {
                dispatch( saveUserFailed() );
            }
        }
        catch ( err )
        {
            dispatch( saveUserFailed() );
            console.log( err );
        }
    }
}

export const saveUserSuccess = () => ( {
    type: actionTypes.CREATE_USER_SUCCESS
} )


export const saveUserFailed = () => ( {
    type: actionTypes.CREATE_USER_FAILED
} )

export const fetchAllUserStart = ( data ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await getAllUser( "ALL" );
            if ( res && res.errCode === 0 )
            {
                dispatch( fetchAllUserSuccess( res.users.reverse() ) );
            }
            else
            {
                dispatch( fetchAllUserFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchAllUserFailed() );
            console.log( err );
        }
    }
}

export const fetchAllUserSuccess = ( inputData ) => ( {
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: inputData
} )


export const fetchAllUserFailed = () => ( {
    type: actionTypes.FETCH_ALL_USERS_FAILED
} )

export const deleteUser = ( userid ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await deleteUserService( userid );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Delete user success!" );
                dispatch( deleteUserSuccess() );
                dispatch( fetchAllUserStart() );
            }
            else
            {
                toast.error( "Delete user error!" );
                dispatch( deleteUserFailed() );
            }
        }
        catch ( err )
        {
            toast.error( "Delete user error!" );
            dispatch( deleteUserFailed() );
            console.log( err );
        }
    }
}
export const deleteUserSuccess = () => ( {
    type: actionTypes.DELETE_USER_SUCCESS,
} )


export const deleteUserFailed = () => ( {
    type: actionTypes.DELETE_USER_FAILED
} )




export const editAUser = ( data ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await editUserService( data );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Update user success!" );
                dispatch( updateUserSuccess() );
                dispatch( fetchAllUserStart() );
            }
            else
            {
                toast.error( "Update user error!" );
                dispatch( updateUserFailed() );
            }
        }
        catch ( err )
        {
            toast.error( "Update user error!" );
            dispatch( updateUserFailed() );
            console.log( err );
        }
    }
}
export const updateUserSuccess = () => ( {
    type: actionTypes.EDIT_USER_SUCCESS,
} )


export const updateUserFailed = () => ( {
    type: actionTypes.EDIT_USER_FAILED
} )