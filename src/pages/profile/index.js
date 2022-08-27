import React from 'react';
import { useParams } from "react-router-dom";
import {
    Container,
    Stack,
    Flex,
    Box,
    Text,
    Avatar,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Link,
    Badge,
    HStack
  } from '@chakra-ui/react';

import StarRatings from 'react-star-ratings';

import LowonganData from '../../dummydata/lowongan.json';

import Sidebar from '../../component/sidebar';

  
const Profil = (props) => {
    const { kode } = useParams();
    let data = LowonganData;

    return (
        <>
        <Sidebar/>
        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} maxW={'100%'} bg={'gray.800'} px={{base: 0, md: 10}} py={{base: 30, md: 35}}>
            <Breadcrumb fontSize={{ base: '16', md: '20' }} fontWeight={'semibold'}>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink 
                        color={'white'}
                        href={null} 
                        _hover={{ color: '#6B6FCE', fontWeight: '500', textDecoration: 'none' }} 
                        _active={{ textDecoration: 'none' }}>
                        Profil
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </Container>

        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} pt={50} maxW={'100%'}>
            <Box>
                <Text fontSize={24} fontWeight={'semibold'}>Profil Kamu</Text>
                <Text fontSize={14} fontWeight={'regular'} color={'gray.600'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
            </Box>
        </Container>

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
                <Stack border={'1px'} borderColor={'gray.300'} p={{base: 15, md: 30}} maxW={{base: '100%', md: '3xl'}} flex={10} spacing={{ base: 5, md: 8 }}>
                    <Box border={2} borderColor={'green.700'}>
                        <Stack pb={10} direction={{base: 'column', lg: 'row'}} spacing={4}>
                            <Avatar
                            mt={0}
                            width={{base: 24, md: 40}} height={{base: 24, md: 40}}
                            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                            alt={'Author'}
                            />
                            <Stack direction={'column'} pt={8} spacing={0} pl={{base: 0, lg: 3}} fontSize={'sm'}>
                                <Text fontSize={20} fontWeight={600}>Muhammad Hazim</Text>
                                <Text>Freelancer</Text>
                                <HStack pt={5}>
                                    <StarRatings
                                        starRatedColor="#F6E05E"
                                        numberOfStars={5}
                                        name='rating'
                                        rating={4.6}
                                        starDimension="25px"
                                        starSpacing="2px"
                                        /> 
                                    <Text pt={1} pl={5} fontSize={20} fontWeight={600}>9.2</Text>
                                </HStack>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Box py={25}>
                                <Text pb={25} fontSize={20} fontWeight={600}>Deskripsi</Text>
                                <Text fontSize={14}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
                                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
                                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </Text>
                            </Box>
                            <Box py={25}>
                                <Text pb={25} fontSize={20} fontWeight={600}>Alamat</Text>
                                <Text fontSize={14}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
                            </Box>
                            <Box py={25}>
                                <Text pb={25} fontSize={20} fontWeight={600}>Kontak</Text>
                                <Text fontSize={14}>0812345678910</Text>
                            </Box>
                            
                        </Stack>
                    </Box> 
                </Stack>
                <Flex
                    border={'1px'} 
                    borderColor={'gray.300'}
                    p={{base: 15, md: 30}}
                    maxW={{base: '100%', md: 'xs'}}
                    flex={1}
                    flexDirection={'column'}
                    position={'relative'}>
                    <Text pb={25} fontSize={20} fontWeight={600}>Kegiatan Kamu</Text>
                    {data.slice(0, 3).map((data) => (
                        <Box boxShadow='md' borderRadius={10} p={15} my={2}>
                            <Box py={2}>
                                <Badge mb={5} fontSize={12} colorScheme={'green'}>
                                    Selesai
                                </Badge>
                                <Text fontSize={16} fontWeight={'semibold'}>{data.title}</Text>
                                <Text fontSize={12} fontWeight={'regular'}>{data.employer}</Text>
                                <Text color={'gray.600'} fontSize={12} fontWeight={'regular'}>{data.city}, {data.province}</Text>
                            </Box>
                        </Box>
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

export default Profil;