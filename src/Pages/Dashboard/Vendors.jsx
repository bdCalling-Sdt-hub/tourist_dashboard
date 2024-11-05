import React from 'react'
import PageHeading from '../../Components/Shared/PageHeading'
import Search from '../../Components/Shared/Search'
import VendorsTable from '../../Components/VendorRequest.jsxt/VendorsTable'

const Vendors = () => {
    return (
        <>
            <div className='between-center gap-2'>
                <PageHeading text={`Vendors Management`} />
                <Search />
            </div>
            <div className='bg-[var(--color-white)] rounded-md p-2 mt-3'>
                <VendorsTable />
            </div>
        </>
    )
}

export default Vendors
