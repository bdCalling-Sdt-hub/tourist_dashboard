import React, { useState } from 'react'
import EventManagementTable from '../../Components/Events/EventManagementTable'
import PageHeading from '../../Components/Shared/PageHeading'
import Search from '../../Components/Shared/Search'

const Events = () => {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <>
            <div className='between-center gap-2'>
                <PageHeading text={`Event Management`} />
                <Search handler={(value) => setSearchTerm(value)} />
            </div>
            <div className='bg-[var(--color-white)] rounded-md p-2 mt-3'>
                <EventManagementTable searchTerm={searchTerm} />
            </div>
        </>
    )
}

export default Events
