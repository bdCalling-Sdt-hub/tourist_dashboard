import React from 'react'
import RequestTable from '../../Components/VendorRequest.jsxt/RequestTable'
import PageHeading from '../../Components/Shared/PageHeading'

const VendorRequest = () => {
    return (
        <div>
            <PageHeading text={`Vendor Request`} />
            <div className='bg-[var(--color-white)] rounded-md p-2 mt-3'>
                <RequestTable />
            </div>
        </div>
    )
}

export default VendorRequest
