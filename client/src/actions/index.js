import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
    return async function(dispatch){
        let res = await axios.get('/api/current_user');
        dispatch({type: FETCH_USER, payload: res });
    }
}

