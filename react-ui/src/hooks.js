import { useState, useEffect } from 'react';
import axios from './axios';

export function useStatefulFields() {
    const [values, setValues] = useState({});

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };
    return [values, handleChange];
}

export function useAuthSubmit(url, values) {
    const [error, setError] = useState('');

    const submit = async () => {
        try {
            let { data } = await axios.post(url, values);
            if (data.pwError) {
                setError("Passwortlänge mindestens 8 Zeichen!");
            } else if (data.error) {
                setError("Etwas ist schiefgelaufen, bitte versuchen Sie es nochmal!");
            } else {
                window.location.href = "/";
            }
        } catch(err) {
            console.log("err in submit", err);
        }
    };
    return [submit, error];
}


export function useEnter(submit) {
    let test = function(e){
        if (e.keyCode === 13) {
            submit();
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', test);
        return () => {
            window.removeEventListener('keydown', test);
        };
    });
}
