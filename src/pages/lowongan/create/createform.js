import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap'
import axios from 'axios';
import {
    Container,
    Stack,
    VStack,
    Flex,
    Box,
    Heading,
    Text,
    Image,
    Avatar,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Link,
    Input,
    InputGroup,
    FormControl,
    FormLabel,
    Textarea,
    InputLeftAddon,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
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
    let navigate = useNavigate()

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
                 'Authorization': `Bearer ${token}`
            }
          })
         .then(response => navigate((`/lowongan`)))
         .catch(error => {
             console.error('There was an error!', error);
             alert("Cannot create job")
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
                        href='/lowongan' 
                        color={'white'}
                        fontWeight={400}>
                        Lowongan Kerja
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

        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} py={50} maxW={'100%'}>
            <Text mb={5} fontSize={20} fontWeight={600}>Buat Lowongan</Text>
            <Form onSubmit={handleSubmit}>
            <FormControl>
            <VStack
                spacing={4}
                align='stretch'
              >
                        <FormLabel>Nama Pekerjaan</FormLabel>
                        <Input 
                        placeholder='e.g Petani'
                        onChange={(e) => setNamaPekerjaan(e.target.value)}
                        />
                        <FormLabel>Lokasi Pekerjaan</FormLabel>
                        <Stack spacing={3}>
                            <Select 
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
                        <FormLabel>Jumlah Lowongan</FormLabel>
                        <NumberInput>
                        <NumberInputField 
                        onChange={(e) => setJmlhLowongan(e.target.value)}/>
                        <NumberInputStepper>
                            <NumberIncrementStepper  
                            onClick={() => setJmlhLowongan(jmlhLowongan + 1)}/>
                            <NumberDecrementStepper 
                            onClick={() => setJmlhLowongan(jmlhLowongan - 1)}/>
                        </NumberInputStepper>
                        </NumberInput>
                        <FormLabel>Upah Pekerjaan</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children='Rp.' />
                            <NumberInput>
                        <NumberInputField 
                        onChange={(e) => setUpah(e.target.value)}/>
                        </NumberInput>
                        </InputGroup>
                        <FormLabel>Deskripsi</FormLabel>
                        <Textarea 
                        placeholder='Masukkan deskripsi pekerjaan' 
                        onChange={(e) => setDeskripsi(e.target.value)}/>
            </VStack>
            <button className="float-end">Buat</button>
            </FormControl>
            </Form>
        </Container>
        </>
    );
}

export default CreateLowongan;