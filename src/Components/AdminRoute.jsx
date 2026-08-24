import { Navigate } from 'react-router-dom'

// Gate de admin (solo cliente: NO es seguridad real, la app no tiene backend).
const AdminRoute = ({ children }) => {
  const authed = window.sessionStorage.getItem('admin_auth') === 'true'
  return authed ? children : <Navigate to='/admin/login' replace />
}

export default AdminRoute
