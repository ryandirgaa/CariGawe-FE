import React from 'react';
import { useParams } from "react-router-dom";
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

function publishDay(string){
    return new Date(string).getDate();
}
  
const LowonganDetail = (props) => {
    let d = new Date().getDate();
    const { kode } = useParams();
    let data = LowonganData;

    return (
        <>
        <Sidebar/>
        {data.filter((data) => data.code === kode).map((data) => (
        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} maxW={'100%'} bg={'gray.800'} px={{base: 0, md: 10}} py={{base: 30, md: 35}}>
            <Breadcrumb fontSize={14} fontWeight={'semibold'} separator='/' color={'white'}>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        href='/blog' 
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
                        {data.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </Container>
        ))}

        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} py={50} maxW={'100%'}>
            <Stack
                alignItems={'start'}
                justifyContent={'left'}
                spacing={{base: 5, lg: 10}}
                direction={{ base: 'column', lg: 'row' }}>
                {data.filter((data) => data.code === kode).map((data) => (
                <Stack border={'1px'} borderColor={'gray.300'} p={{base: 15, md: 30}} maxW={{base: '100%', md: '3xl'}} flex={10} spacing={{ base: 5, md: 8 }}>
                    <Box border={2} borderColor={'green.700'}>
                        <Stack pb={10} direction={{base: 'column', lg: 'row'}} spacing={4}>
                            <Image src={'https://media.suara.com/pictures/970x544/2019/01/03/72780-susu-sapi.jpg'} width={{base: '50vw', lg: '22.5vw'}}/>
                            <Stack direction={'column'} spacing={0} pl={{base: 0, lg: 3}} fontSize={'sm'}>
                                <Text fontSize={20} fontWeight={600}>{data.title}</Text>
                                <Text>{data.employer}</Text>
                                <Text color={'gray.600'}>{data.city}, {data.province}</Text>
                                <Text py={25} color={'red.600'}>Tersisa 20 slot pelamar lagi</Text>
                                <Button
                                    width={75}
                                    size={'sm'}
                                    fontSize={14}
                                    colorScheme={'blue.600'}
                                    bg={'blue.600'}>
                                    Lamar
                                </Button>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Box py={25}>
                                <Text pb={25} fontSize={20} fontWeight={600}>Deskripsi</Text>
                                <Text fontSize={14}>{data.description}</Text>
                            </Box>
                            <Box py={25}>
                                <Text pb={25} fontSize={20} fontWeight={600}>Upah</Text>
                                <Text fontSize={14}>{data.salary}</Text>
                            </Box>
                            <Box py={25}>
                                <Text pb={25} fontSize={20} fontWeight={600}>Kontak</Text>
                                <Stack direction={{base: 'column', lg: 'row'}} spacing={4}>
                                    <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                        <Text fontSize={16} fontWeight={600}>{data.employer}</Text>
                                        <Text color={'gray.600'}>{data.contact}</Text>
                                    </Stack>
                                </Stack>
                            </Box>
                            
                        </Stack>
                    </Box> 
                </Stack>
                ))}
                <Flex
                    border={'1px'} 
                    borderColor={'gray.300'}
                    p={{base: 15, md: 30}}
                    maxW={{base: '100%', md: 'xs'}}
                    flex={1}
                    flexDirection={'column'}
                    position={'relative'}>
                    <Text pb={25} fontSize={20} fontWeight={600}>Lowongan Lainnya</Text>
                    {data.slice(0, 3).map((data) => (
                        <Link 
                            href={`/lowongan/${data.code}`}>
                            <Box boxShadow='md' borderRadius={10} p={15} my={2}>
                                <Box py={2}>
                                    <Text fontSize={16} fontWeight={'semibold'}>{data.title}</Text>
                                    <Text fontSize={12} fontWeight={'regular'}>{data.employer}</Text>
                                    <Text color={'gray.600'} fontSize={12} fontWeight={'regular'}>{data.city}, {data.province}</Text>
                                    <Text pt={5} color={'blue.600'} fontSize={12} fontWeight={'regular'}>Dipost {`${d - publishDay(data.postdate)}`} hari yang lalu</Text>
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
                </Flex>
            </Stack>
        </Container>
        </>
    );
}

export default LowonganDetail;