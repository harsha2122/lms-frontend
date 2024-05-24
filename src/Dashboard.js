import React from 'react'
import { useAuth } from './Auth/auth'
import Admin_Dashboard from './components/Admin/AdminDashboard/Admin_Dashboard'
import UserDashboard from './components/User/UserDashboard'

const Dashboard = () =>{

    const auth = useAuth()
    
    return(
        <div>
            {(auth.user==="Admin" || auth.user==="Educator")?
                (<Admin_Dashboard />):
                (<UserDashboard /> )
            }
        </div>
    )
}

export default Dashboard