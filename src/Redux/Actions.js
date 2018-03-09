import store from './Store';

export const _addUserDetails = (values) => {
    store.dispatch({
        type: 'ADD_USER_DETAIL',
        FirstName: values.FirstName,
        LastName: values.LastName,
        Address: values.Address,
        Gender: values.Gender,
        Age: values.Age,
        City: values.City,
    })
};

export const _addProfilePicture = (values) => {
    store.dispatch({
        type: 'ADD_PROFILE_PICTURE',
        ProfilePic: values.ProfilePic,
    })
};

export const _addLoginCredentials = (values) => {
    store.dispatch({
        type: 'ADD_LOGIN_CREDENTIALS',
        Email: values.Email,
        Password: values.Password,
    })
};