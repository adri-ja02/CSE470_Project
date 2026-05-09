import axios from 'axios';

const API =
'http://localhost:5000/applications';


export const applyInternship = (data) => {

    return axios.post(API, data);
};


export const getApplications = () => {

    return axios.get(API);
};


export const withdrawApplication = (id) => {

    return axios.delete(
        `${API}/${id}`
    );
};


export const getHistory = (email) => {

    return axios.get(
        `${API}/history/${email}`
    );
};