import { useQuery } from '@tanstack/react-query'
import { apiGetMostEnrolledCourse } from '../../services/EnrollServices'


export const useMostEnrolledData = () => {
    return useQuery({
        queryKey: ['trending'],
        queryFn: apiGetMostEnrolledCourse,
        staleTime: 30000,
    });
}