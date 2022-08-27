import React from 'react';
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
    Spacer,
    Badge
  } from '@chakra-ui/react';

import LowonganData from '../../../dummydata/lowongan.json';
import ProvinsiData from '../../../dummydata/province.json';
import IndonesiaData from '../../../dummydata/indonesia.json';

import Sidebar from '../../../component/sidebar';

import { SearchIcon } from '@chakra-ui/icons';

  
const ListKegiatan = (props) => {
    const [temporarySearch, setTemporarySearch] = React.useState("");
    const [searchValue, setSearchValue] = React.useState("");
    const [selectedValue, setSelectedValue] = React.useState("");
    const [selectedValue2, setSelectedValue2] = React.useState("");

    let d = new Date().getDate();

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
                        Kegiatan Saya
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </Container>

        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} pt={50} pb={25} maxW={'100%'}>
            <Box>
                <Text fontSize={24} fontWeight={'semibold'}>Daftar Kegiatan Kamu</Text>
                <Text fontSize={14} fontWeight={'regular'} color={'gray.600'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
            </Box>
        </Container>

        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} pb={50} pt={25} maxW={'100%'}>
            <Flex
                flexDir={{base: 'column', sm: 'row'}}
                flex={1}
                justify={'left'}
                align={'center'}
                position={'relative'}>
                <Select 
                    cursor={'pointer'}
                    mb={{base: 3, sm: 0}}
                    width={{base: '100%', sm: '30%', md: '20%'}}
                    fontSize={14}
                    mr={{base: 0, sm: 3}}
                    // onChange={(e) => setSelectedValue(e.target.value)}
                    // value={selectedValue}
                    placeholder='Status'>
                        <option value="Selesai">Selesai</option>
                        <option value="Sedang dikerjakan">Sedang dikerjakan</option>
                        <option value="Diterima">Diterima</option>
                        <option value="Ditolak">Ditolak</option>
                </Select>
                <Spacer/>
                <Flex width={{base: '100%', sm: '50%', lg: '30%'}}>
                    <Input
                        fontSize={14}
                        className="inputbar"
                        type="text"
                        roundedLeft={'md'}
                        roundedRight={'none'}
                        borderRightStyle={'none'}
                        placeholder="Cari kegiatan kamu"
                        // onChange={handleSearchChange}
                        // onKeyPress={(e) => {
                        // if (e.key === "Enter") handleSearchFilter(e);
                        // }}
                        >
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
            
            {/* {pageNumbers.length > 1 && (
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
            )} */}
            <SimpleGrid columns={[1, 2]} spacing={5} pt={25}>
                {data.map((data) => (
                    <Box boxShadow='md' borderRadius={10} p={15}>
                        <Stack direction={{base: 'column-reverse', lg: 'row'}}>
                            <Box py={2}>
                                <Badge mb={5} fontSize={12} colorScheme={'green'}>
                                    Selesai
                                </Badge>
                                <Text fontSize={16} fontWeight={'semibold'}>{data.title}</Text>
                                <Text fontSize={12} fontWeight={'regular'}>{data.employer}</Text>
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
                                    <Image src="https://media.suara.com/pictures/970x544/2019/01/03/72780-susu-sapi.jpg" />
                                </Box>
                            </Flex>
                        </Stack>
                    </Box>
                ))}
            </SimpleGrid>
        </Container>
        </>
    );
}

export default ListKegiatan;