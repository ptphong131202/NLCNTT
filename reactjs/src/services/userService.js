import axios from '../axios'

// function handle login
const handleLoginApi = ( email, password ) =>
{
    return axios.post( 'api/login', { email, password } ); // request len server
}

const getAllUser = ( id ) =>
{
    return axios.get( `api/get-all-users?id=${ id }` ); // request len server
}

const createNewUserService = ( data ) =>
{
    return axios.post( `api/create-new-user`, data );
}

const deleteUserService = ( userid ) =>
{
    return axios.delete( `api/delete-user`,
        {
            data: { id: userid },
        } );
}

const editUserService = ( inputData ) =>
{
    return axios.put( `api/edit-user`, inputData );
}
const getAllcodeService = ( inputData ) =>
{
    return axios.get( `/api/allcode?type=${ inputData }` );
}

export
{
    handleLoginApi,
    getAllUser,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllcodeService
};