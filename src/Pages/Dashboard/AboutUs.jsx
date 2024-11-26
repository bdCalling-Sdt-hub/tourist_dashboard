import React, { useEffect, useState } from 'react'
import PageHeading from '../../Components/Shared/PageHeading'
import Editor from '../../Components/Shared/Editor';
import Button from '../../Components/Shared/Button';
import Loading from '../../Components/Shared/Loading';
import toast from 'react-hot-toast';
import { useAddAboutUsMutation, useGetAboutUsQuery } from '../../Redux/Apis/settingApi';
import { Spin } from 'antd';


const AboutUs = () => {
    //states 
    const [content, setContent] = useState('');
    // rtk query
    const [addAbout, { isLoading }] = useAddAboutUsMutation();
    const { data, isLoading: LoadingData, isError, error, isFetching } = useGetAboutUsQuery()
    // handler 
    const AddPrivacyHandler = () => {
        const data = {
            description: content
        }
        addAbout(data).unwrap().then((res) => toast.success(res?.message || 'Privacy policy added successfully')).catch((err) => toast.error(err?.data?.message || 'something went wrong'))
    }
    useEffect(() => {
        if (data) setContent(data?.data?.description)
    }, [data])
    return (
        <div className='bg-[var(--bg-gray-20)] p-4 rounded-md'>
            {(isLoading || LoadingData) && <Loading />}
            <PageHeading text={`About Us`} />
            <div className='mt-10'>
                <Editor content={content} setContent={setContent} />
            </div>
            <Button handler={() => AddPrivacyHandler()} text={(isLoading || LoadingData) ? <Spin /> : 'Save Changes'} classNames={`button-black mx-auto mt-6`} />
        </div>
    )
}

export default AboutUs
