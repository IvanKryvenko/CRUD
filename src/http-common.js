import axios from 'axios';

export default axios.create({
    baseURL: 'http://localgost:8080/api',
    headers: {
        "Content-type": "application/json"
    }
});