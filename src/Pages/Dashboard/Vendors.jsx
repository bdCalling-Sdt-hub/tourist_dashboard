import React, { useState } from 'react'
import PageHeading from '../../Components/Shared/PageHeading'
import Search from '../../Components/Shared/Search'
import VendorsTable from '../../Components/VendorRequest/VendorsTable'
import { useGetVendorsQuery } from '../../Redux/Apis/vendorApis'

const Vendors = () => {
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const { data, isLoading, isFetching } = useGetVendorsQuery({ page, searchTerm })
    const searchHandler = (value) => {
        setSearchTerm(value)
    }
    return (
        <>
            <div className='between-center gap-2'>
                <PageHeading text={`Vendors Management`} />
                <Search handler={searchHandler} />
            </div>
            <div className='bg-[var(--color-white)] rounded-md p-2 mt-3'>
                <VendorsTable loading={(isLoading || isFetching) && true} setPage={setPage} meta={data?.data?.meta} data={data?.data?.result || []} />
            </div>
        </>
    )
}

export default Vendors
