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

        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} pt={50} pb={25} maxW={'100%'}>
            <Box>
                <Text fontSize={24} fontWeight={'semibold'}>Buat Lowongan</Text>
                <Text fontSize={14} fontWeight={'regular'} color={'gray.600'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
            </Box>
        </Container>

        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} pb={50} pt={25} maxW={'100%'}>
            <VStack 
                border={'1px'} borderColor={'gray.300'} p={{base: 15, md: 30}} maxW={'100%'} flex={10} spacing={{ base: 5, md: 8 }}
                align='stretch'
              >
                    <FormControl pt={5} isRequired>
                        <FormLabel fontSize={14}>Nama Pekerjaan</FormLabel>
                        <Input fontSize={14} placeholder='e.g Petani'/>
                    </FormControl>

                    <FormControl pt={5} isRequired>
                        <FormLabel fontSize={14}>Lokasi Pekerjaan</FormLabel>
                        <Stack spacing={3}>
                            <Select fontSize={14} placeholder='Pilih Lokasi' size='md' />
                        </Stack>
                    </FormControl>

                    <FormControl pt={5} isRequired>
                        <FormLabel fontSize={14}>Jumlah Lowongan</FormLabel>
                        <NumberInput fontSize={14}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                        </NumberInput>
                    </FormControl>

                    <FormControl pt={5} isRequired>
                        <FormLabel fontSize={14}>Upah Pekerjaan</FormLabel>
                        <InputGroup>
                            <InputLeftAddon fontSize={14} children='Rp.' />
                            <Input fontSize={14}/>
                        </InputGroup>
                    </FormControl>

                    <FormControl pt={5} isRequired>
                        <FormLabel fontSize={14}l>Deskripsi</FormLabel>
                        <Textarea fontSize={14} placeholder='Masukkan deskripsi pekerjaan' />
                    </FormControl>

                    <FormControl pt={5} isRequired>
                        <FormLabel fontSize={14}>Foto</FormLabel>
                        <Input borderStyle={'none'} px={0} fontSize={14} type= 'file' />
                    </FormControl>
            </VStack>
        </Container>
        </>
    );
}

export default CreateLowongan;