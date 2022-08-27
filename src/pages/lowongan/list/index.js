import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Image,
    SimpleGrid,
    Input,
    Avatar,
    Select,
    Link,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Spacer
  } from '@chakra-ui/react';

import styled, { css } from 'styled-components';

import LowonganData from '../../../dummydata/lowongan.json';
import ProvinsiData from '../../../dummydata/province.json';
import IndonesiaData from '../../../dummydata/indonesia.json';

import Sidebar from '../../../component/sidebar';

import { SearchIcon } from '@chakra-ui/icons';

const Pagination = styled.section`
    display: flex;
    justify-content: left;
    padding: 50px 0 12.5px 0;
`;

const PaginationButton = styled.p`
    position: relative;
    width: 30px;
    padding: 2px;
    font-size: 14px;
    font-weight: 500;
    height: 30px;
    margin: 0 4px;
    text-align: center;
    color: #6554C0;
    user-select: none;
    border: 2px solid #DADADA;
    border-radius: 5px;
    &:hover {
        cursor: pointer;
        background: #DADADA;
        color: #2B6CB0;
        transition: 0.3s ease-out;
    }
    @media screen and (max-width: 500px) {
        width: 30px;
        height: 30px;
        margin: 0 2px;
    }
    ${(props) =>
        props.active &&
        css`
          background: #2B6CB0;
          color: #FAFAFA;
        `}
    
      ${(props) =>
        props.unshow &&
        css`
          display: none;
        `}
    
`;

function publishDay(string1, string2){
    var t1 = new Date(string1).getTime();
    var t2 = new Date(string2).getTime();
 
    return Math.floor((t2 - t1) / (24 * 3600 * 1000));
}

function publisMonth(string1, string2){
    var d1Y = new Date(string1).getFullYear();
    var d2Y = new Date(string2).getFullYear();
    var d1M = new Date(string1).getMonth();
    var d2M = new Date(string2).getMonth();
 
    return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
}
function publishYear(string1, string2){
    return new Date(string2).getFullYear()- new Date(string1).getFullYear();
}
  
