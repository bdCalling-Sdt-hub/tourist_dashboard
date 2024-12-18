import { Suspense } from 'react'
import { FaCircleUser } from 'react-icons/fa6'
import { GrMoney } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { useGetDashboardDataQuery } from '../../Redux/Apis/dashboardApi'
import Loading from '../../Components/Shared/Loading'
import IncomeCard from '../../Components/Dashboard/IncomeCard'
import EventOverView from '../../Components/Dashboard/EventOverView'
import { MdEvent } from 'react-icons/md'
import { CiUser } from 'react-icons/ci'
import TopEvent from '../../Components/Dashboard/TopEvent'
import VendorRequest from '../../Components/Dashboard/VendorRequest'
import ClickOverview from '../../Components/Dashboard/ClickOverview'
const DashboardHome = () => {
    const { data: overview, isLoading } = useGetDashboardDataQuery()
    const data = undefined
    const { pending, accepted, rejected, completed } = data?.data?.total_appointment || {}
    const formatData = [
        // {
        //     name: 'Total Subscriber',
        //     icon: <GrMoney size={36} />,
        //     total: `$${data?.data?.total_deduction.toFixed(2) || 0}`
        // },
        {
            name: 'Total Event',
            icon: <MdEvent size={36} />,
            total: overview?.data?.totalEvent || 0
        },
        // {
        //     name: 'Total Users',
        //     icon: <CiUser size={36} />,
        //     total: data?.data?.total_user || 0
        // },
        {
            name: 'Total Vendor',
            icon: <FaCircleUser size={36} />,
            total: overview?.data?.totalUser || 0
        },
    ]
    return (
        <div className='bg-[var(--color-white-200)] p-4 rounded-md'>
            {
                isLoading && <Loading />
            }
            <div className='grid-2 gap-3'>
                {
                    formatData?.map((item, i) => <div key={i} className='w-full h-full card-shadow rounded-md p-4 py-6 bg-[var(--color-white)]'>
                        <IncomeCard item={item} />
                    </div>)
                }
            </div>
            <div className='grid-2 gap-3 mt-5'>
                <Suspense fallback={''}>
                    <EventOverView data={overview?.data?.eventOverview} yearlyGrowth={overview?.data?.yearlyGrowth} monthlyGrowth={overview?.data?.monthlyGrowth} dailyGrowth={overview?.data?.dailyGrowth} />
                </Suspense>
                <Suspense fallback={''}>
                    <TopEvent />
                </Suspense>
            </div>
            <div className='grid-2 gap-3 mt-5'>
                <Suspense fallback={''}>
                    <div className={`col-span-2`} >
                        <ClickOverview />
                    </div>
                </Suspense>
            </div>
            <div className='bg-[var(--bg-white)] p-4 rounded-md mt-5'>
                <div className='between-center mb-3'>
                    <p className='heading'>Vendor Request</p>
                    <Link className='text-[var(--color-blue)]' to={`/vendor-request`}>
                        View all
                    </Link>
                </div>
                <Suspense fallback={''}>
                    <VendorRequest />
                </Suspense>
            </div>
        </div>
    )
}

export default DashboardHome
