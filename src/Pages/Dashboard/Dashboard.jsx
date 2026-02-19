import React from 'react'
import AdminHeader from '../../Components/AdminHeader/AdminHeader'
import StatsCards from '../../Components/AdminStat/StatsCards'
import AdminWelcome from '../../Components/AdminHeader/AdminWelcome'
import UserTable from '../../Components/AdminStat/UserTable'


const Dashboard = () => {
  return (
    <div>

<AdminHeader />
<AdminWelcome />
<StatsCards />
<UserTable />

    </div>
  )
}

export default Dashboard