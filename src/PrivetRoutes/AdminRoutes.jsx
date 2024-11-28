
import { useGetProfileQuery } from '../Redux/Apis/authApi'
import Loading from '../Components/Shared/Loading'
import { Navigate, useLocation } from 'react-router-dom'

const AdminRoutes = ({ children }) => {
    const location = useLocation()
    if (!localStorage.getItem('token')) return <Navigate to={`/login`} state={location.pathname} ></Navigate>
    const { data, isLoading, isError, error, isFetching } = useGetProfileQuery()
    if (isLoading || isFetching) return <Loading />
    if (isError) {
        // toast.dismiss()
        // toast.error(error?.data?.message || 'something went wrong please login Again')
        return <Navigate to={`/login`} state={location.pathname} ></Navigate>
    }
    if (!data?.data) {
        // toast.dismiss()
        // toast.error('you are not authorized to access this page')
        // localStorage.removeItem('token')
        return <Navigate to={`/login`} state={location.pathname} ></Navigate>
    }
    return children
}

export default AdminRoutes
