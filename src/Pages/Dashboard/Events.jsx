import React, { useState } from 'react'
import EventManagementTable from '../../Components/Events/EventManagementTable'
import PageHeading from '../../Components/Shared/PageHeading'
import Search from '../../Components/Shared/Search'
import { Modal } from 'antd'
import EventAddEditForm from '../../Components/Events/EventAddEditForm'

const Events = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [open, setOpen] = useState(false)
    const closeModal = () => {
        setOpen(false)
    }
    return (
        <>
            <div className='between-center gap-2'>
                <PageHeading text={`Event Management`} />
                <div className='flex justify-end items-center gap-2'>
                    <button onClick={() => setOpen(true)} className='button-black'>
                        Add Event
                    </button>
                    <div className='-mb-6'>
                        <Search handler={(value) => setSearchTerm(value)} />
                    </div>
                </div>
            </div>
            
            <div className='bg-[var(--color-white)] rounded-md p-2 mt-3'>
                <EventManagementTable searchTerm={searchTerm} />
            </div>

            <Modal
                open={open}
                centered
                onCancel={() => setOpen(false)}
                footer={false}
                width={1000}
            >
                <EventAddEditForm selectedData={null} closeModal={() => closeModal()} />
            </Modal>
        </>
    )
}

export default Events
