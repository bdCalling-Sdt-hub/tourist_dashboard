import React from 'react'
import UserTable from '../../Components/User/UserTable'
import PageHeading from '../../Components/Shared/PageHeading'
import Search from '../../Components/Shared/Search'

const Users = () => {
    return (
        <>
            <div className='between-center gap-2'>
                <PageHeading text={`User Management`} />
                <Search />
            </div>
            <div className='bg-[var(--color-white)] rounded-md p-2 mt-3'>
                <UserTable />
            </div>
        </>
    )
}

export default Users
