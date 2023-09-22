import axios from './customizeAxios'
// import axios from 'axios';

const apiGetMostEnrolledCourse = () => {
    return axios.get('/enrollment/most-enrolled').then(res => res.data);
}

const apiEnrollCourse = (id) => {
    try {
        return axios.post(`/enrollment/enroll/${id}`);
    } catch (e) {
        throw e;
    }
}

const apiUnenrollCourse = (id) => {
    try {
        return axios.delete(`/enrollment/unenroll/${id}`)
    } catch (e) {
        throw e;
    }
}

const apiGetEnrolledCourse = () => {
    return axios.get(`/enrollment/courses`)
}

export { apiGetMostEnrolledCourse, apiEnrollCourse, apiUnenrollCourse, apiGetEnrolledCourse };