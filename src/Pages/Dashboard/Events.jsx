import React from 'react'
import EventManagementTable from '../../Components/Events/EventManagementTable'
import PageHeading from '../../Components/Shared/PageHeading'
import Search from '../../Components/Shared/Search'

const Events = () => {
    return (
        <>
            <div className='between-center gap-2'>
                <PageHeading text={`Event Management`} />
                <Search />
            </div>
            <div className='bg-[var(--color-white)] rounded-md p-2 mt-3'>
                <EventManagementTable />
            </div>
        </>
    )
}

export default Events
