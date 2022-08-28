import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import {
    Container,
    Stack,
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
    Badge
  } from '@chakra-ui/react';

import LowonganData from '../../../dummydata/lowongan.json';
import Sidebar from '../../../component/sidebar';
import { UserContext } from '../../../services/user-context';
import APIConfig from '../../../api';

function publishDay(string){
    return new Date(string).getDate();
}
  
const KegiatanDetail = (props) => {
    let navigate = useNavigate()
    const {currentUser, token, getFromLocalStorage} = useContext(UserContext);
    let d = new Date().getDate();
    const { kode } = useParams();
    const [job, setJob] = useState([]);
    const [allJobs, setAllJobs] = useState([]);
    const [data, setData] =  React.useState([]);

    const getUser = async(x) => {
        const response = await APIConfig.get(`api/v1/user/${x}`);
        const result = await response.data.application;
        for (let i = 0; i < result.length; i++){
            let job = await APIConfig.get(`api/v1/job/${result[i].job_id}`);
            result[i].title = job.data.name
            result[i].employer = job.data.creator
            result[i].city = job.data.city
            result[i].province = job.data.province
            result[i].image = job.data.image
        }
        console.log(result);
        setData(result)
    };

    const showBadge = (status) => {
        if (status === 'requested'){
            return <Badge mb={5} fontSize={12} colorScheme={'yellow'}>
                Lamaran Dikirim
            </Badge>
        }
        else if (status === 'accepted'){
            return <Badge mb={5} fontSize={12} colorScheme={'green'}>
                Diterima
            </Badge>
        }
        else if (status === 'completed'){
            return <Badge mb={5} fontSize={12} colorScheme={'blue'}>
                Selesai
            </Badge>
        }
        else if (status === 'rejected'){
            return <Badge mb={5} fontSize={12} colorScheme={'red'}>
                Ditolak
            </Badge>
        }
    }

    const getJob = () =>{
        axios.get(`https://carigawe-be.herokuapp.com/api/v1/job/${kode}`)
        .then((response)=> 
        { 
        var jobResponse = response.data;
        setJob(jobResponse);
        })
    }

    const getJobs = () =>{
        axios.get('https://carigawe-be.herokuapp.com/api/v1/job')
        .then((response)=> 
        { 
        var jobList = response.data;
        if (jobList){
            for (let i = 0; i < jobList.length; i++) {
                if(jobList[i].id.toString() === kode){
                    jobList.splice(i, 1);
                } 
            }
        }
        setAllJobs(jobList.slice(0, 3));
        })
    }

    useEffect(() => {
        getFromLocalStorage()
      }, []);

    useEffect(() => {
        console.log("current user", currentUser)
        currentUser && getUser(currentUser)
    }, [currentUser]);

    useEffect(() => {
        getJob();
        getJobs();
      }, []);

    var jobData = job;
    console.log(allJobs);

    return (
        <>
        <Sidebar/>
        {
        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} maxW={'100%'} bg={'gray.800'} px={{base: 0, md: 10}} py={{base: 30, md: 35}}>
            <Breadcrumb fontSize={14} fontWeight={'semibold'} separator='/' color={'white'}>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        href='/kegiatan' 
                        color={'white'}
                        fontWeight={400}>
                        Kegiatan Saya
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink 
                        fontSize={{ base: '16', md: '20' }}
                        color={'white'}
                        href={null}>
                        {jobData.name}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </Container>
        }

        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} py={50} maxW={'100%'}>
            <Stack
                alignItems={'start'}
                justifyContent={'left'}
                spacing={{base: 5, lg: 10}}
                direction={{ base: 'column', lg: 'row' }}>
                {
                <Stack border={'1px'} borderColor={'gray.300'} p={{base: 15, md: 30}} maxW={{base: '100%', md: '3xl'}} flex={10} spacing={{ base: 5, md: 8 }}>
                    <Box border={2} borderColor={'green.700'}>
                        <Stack pb={10} direction={{base: 'column', lg: 'row'}} spacing={4}>
                            <Image 
                                src={jobData.image!= null ? 
                                jobData.image 
                                : 
                                "https://media.suara.com/pictures/970x544/2019/01/03/72780-susu-sapi.jpg"} 
                                width={{base: '50vw', lg: '22.5vw'}}
                            />
                            <Stack direction={'column'} spacing={0} pl={{base: 0, lg: 3}} fontSize={'sm'}>
                                <Text fontSize={20} fontWeight={600}>{jobData.name}</Text>
                                <Text>{jobData.creator}</Text>
                                <Text color={'gray.600'}>{jobData.city}, {jobData.province}</Text>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Box py={25}>
                                <Text pb={25} fontSize={20} fontWeight={600}>Deskripsi</Text>
                                <Text fontSize={14}>{jobData.description}</Text>
                            </Box>
                            <Box py={25}>
                                <Text pb={25} fontSize={20} fontWeight={600}>Upah</Text>
                                <Text fontSize={14}>{jobData.wage}</Text>
                            </Box>
                            <Box py={25}>
                                <Text pb={25} fontSize={20} fontWeight={600}>Kontak</Text>
                                <Stack direction={{base: 'column', lg: 'row'}} spacing={4}>
                                    <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                        <Text fontSize={16} fontWeight={600}>{jobData.creator}</Text>
                                        <Text color={'gray.600'}>{jobData.contact}</Text>
                                    </Stack>
                                </Stack>
                            </Box>
                            
                        </Stack>
                    </Box> 
                </Stack>
                }
                <Flex
                    border={'1px'} 
                    borderColor={'gray.300'}
                    p={{base: 15, md: 30}}
                    maxW={{base: '100%', md: 'xs'}}
                    flex={1}
                    flexDirection={'column'}
                    position={'relative'}>
                    <Text pb={25} fontSize={20} fontWeight={600}>Kegiatan Lainnya</Text>
                    {data.slice(0, 3).map((data) => (
                        <Link 
                            href={`/kegiatan/${data.job_id}`}>
                            <Box boxShadow='md' borderRadius={10} p={15} my={2}>
                                <Box py={2}>
                                    {showBadge(data.status)}
                                    <Text fontSize={16} fontWeight={'semibold'}>{data.title}</Text>
                                    <Text fontSize={12} fontWeight={'regular'}>{data.employer}</Text>
                                    <Text color={'gray.600'} fontSize={12} fontWeight={'regular'}>{data.city}, {data.province}</Text>
                                </Box>
                            </Box>
                        </Link>
                    ))}
                    <Link 
                        pt={25}
                        fontSize={14}
                        href='/kegiatanku' 
                        color={'blue.600'}
                        textAlign={'center'}>
                        Lihat semua
                    </Link>
                    
                </Flex>
            </Stack>
        </Container>
        </>
    );
}

export default KegiatanDetail;