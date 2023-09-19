import { useQuery } from '@tanstack/react-query'
import { apiGetUserProfile } from '../../services/UserServices'

export const useProfileData = ({ auth }) => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: () => apiGetUserProfile(auth?.userId),
        enabled: !!auth,
    })
}