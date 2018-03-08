let pwd = '';

export const required = value => value ? undefined : 'Required Field';

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
            'Invalid email address' : undefined;

export const password = value => {
    pwd = value;
    return(
        value && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[a-zA-Z0-9]{8,}$/i.test(value)?
        'Invalid Password' :undefined
    )
};

export const confirmPassword = value =>
    value !== pwd ? 'Password do not match' : undefined;