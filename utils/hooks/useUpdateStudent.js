import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { apiUpdateStudent } from '../../services/StudentServices'
import { message } from 'antd';


export const useUpdateStudent = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(["update-student"], {
        mutationFn: ({ id, studentChange }) => apiUpdateStudent({ id, studentChange }),
        onSuccess: () => { queryClient.invalidateQueries('profile'); onSuccess() },
        onError: (e) => { message.error(e.message) }
    });
}