import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
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
    Button,
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
  
const CreateLowongan = (props) => {

    const [selectedValue, setSelectedValue] = React.useState("");
    const [selectedValue2, setSelectedValue2] = React.useState("");
    let provinceData = ProvinsiData;
    let cityData = IndonesiaData;

    
    

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
            <VStack
                spacing={4}
                align='stretch'
              >
                    <FormControl>
                        <FormLabel>Nama Pekerjaan</FormLabel>
                        <Input placeholder='e.g Petani'/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Lokasi Pekerjaan</FormLabel>
                        <Stack spacing={3}>
                            <Select placeholder='Pilih Lokasi' size='md' />
                        </Stack>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Jumlah Lowongan</FormLabel>
                        <NumberInput>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Upah Pekerjaan</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children='Rp.' />
                            <Input/>
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Deskripsi</FormLabel>
                        <Textarea placeholder='Masukkan deskripsi pekerjaan' />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Foto</FormLabel>
                        <Input type= 'file' />
                    </FormControl>
            </VStack>
        </Container>
        </>
    );
}

export default CreateLowongan;