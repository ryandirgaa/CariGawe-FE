import { React, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Stack,
    Flex,
    Box,
    Text,
    Image,
    SimpleGrid,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Spacer
  } from '@chakra-ui/react';

import { scaleLinear, scaleBand } from 'd3-scale';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Done from "./img/done.svg";
import Ongoing from "./img/ongoing.svg";
import Acc from "./img/accept.svg";
import Saved from "./img/saved.svg";
import Sapi from "./img/sapi.png";

import Sidebar from '../../component/sidebar';

import APIConfig from '../../api';
import { UserContext } from '../../services/user-context';

const viewBox = [1000, 450];

const letters = [
  { letter: 'A', frequency: 0.8167 },
  { letter: 'B', frequency: 0.1492 },
  { letter: 'C', frequency: 0.2780 },
  { letter: 'D', frequency: 0.4253 },
  { letter: 'E', frequency: 0.9702 },
  { letter: 'F', frequency: 0.2288 },
  { letter: 'G', frequency: 0.2022 },
];

const y = scaleLinear()
  .range([viewBox[1] - 20, 0])
  .domain([0, 1]);

  
const Home = (props) => {
    const {currentUser, getFromLocalStorage} = useContext(UserContext);
    const [fullname, setFullName] = useState("");

    const getUser = async(x) => {
        const response = await APIConfig.get(`api/v1/user/${x}`);
        const result = await response.data;
        
        setFullName(result.fullname);
    };

    useEffect(() => {
        getFromLocalStorage();
      }, []);

    useEffect(() => {
        getUser(currentUser);
    }, []);


    const scale = scaleBand()
                    .rangeRound([0, viewBox[0] - 10])
                    .domain(letters.map(d => d.letter))
                    .padding(0.5);
      
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
                        Beranda
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </Container>
            
        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} pt={50} pb={25} maxW={'100%'}>
            <Box>
                <Text fontSize={24} fontWeight={'semibold'}>Halo, {fullname}!</Text>
                <Text fontSize={14} fontWeight={'regular'} color={'gray.600'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
            </Box>
            <SimpleGrid columns={[1, 2, 2, 4]} spacing={5} pt={25}>
                <Box boxShadow='md' borderRadius={10} p={15}>
                    <Stack direction={'row'}>
                        <Box>
                            <Text fontSize={14} fontWeight={'regular'}>Pekerjaan selesai</Text>
                            <Text fontSize={20} fontWeight={'semibold'}>5</Text>
                        </Box>
                        <Flex 
                            justify={'center'}
                            align={'center'}
                            position={'relative'}
                            w={'60%'}>
                            <Box ml={'auto'} mr={0}>
                                <Image src={Done} width={7} height={7} />
                            </Box>
                        </Flex>
                    </Stack>
                </Box>
                <Box boxShadow='md' borderRadius={10} p={15}>
                    <Stack direction={'row'}>
                        <Box>
                            <Text fontSize={14} fontWeight={'regular'}>Sedang dikerjakan</Text>
                            <Text fontSize={20} fontWeight={'semibold'}>5</Text>
                        </Box>
                        <Flex 
                            justify={'center'}
                            align={'center'}
                            position={'relative'}
                            w={'60%'}>
                            <Box ml={'auto'} mr={0}>
                                <Image src={Ongoing} width={7} height={7} />
                            </Box>
                        </Flex>
                    </Stack>
                </Box>
                <Box boxShadow='md' borderRadius={10} p={15}>
                    <Stack direction={'row'}>
                        <Box>
                            <Text fontSize={14} fontWeight={'regular'}>Lowongan diterima</Text>
                            <Text fontSize={20} fontWeight={'semibold'}>5</Text>
                        </Box>
                        <Flex 
                            justify={'center'}
                            align={'center'}
                            position={'relative'}
                            w={'60%'}>
                            <Box ml={'auto'} mr={0}>
                                <Image src={Acc} width={7} height={7} />
                            </Box>
                        </Flex>
                    </Stack>
                </Box>
                <Box boxShadow='md' borderRadius={10} p={15}>
                    <Stack direction={'row'}>
                        <Box>
                            <Text fontSize={14} fontWeight={'regular'}>Lowongan tersimpan</Text>
                            <Text fontSize={20} fontWeight={'semibold'}>5</Text>
                        </Box>
                        <Flex 
                            justify={'center'}
                            align={'center'}
                            position={'relative'}
                            w={'50%'}>
                            <Box ml={'auto'} mr={0}>
                                <Image src={Saved} width={7} height={7} />
                            </Box>
                        </Flex>
                    </Stack>
                </Box>
            </SimpleGrid>
        </Container>

        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} py={25} maxW={'100%'}>
            <SimpleGrid columns={[1, 1, 2]} spacing={5} pt={25}>
                <Box>
                    <Text fontSize={20} fontWeight={'semibold'}>Rating Pekerjaan Kamu</Text>
                    <Box boxShadow='md' borderRadius={10} px={15} py={25} mt={25}>
                        <svg style={{margin: 'auto', align: 'center'}} className="chart" viewBox={`0 0 ${viewBox[0]} ${viewBox[1]}`} width="86%">
                            <g>
                                {letters.map(entry => {
                                    return (
                                        <g key={entry.letter} transform={`translate(${scale(entry.letter)},0)`}>
                                            <rect fill='#2B6CB0' height={viewBox[1] - y(entry.frequency)} y={y(entry.frequency)} opacity="1" width={scale.bandwidth()} />
                                        </g>
                                    );
                                })}
                            </g>
                            </svg>
                    </Box>
                </Box>
                <Box pt={{base: 25, md: 0}}>
                    <Text fontSize={20} fontWeight={'semibold'}>Performa Kamu</Text>
                    <Box boxShadow='md' borderRadius={10} px={15} py={25} mt={25}>
                        <Stack direction={{base: 'column-reverse', lg: 'row'}} py={8}>
                            <Flex direction={'column'} justifyContent={'center'}>
                                <Text fontSize={16} fontWeight={'semibold'}>Baik</Text>
                                <Text fontSize={14} fontWeight={'regular'} color={'gray.600'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
                            </Flex>
                            <Spacer />
                            <Flex
                                justify={'center'}
                                align={'center'}
                                position={'relative'}
                                >
                                <Box ml={{base: 0, lg: 'auto'}} mr={0} width={{base: '50%', sm: '30%', md: '60%'}}>
                                    <CircularProgressbar 
                                        value={75} 
                                        text={'75%'}
                                        styles={buildStyles({
                                            strokeLinecap: 'butt',
                                            textSize: '16px',
                                            pathTransitionDuration: 0.5,
                                            pathColor: '#2B6CB0',
                                            textColor: '#000000',
                                            trailColor: '#d6d6d6',
                                          })}/>
                                </Box>
                            </Flex>
                        </Stack>
                    </Box>
                </Box>
            </SimpleGrid>
        </Container>

        <Container pl={{base: 70, md: 300}} pr={{base: 15, md: 35}} py={50} maxW={'100%'}>
            <Text fontSize={20} fontWeight={'semibold'}>Lowongan di Wilayah Kamu</Text>
            <SimpleGrid columns={[1, 2, 2, 3]} spacing={5} pt={25}>
                
                <Box boxShadow='md' borderRadius={10} p={15}>
                    <Stack direction={{base: 'column-reverse', lg: 'row'}}>
                        <Box py={2}>
                            <Text fontSize={16} fontWeight={'semibold'}>Perah Susu Sapi</Text>
                            <Text fontSize={12} fontWeight={'regular'}>Naufal Adi</Text>
                            <Text color={'gray.600'} fontSize={12} fontWeight={'regular'}>Boyolali, Jawa Tengah</Text>
                            <Text pt={5} color={'blue.600'} fontSize={12} fontWeight={'regular'}>Dipost 3 hari yang lalu</Text>
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
                                <Image src={Sapi} />
                            </Box>
                        </Flex>
                    </Stack>
                </Box>
                <Box boxShadow='md' borderRadius={10} p={15}>
                    <Stack direction={{base: 'column-reverse', lg: 'row'}}>
                        <Box py={2}>
                            <Text fontSize={16} fontWeight={'semibold'}>Perah Susu Sapi</Text>
                            <Text fontSize={12} fontWeight={'regular'}>Naufal Adi</Text>
                            <Text color={'gray.600'} fontSize={12} fontWeight={'regular'}>Boyolali, Jawa Tengah</Text>
                            <Text pt={5} color={'blue.600'} fontSize={12} fontWeight={'regular'}>Dipost 3 hari yang lalu</Text>
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
                                <Image src={Sapi} />
                            </Box>
                        </Flex>
                    </Stack>
                </Box>
                <Box boxShadow='md' borderRadius={10} p={15}>
                    <Stack direction={{base: 'column-reverse', lg: 'row'}}>
                        <Box py={2}>
                            <Text fontSize={16} fontWeight={'semibold'}>Perah Susu Sapi</Text>
                            <Text fontSize={12} fontWeight={'regular'}>Naufal Adi</Text>
                            <Text color={'gray.600'} fontSize={12} fontWeight={'regular'}>Boyolali, Jawa Tengah</Text>
                            <Text pt={5} color={'blue.600'} fontSize={12} fontWeight={'regular'}>Dipost 3 hari yang lalu</Text>
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
                                <Image src={Sapi} />
                            </Box>
                        </Flex>
                    </Stack>
                </Box>
            </SimpleGrid>
        </Container>
        </>
    );
}

export default Home;