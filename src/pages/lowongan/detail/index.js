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
    Button
  } from '@chakra-ui/react';

import LowonganData from '../../../dummydata/lowongan.json';
import Sidebar from '../../../component/sidebar';
import { UserContext } from '../../../services/user-context';
import APIConfig from '../../../api';

function publishDay(string){
    return new Date(string).getDate();
}
  
const LowonganDetail = (props) => {
    let navigate = useNavigate()
    const {currentUser, token, getFromLocalStorage} = useContext(UserContext);
    let d = new Date().getDate();
    const { kode } = useParams();
    const [job, setJob] = useState({});
    const [allJobs, setAllJobs] = useState([]);
    const [lamaranList, setLamaranList] = useState([]);

    const getJob = () =>{
        axios.get(`https://carigawe-be.herokuapp.com/api/v1/job/${kode}`)
        .then((response)=> 
        { 
            console.log(response.data)
            var jobResponse = response.data;
            setJob(jobResponse);
            if (job && currentUser === job.creator){
                getLamaran(jobResponse)
            }
        })
    }

    const getLamaran = async (jobResponse) => {
        let result = jobResponse.applicants.filter((item)=> item.status !== 'rejected')
        for (let i = 0; i < result.length; i++){
            let user = await APIConfig.get(`api/v1/user/${result[i].username}`);
            result[i] = {...result[i], ...user.data}
        }
        console.log("lamaran", result)
        setLamaranList(result)
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

    const handleLamar = (lamaran) => {
        if (token){
            const data ={
                "job_id": kode
            }
            axios.post(`https://carigawe-be.herokuapp.com/api/v1/userjob/`, data, {
                headers: {
                        'Authorization': `Bearer ${token}`
            }})
            .then((response)=> 
            { 
                navigate(('/kegiatan'))
                alert('Lamaran terkirim')
            }).catch((err) =>{
                console.log(err)
                err.response && alert(err.response.data.detail)
            })
        }
    }

    const handleStatus = (lamaran, option) => {
        if (token){
            const data ={
                "status": option
            }
            axios.put(`https://carigawe-be.herokuapp.com/api/v1/userjob/${lamaran.job_id}/${lamaran.username}/status`, data, {
                headers: {
                        'Authorization': `Bearer ${token}`
            }})
            .then((response)=> 
            { 
                getJob()
            }).catch((err) =>{
                console.log(err)
                err.response && alert(err.response.data.detail)
            })
        }
    }
    
    const navigateEdit = () => {
        navigate((`/lowongan/${kode}/edit`))
    }
        
    const remParticipants = (job) => {
        if (job.applicants !== undefined){
            let count = 0
            for (let i; i < job.applicants.length; i++){
                console.log("masuk")
                if (job.applicants[i].status === 'accepted' || job.applicants[i].status === 'completed'){
                    count++;
                }
            }
            console.log("aaa",job.applicants)
            return job.num_participants - count
        }
    }

    useEffect(() => {
        getFromLocalStorage()
      }, []);

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
                                <Text py={25} color={'red.600'}>Tersisa {jobData.num_participants} slot pelamar lagi</Text>
                                {
                                jobData.creator != currentUser? 
                                <Button
                                    onClick={handleLamar}
                                    width={75}
                                    size={'sm'}
                                    fontSize={14}
                                    colorScheme={'blue.600'}
                                    bg={'blue.600'}>
                                    Lamar
                                </Button>
                                :
                                <Button
                                    onClick={navigateEdit}
                                    width={75}
                                    size={'sm'}
                                    fontSize={14}
                                    colorScheme={'green'}
                                    bg={'green'}>
                                    Edit
                                </Button>
                                }
                                <Text py={25} color={'red.600'}>Tersisa {jobData && remParticipants(jobData)} slot pelamar lagi</Text>
                                <Stack direction={'column'} spacing={0} pl={{base: 0, lg: 3}} fontSize={'sm'}>
                                    {
                                        jobData.creator !== currentUser?
                                        <Button
                                            onClick={handleLamar}
                                            width={75}
                                            size={'sm'}
                                            fontSize={14}
                                            colorScheme={'blue.600'}
                                            bg={'blue.600'}>
                                            Lamar
                                        </Button> :
                                        <></>
                                    }
           
                                </Stack>
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
                    { currentUser !== jobData.creator ?
                        <>
                            <Text pb={25} fontSize={20} fontWeight={600}>Lowongan Lainnya</Text>
                            {allJobs.map((data) => (
                                <Link 
                                    href={`/lowongan/${data.id}`}>
                                    <Box boxShadow='md' borderRadius={10} p={15} my={2}>
                                        <Box py={2}>
                                            <Text fontSize={16} fontWeight={'semibold'}>{data.name}</Text>
                                            <Text fontSize={12} fontWeight={'regular'}>{data.creator}</Text>
                                            <Text color={'gray.600'} fontSize={12} fontWeight={'regular'}>{data.city}, {data.province}</Text>
                                        </Box>
                                    </Box>
                                </Link>
                            ))}
                            <Link 
                                pt={25}
                                fontSize={14}
                                href='/lowongan' 
                                color={'blue.600'}
                                textAlign={'center'}>
                                Lihat semua
                            </Link>
                        </>:
                        <>
                            <Text pb={25} fontSize={20} fontWeight={600}>Daftar Pelamar</Text>
                            {lamaranList.map((data, idx) => (
                                <Box key={idx} boxShadow='md' borderRadius={10} p={15} my={2}>
                                    <Box py={2}>
                                        <Stack direction={{base: 'column', lg: 'row'}} spacing={4}>
                                            <Avatar name={data.username} src={data.image} />
                                            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                                <Text fontSize={16} fontWeight={'semibold'}>{data.username}</Text>
                                                <Text fontSize={12} fontWeight={'regular'}>{data.contact}</Text>
                                                <Text color={'gray.600'} fontSize={12} fontWeight={'regular'}>{data.description}</Text>
                                                <Stack direction={'row'} spacing={2} pl={{base: 0, lg: 3}} fontSize={'sm'} style={{paddingLeft: 0}}>
                                                {
                                                    data.status === 'requested' ?
                                                    <>
                                                        <Button
                                                            onClick={() => handleStatus(data, 'accepted')}
                                                            width={75}
                                                            size={'sm'}
                                                            fontSize={14}
                                                            colorScheme={'blue.600'}
                                                            bg={'blue.600'}>
                                                            Terima
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleStatus(data, 'rejected')}
                                                            width={75}
                                                            size={'sm'}
                                                            fontSize={14}
                                                            colorScheme={'red.600'}
                                                            bg={'red.600'}>
                                                            Tolak
                                                        </Button>
                                                    </>: data.status === 'accepted' ?
                                                    <Button
                                                    onClick={() => handleStatus(data, 'completed')}
                                                        width={75}
                                                        size={'sm'}
                                                        fontSize={14}
                                                        colorScheme={'blue.600'}
                                                        bg={'blue.600'}>
                                                        Selesai
                                                    </Button> :
                                                    <Text fontSize={12} fontWeight={'semibold'}>Pekerjaan Selesai</Text>
                                                }
                                            </Stack>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Box>
                            ))}
                        </>
                    }
                </Flex>
            </Stack>
        </Container>
        </>
    );
}

export default LowonganDetail;