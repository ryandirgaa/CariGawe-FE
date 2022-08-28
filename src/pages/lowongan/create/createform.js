import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Form from 'react-validation/build/form';
import axios from 'axios';
import {
    Container,
    Stack,
    VStack,
    Text,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Input,
    InputGroup,
    FormControl,
    FormLabel,
    Textarea,
    Button,
    InputLeftAddon,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Button,
    Box,
  } from '@chakra-ui/react';

import Sidebar from '../../../component/sidebar';
import ProvinsiData from '../../../dummydata/province.json';
import IndonesiaData from '../../../dummydata/indonesia.json';
import { UserContext } from '../../../services/user-context';
  
const CreateLowongan = (props) => {
    const {currentUser, getFromLocalStorage, token} = useContext(UserContext);
    const [contact, setContact] = React.useState("");
    const [provinsi, setProvinsi] = React.useState("");
    const [kota, setKota] = React.useState("");
    const [namaPekerjaan, setNamaPekerjaan] = React.useState("");
    const [jmlhLowongan, setJmlhLowongan] = React.useState(0);
    const [upah, setUpah] = React.useState(0);    
    const [deskripsi, setDeskripsi] = React.useState("");

    let provinceData = ProvinsiData;
    let cityData = IndonesiaData;
    let navigate = useNavigate();

    const getUser = async(e) => {
        axios.get(`https://carigawe-be.herokuapp.com/api/v1/user/${currentUser}`)
        .then((response)=> 
        { 
        var userContact = response.data.contact;
        setContact(userContact);
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        let data = {
            "description": deskripsi,
            "name": namaPekerjaan,
            "latitude": 0,
            "longitude": 0,
            "location": `${kota}, ${provinsi}`,
            "city": kota,
            "province": provinsi,
            "contact": contact,
            "num_participants": jmlhLowongan,
            "wage": upah,
            "status": "open"
        }
        let formData = new FormData();
        formData.append("item", JSON.stringify(data))

        axios.post('https://carigawe-be.herokuapp.com/api/v1/job', formData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
          })
         .then(response => navigate((`/lowongan`)))
         .catch(error => {
            console.error('There was an error!', error);
            alert("Cannot create job")
            console.log(token)
            });
        }
    
        useEffect(() => {
            getFromLocalStorage()
          }, []);
        
        useEffect(() => {
            currentUser && getUser(currentUser)
        }, [currentUser]);

    
    return (
        <>
        <Sidebar/>
        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} maxW={'100%'} bg={'gray.800'} px={{base: 0, md: 10}} py={{base: 30, md: 35}}>
        <Breadcrumb fontSize={14} fontWeight={'semibold'} separator='/' color={'white'}>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        href='/lowongan/saya' 
                        color={'white'}
                        fontWeight={400}>
                        Lowongan Saya
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink 
                        fontSize={{ base: '16', md: '20' }}
                        color={'white'}
                        href={null}>
                        Buat Lowongan
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </Container>

        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} pt={50} maxW={'100%'}>
            <Box>
                <Text fontSize={24} fontWeight={'semibold'}>Buat Lowongan</Text>
                <Text fontSize={14} fontWeight={'regular'} color={'gray.600'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
            </Box>
        </Container>

        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} py={50} maxW={'100%'}>
            <Stack border={'1px'} borderColor={'gray.300'} p={{base: 15, md: 30}} maxW={'100%'} flex={10} spacing={{ base: 5, md: 8 }}>
                <Form onSubmit={handleSubmit}>
                    <FormControl isRequired>
                        <FormLabel fontSize={14}>Nama Pekerjaan</FormLabel>
                        <Input 
                            fontSize={14}
                            placeholder='e.g Petani'
                            onChange={(e) => setNamaPekerjaan(e.target.value)}/>
                    </FormControl>

                    <FormControl pt={5} isRequired>
                        <FormLabel fontSize={14}>Lokasi Pekerjaan</FormLabel>
                        <Stack spacing={3}>
                            <Select 
                                fontSize={14}
                                placeholder='Pilih Provinsi' 
                                size='md' 
                                onChange={(e) => setProvinsi(e.target.value)}
                                value={provinsi}
                                >
                                {provinceData.map((data) => {
                                    return <option value={data.name}>{data.name}</option>
                                })}
                            </Select>
                            <Select 
                                fontSize={14}
                                placeholder='Pilih Kota' 
                                size='md' 
                                onChange={(e) => setKota(e.target.value)}
                                value={kota}
                                >
                                {cityData.filter((data) => data.admin_name === provinsi).map((data) => {
                                    return <option value={data.city}>{data.city}</option>
                                })}
                            </Select>
                        </Stack>
                    </FormControl>

                    <FormControl pt={5} isRequired>
                        <FormLabel fontSize={14}>Jumlah Lowongan</FormLabel>
                        <NumberInput>
                            <NumberInputField 
                                fontSize={14}
                                onChange={(e) => setJmlhLowongan(e.target.value)}/>
                            <NumberInputStepper>
                                <NumberIncrementStepper  
                                onClick={() => setJmlhLowongan(jmlhLowongan + 1)}/>
                                <NumberDecrementStepper 
                                onClick={() => setJmlhLowongan(jmlhLowongan - 1)}/>
                            </NumberInputStepper>
                        </NumberInput>    
                    </FormControl>

                    <FormControl pt={5} isRequired>
                        <FormLabel fontSize={14}>Upah Pekerjaan</FormLabel>
                        <InputGroup>
                            <InputLeftAddon fontSize={14} children='Rp.' />
                            <NumberInput>
                                <NumberInputField 
                                    borderLeftRadius={0}
                                    width={'100%'}
                                    fontSize={14}
                                    onChange={(e) => setUpah(e.target.value)}/>
                            </NumberInput>
                        </InputGroup>
                    </FormControl>    

                    <FormControl pt={5} isRequired>
                        <FormLabel fontSize={14}>Deskripsi</FormLabel>
                        <Textarea 
                            fontSize={14} 
                            placeholder='Masukkan deskripsi pekerjaan' 
                            onChange={(e) => setDeskripsi(e.target.value)}/>
                    </FormControl>

                    {/* <FormControl pt={5} isRequired>
                        <FormLabel fontSize={14}>Foto Pekerjaan</FormLabel>
                        <Input 
                            borderStyle={'none'}
                            px={0}
                            accept="image/*"
                            type={'file'}
                            fontSize={14}
                            id= 'photo'
                            onChange={(e) => {setImage(e.target.files[0])}}
                            />
                    </FormControl> */}

                    <Box pt={5} align={'center'}>
                        <Button
                            width={'100%'}
                            size={'md'}
                            fontSize={14}
                            colorScheme={'blue.600'}
                            bg={'blue.600'}
                            _hover={{ bg: 'blue.400' }}
                            _active={{ bg: 'blue.400' }}
                            type='submit'>
                            Buat
                        </Button>
                    </Box>
                </Form>
            </Stack>
        </Container>
        </>
    );
}

export default CreateLowongan;