const LowonganList = (props) => {
    const [temporarySearch, setTemporarySearch] = React.useState("");
    const [searchValue, setSearchValue] = React.useState("");
    const [selectedValue, setSelectedValue] = React.useState("");
    const [selectedValue2, setSelectedValue2] = React.useState("");
    const [allJobs, setAllJobs] = useState([]);

    let d = new Date().getTime();

    let provinceData = ProvinsiData;
    let cityData = IndonesiaData;

    let data = LowonganData;
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageNumbers = [];

    const handleSearchChange = (e) => {
        e.preventDefault();
        setTemporarySearch(e.target.value);
    };

    const handleSearchFilter = (e) => {
        e.preventDefault();
        setSearchValue(temporarySearch);
    };

    const matcher = (data) => {
        const val = searchValue.toLocaleLowerCase();
        if((data.province === selectedValue && data.city === selectedValue2)
            || (selectedValue.length === 0 && selectedValue2.length === 0)
            || (data.province === selectedValue && selectedValue2.length === 0)) {
            if (data.title.toLocaleLowerCase().includes(val)) return true;
        }
        return false;
    };
    
    data = data.filter((i) => matcher(i));
    
    for (let i = 1; i <= Math.ceil(data.length / 15); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastData = currentPage * 15;
    const indexOfFirstData = indexOfLastData - 15;
    data = data.slice(indexOfFirstData, indexOfLastData);

    const getJobs = () =>{
        axios.get('https://carigawe-be.herokuapp.com/api/v1/job')
        .then((response)=> 
        { 
        var jobList = response.data;
        setAllJobs(jobList);
        })
    }

    useEffect(() => {
        getJobs();
      }, []);

    var jobData = allJobs;

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
                        Lowongan Kerja
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </Container>

        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} pt={50} pb={25} maxW={'100%'}>
            <Box>
                <Text fontSize={24} fontWeight={'semibold'}>Daftar Lowongan Kerja</Text>
                <Text fontSize={14} fontWeight={'regular'} color={'gray.600'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
            </Box>
        </Container>

        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} pb={50} pt={25} maxW={'100%'}>
            <Flex
                flexDir={{base: 'column', md: 'row'}}
                flex={1}
                justify={'left'}
                align={'center'}
                position={'relative'}>
                <Select 
                    cursor={'pointer'}
                    mb={{base: 3, md: 0}}
                    width={{base: '100%', md: '20%'}}
                    fontSize={14}
                    mr={{base: 0, md: 3}}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    value={selectedValue}
                    placeholder='Provinsi'>
                    {provinceData.map((data) => {
                        return <option value={data.name}>{data.name}</option>
                    })}
                </Select>
                <Select 
                    cursor={'pointer'}
                    mb={{base: 3, md: 0}}
                    width={{base: '100%', md: '20%'}}
                    fontSize={14}
                    mr={{base: 0, md: 3}}
                    onChange={(e) => setSelectedValue2(e.target.value)}
                    value={selectedValue2}
                    placeholder='Kota / Kabupaten'>
                    {cityData.filter((data) => data.admin_name === selectedValue).map((data) => {
                        return <option value={data.city}>{data.city}</option>
                    })}
                </Select>
                <Spacer/>
                <Flex
                    width={{base: '100%', md: '50%', lg: '30%'}}>
                    <Input
                        fontSize={14}
                        className="inputbar"
                        type="text"
                        roundedLeft={'md'}
                        roundedRight={'none'}
                        borderRightStyle={'none'}
                        placeholder="Cari pekerjaan"
                        onChange={handleSearchChange}
                        onKeyPress={(e) => {
                        if (e.key === "Enter") handleSearchFilter(e);
                        }}>
                    </Input>
                    <Box 
                        bg={'gray.200'} 
                        px={3} 
                        py={2} 
                        roundedLeft={'none'}
                        roundedRight={'md'}
                        onClick={handleSearchFilter} 
                        cursor={'pointer'}
                        _hover={{background: '#F37AA3', color: 'white'}}>
                        <SearchIcon />
                    </Box>
                </Flex>

            </Flex>
            {data.length > 0 ? 
            <div>
            {pageNumbers.length > 1 && (
                <Pagination>
                    <PaginationButton onClick={() => setCurrentPage(1)}>
                        &lt;&lt;
                    </PaginationButton>
                    <PaginationButton onClick={() => 
                        currentPage === 1 ? setCurrentPage(1) : setCurrentPage(currentPage-1)}>
                        &lt;
                    </PaginationButton>
                    {pageNumbers.map((page) => (
                        <PaginationButton
                            unshow={
                                currentPage > 2 && pageNumbers.length - currentPage > 1
                                ? Math.abs(currentPage - page) > 2
                                : pageNumbers.length - currentPage < 2
                                ? pageNumbers.length - page > 4
                                : page > 5
                            }
                            active={currentPage === page}
                            onClick={() => setCurrentPage(page)}>
                                {page}
                        </PaginationButton>
                    ))}
                    <PaginationButton
                        onClick={() =>
                            currentPage === pageNumbers.length
                                ? setCurrentPage(pageNumbers.length)
                                : setCurrentPage(currentPage + 1)
                        }>
                        &gt;
                    </PaginationButton>
                    <PaginationButton onClick={() => setCurrentPage(pageNumbers.length)}>
                        &gt;&gt;
                    </PaginationButton>
                </Pagination>
            )}
            <SimpleGrid columns={[1, 2, 2, 3]} spacing={5} pt={25}>
                {jobData.map((data) => (
                    <Link 
                        href={`lowongan/${data.id}`}
                        _hover={{ textDecoration: 'none' }} 
                        _active={{ textDecoration: 'none' }}>
                        <Box boxShadow='md' borderRadius={10} p={15}>
                            <Stack direction={{base: 'column-reverse', lg: 'row'}}>
                                <Box py={2}>
                                    <Text fontSize={16} fontWeight={'semibold'}>{data.name}</Text>
                                    <Text fontSize={12} fontWeight={'regular'}>{data.creator}</Text>
                                    <Text color={'gray.600'} fontSize={12} fontWeight={'regular'}>{data.city}, {data.province}</Text>
                                </Box>
                                <Spacer/>
                                <Flex 
                                    mr={0}
                                    ml={0}
                                    justify={'center'}
                                    align={'center'}
                                    position={'relative'}
                                    width={{base: '100%', lg: '40%'}}>
                                    <Box>
                                        <Image src={data.image != null ? 
                                        data.image 
                                        : 
                                        "https://media.suara.com/pictures/970x544/2019/01/03/72780-susu-sapi.jpg"} 
                                        />
                                    </Box>
                                </Flex>
                            </Stack>
                        </Box>
                    </Link>
                ))}
            </SimpleGrid>
        </div>
        :
        <Container py={150} maxW={'100%'} textAlign={'center'}>
            <Box>
                <Text fontSize={24} fontWeight={'semibold'}>Tidak ada lowongan kerja yang tersedia!</Text>
                <Text fontSize={14} fontWeight={'regular'} color={'gray.600'}>Silakan pilih lokasi lain yang menyediakan lowongan kerja.</Text>
            </Box>
        </Container>

        }
        </Container>
        </>
    );
}

export default LowonganList;