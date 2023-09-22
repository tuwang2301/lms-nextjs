// import axios from "axios";
import axios from "./customizeAxios";

const apiSchedule = (data) => {
    return axios.post('/timetable/schedule-course', { ...data });
}

const apiUnschedule = ({ course_id, timetable_id }) => {
    return axios.delete('/timetable/delete-schedule', {
        params: {
            course_id,
            timetable_id
        }
    })
}

export { apiSchedule, apiUnschedule }