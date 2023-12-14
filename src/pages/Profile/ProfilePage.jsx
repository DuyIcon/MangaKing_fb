import React, { useEffect, useState } from "react";
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from "./style";
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService'
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/sildes/userSlides'
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";

const ProfilePage = () => {
    const userdulieu = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, access_token, rests)
        }
    )
    const dispatch = useDispatch()
    const { data, isLoading, isSuccess, isError} = mutation


    useEffect(() => {
        setEmail(userdulieu?.email)
        setName(userdulieu?.name)
        setPhone(userdulieu?.phone)
        setAddress(userdulieu?.address)
    }, [userdulieu])

    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(userdulieu?.id, userdulieu?.access_token)
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }
    // const handleOnchangeAvatar = async (fileList) => {
    //     const file = fileList[0]
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj);
    //     }
    //     setAvatar(file.preview)
    // }

    // const handleOnchangeAvatar = async (fileList) => {
    //     if (fileList.fileList.length > 0) { // Check if fileList is not empty
    //         const file = fileList.fileList[0];
    //         if (!file.url && !file.preview) {
    //             file.preview = await getBase64(file.originFileObj);
    //         }
    //         setAvatar(file.preview);
    //     }
    // }
    // const handleFileRead = async (event) => {
    //     const file = event.target.files[0]
    //     const base64 = await this.getBase64(file)
    //     console.log(base64)
    // }

    const handleUpdate = () => {
        mutation.mutate({ id: userdulieu?.id ,email, name, phone, address, access_token: userdulieu?.access_token })

    }
    return (
        <div style={{ width: '1270px', margin: '0 auto', height: '500px'}}>
            <WrapperHeader>INFORMATION</WrapperHeader>
            <Loading isLoading={isLoading}>
            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLabel htmlFor="name">Name</WrapperLabel>
                    <InputForm style={{width: '300px'}} id="name" value={name} onChange={handleOnchangeName}/>
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}

                        styleButton={{border: 'none',
                            width: 'fit-content',
                            height: '30px',
                            borderRadius: '4px',
                            padding: '2px 6px 6px'
                        }}
                        textButton="Update"
                        styleTextButton={{color: 'rgb(26, 148, 255)', fontSize:'15px', fontWeight:'600', fontFamily:'Oswald'}}
                    >
                    </ButtonComponent>
                </WrapperInput>


                <WrapperInput>
                    <WrapperLabel htmlFor="email">Email</WrapperLabel>
                    <InputForm style={{width: '300px'}} id="email" value={email} onChange={handleOnchangeEmail}/>
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}

                        styleButton={{border: 'none',
                            width: 'fit-content',
                            height: '30px',
                            borderRadius: '4px',
                            padding: '2px 6px 6px'
                        }}
                        textButton="Update"
                        styleTextButton={{color: 'rgb(26, 148, 255)', fontSize:'15px', fontWeight:'600', fontFamily:'Oswald'}}
                    >
                    </ButtonComponent>
                </WrapperInput>


                <WrapperInput>
                    <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                    <InputForm style={{width: '300px'}} id="phone" value={phone} onChange={handleOnchangePhone}/>
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}

                        styleButton={{border: 'none',
                            width: 'fit-content',
                            height: '30px',
                            borderRadius: '4px',
                            padding: '2px 6px 6px'
                        }}
                        textButton="Update"
                        styleTextButton={{color: 'rgb(26, 148, 255)', fontSize:'15px', fontWeight:'600', fontFamily:'Oswald'}}
                    >
                    </ButtonComponent>
                </WrapperInput>


                <WrapperInput>
                    <WrapperLabel htmlFor="Address">Address</WrapperLabel>
                    <InputForm style={{width: '300px'}} id="address" value={address} onChange={handleOnchangeAddress}/>
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}

                        styleButton={{border: 'none',
                            width: 'fit-content',
                            height: '30px',
                            borderRadius: '4px',
                            padding: '2px 6px 6px'
                        }}
                        textButton="Update"
                        styleTextButton={{color: 'rgb(26, 148, 255)', fontSize:'15px', fontWeight:'600', fontFamily:'Oswald'}}
                    >
                    </ButtonComponent>
                </WrapperInput>


                {/* <WrapperInput>
                    <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
                    <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1} beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </WrapperUploadFile>
                    {avatar && (
                            <img src={avatar} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt="avatar"/>
                    )}

                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{border: 'none',
                            width: 'fit-content',
                            height: '30px',
                            borderRadius: '4px',
                            padding: '2px 6px 6px'
                        }}
                        textButton="Update"
                        styleTextButton={{color: 'rgb(26, 148, 255)', fontSize:'15px', fontWeight:'600', fontFamily:'Oswald'}}
                    >
                    </ButtonComponent>
                </WrapperInput> */}
            </WrapperContentProfile>
            </Loading>
        </div>
    )
}

export default ProfilePage
