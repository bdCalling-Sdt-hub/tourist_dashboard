import { Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { CategoryFields } from '../../Utils/FormFields/Category'
import ImageUpload from '../Shared/ImageUpload'
import { RxCross2 } from 'react-icons/rx'
import { TbCopyCheckFilled } from 'react-icons/tb'
import { BannerFields } from '../../Utils/FormFields/Banner'
import toast from 'react-hot-toast'
import { makeFormData } from '../../Utils/makeFormData'
import { useAddCategoryMutation, useUpdateCategoryMutation } from '../../Redux/Apis/categoryApi'
import Loading from '../Shared/Loading'
import { useAddBannerMutation, useUpdateBannerMutation } from '../../Redux/Apis/bannerApi'

const Category_Banner_Form = ({ formFor, action, data, close_modal, Files, setFiles }) => {
    //states
    const [FormFields, setFormFields] = useState([])
    const [form] = Form.useForm()
    //rtk query
    const [addCategory, { isLoading }] = useAddCategoryMutation()
    const [updateCategory, { isLoading: updateLoading }] = useUpdateCategoryMutation()
    const [addBanner, { isLoading: bannerLoading }] = useAddBannerMutation()
    const [updateBanner, { isLoading: updateBannerLoading }] = useUpdateBannerMutation()
    //handler
    const onFinish = value => {
        if (formFor === 'category') {
            const formateData = {
                name: value?.name,
            }
            if (Files.length > 0) {
                formateData.img = Files[0]
            }
            const formData = makeFormData(formateData)
            if (action === 'update') {
                updateCategory({ id: data?._id, data: formData }).unwrap().then((res) => {
                    if (res.success) {
                        toast.success(res.message || 'Category Updated Successfully')
                        form.resetFields()
                        setFiles([])
                        close_modal(false)
                    } else {
                        toast.error('something went wrong')
                    }
                }).catch((err) => toast.error(err.data?.message || 'something went wrong'))
            } else {
                if (Files.length <= 0) {
                    toast.error('Please select a Category image')
                }
                addCategory(formData).unwrap().then((res) => {
                    if (res.success) {
                        toast.success(res.message || 'Category Added Successfully')
                        form.resetFields()
                        setFiles([])
                        close_modal(false)
                    } else {
                        toast.error('something went wrong')
                    }
                }).catch((err) => toast.error(err.data?.message || 'something went wrong'))
            }
        } else {
            if (Files.length <= 0) {
                return
            }
            if (action === 'update') {
                const FormateData = {
                    img: Files[0]
                }
                // console.log(data)
                // return
                const FormData = makeFormData(FormateData)
                updateBanner({ id: data?._id, data: FormData }).unwrap().then((res) => {
                    if (res.success) {
                        toast.success(res.message || 'Banner Updated Successfully')
                        setFiles([])
                        close_modal(false)
                    } else {
                        toast.error('something went wrong')
                    }
                }).catch((err) => toast.error(err.data?.message || 'something went wrong'))
            } else {
                const FormateData = {
                    img: Files[0]
                }
                const FormData = makeFormData(FormateData)
                addBanner(FormData).unwrap().then((res) => {
                    if (res.success) {
                        toast.success(res.message || 'Banner Added Successfully')
                        setFiles([])
                        close_modal(false)
                    } else {
                        toast.error('something went wrong')
                    }
                })
            }
        }
    }
    // effects 
    useEffect(() => {
        if (!data) return form.setFieldsValue({})
        form.setFieldsValue(data)
    }, [data])
    useEffect(() => {
        if (formFor === 'category') {
            setFormFields(CategoryFields)
        } else {
            setFormFields(BannerFields)
        }
    }, [formFor])
    return (
        <div className='max-w-[600px]'>
            {
                (isLoading || updateLoading || bannerLoading || updateBannerLoading) && <Loading />
            }
            <p className='heading text-center my-2 capitalize'>{action} {formFor === 'category' ? 'Category' : 'Banner'} </p>
            <Form
                onFinish={onFinish}
                form={form}
                layout='vertical'
            >
                {
                    FormFields?.map(item => <Form.Item key={item?.name}
                        name={item?.name}
                        label={<p>{item?.label}</p>}
                        rules={[
                            {
                                message: item?.message,
                                required: item?.required
                            }
                        ]}
                    >
                        {
                            item?.type === 'file' ? <ImageUpload key={action} action={action} accept={item?.accept || 'image'} image={data?.img} Files={Files} setFiles={setFiles} multiple={false} /> : <Input placeholder={item?.placeholder} />
                        }
                    </Form.Item>)
                }
                <div className='center-center gap-6'>
                    <button className='button-black' type='submit'>
                        <TbCopyCheckFilled size={24} />  Save
                    </button>
                    <button onClick={() => {
                        close_modal(false)
                        form.resetFields()
                    }} className='button-red' type='button'>
                        <RxCross2 size={24} />  Cancel
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default Category_Banner_Form
