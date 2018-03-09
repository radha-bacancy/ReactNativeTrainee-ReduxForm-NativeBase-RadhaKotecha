import React from 'react';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

const user = ( state = [], action ) => {
    switch(action.type) {
        case 'ADD_USER_DETAIL':
            return {
                FirstName: action.FirstName,
                LastName: action.LastName,
                Address: action.Address,
                Gender: action.Gender,
                Age: action.Age,
                City: action.City,
            };
        case 'ADD_PROFILE_PICTURE':
            return {
                ...state,
                ProfilePic: action.ProfilePic,
            };
        case 'ADD_LOGIN_CREDENTIALS':
            return {
                ...state,
                Email: action.Email,
                Password: action.Password,
            };
        default:
            return state;
    }
};


const reducers = combineReducers({
    user: user,
    form: formReducer
});

export default reducers