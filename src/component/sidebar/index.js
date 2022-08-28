import { React, useState, useContext, useEffect } from "react";
import {
    Container,
    Stack,
    Box,
    Text,
    Image,
    Menu,
    Link,
    Avatar,
    HStack,
    Icon
} from '@chakra-ui/react';

import {
    FiHome,
    FiList,
    FiUser,
    FiLogOut,
} from 'react-icons/fi';

import {TbNote} from 'react-icons/tb';

import Logo from "../../carigawe.png";

import APIConfig from "../../api";
import { UserContext } from "../../services/user-context";

function publishYear(string1, string2){
    return new Date(string2).getFullYear()- new Date(string1).getFullYear();
}

const MenuItem = ({ children, isLast, to, onClick, icon, ...rest }) => {
    return (
        <div>
            <Link 
                href={to} 
                onClick={onClick}
                color={'gray.300'}
                _hover={{ color: 'white', fontWeight: '500', textDecoration: 'none' }} 
                _active={{ color: 'white', fontWeight: '500', textDecoration: 'none' }}>
                    <HStack py={2.5} px={{base: 3, md: 4}} 
                    _hover={{ backgroundColor: '#2D3748', borderRadius: 5 }} 
                    _active={{ backgroundColor: '#2D3748', borderRadius: 5 }}>
                    <Icon
                        color={'gray.300'}
                        mr={2}
                        fontSize={18}
                        _groupHover={{
                        color: 'white',
                        }}
                        as={icon}
                    />
                    <Text fontSize={14} display={{ base: "none", md: "block" }} {...rest}>
                        {children}
                    </Text>  
                    </HStack>    
            </Link>
        </div>
    );
};

const Sidebar = (props) => {
    let d = new Date().getTime();
    const {currentUser, getFromLocalStorage} = useContext(UserContext);
    const {setCurrentUser, setToken} = useContext(UserContext);
    const [fullname, setFullName] = useState("");
    const [birthdate, setBirthDate] = useState("");
    const [image, setImage] = useState(undefined);

    const getUser = async(x) => {
        const response = await APIConfig.get(`api/v1/user/${x}`);
        const result = await response.data;
        
        setFullName(result.fullname);
        setBirthDate(result.date_birth);
        setImage(result.image);
    };

    const logout = async () => {
        setCurrentUser();
        setToken()
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.reload();
    }

    useEffect(() => {
        getFromLocalStorage();
      }, []);

    useEffect(() => {
        currentUser && getUser(currentUser);
    }, [currentUser]);

    return (
        <div 
        style={{'background': '#1A202C', 
                'position': 'fixed', 
                'zIndex': '1'}}
        >
        <Container px={{base: 1.5, md: 8}} maxW={'7xl'} width={{base: 55, md: 265}} minH={'100vh'}>
            <Stack
            mb={0}
            py={5}
            color={"black"}
            >
            <HStack>
                <Image margin={{base: 'auto', md: 0}} src={Logo} width={{base: '30px', md: '44px'}} height={{base: '44px', md: '64px'}}></Image>
                <Text display={{base: 'none', md: 'flex'}} fontWeight={'bold'} fontSize={20} color={'white'}>CariGawe</Text>
            </HStack>
            <Box
                py={5}
                flexBasis={{ base: "100%", md: "auto" }}>
                <Text display={{ base: "none", md: "block" }} fontWeight={'semibold'} fontSize={14} color={'white'}>MENU</Text>
                <Stack
                color={'white'}
                pt={3}
                direction={'column'}>
                <Menu>
                    <MenuItem icon={FiHome} to="/">Beranda</MenuItem>
                    <MenuItem icon={FiList} to="/lowongan">Lowongan Kerja</MenuItem>
                    <MenuItem icon={TbNote} to="/lowongan/saya">Lowongan Saya</MenuItem>
                    <MenuItem icon={TbNote} to="/kegiatan">Kegiatan Saya</MenuItem>
                </Menu>
                </Stack>
            </Box>

            <Box
                py={5}
                flexBasis={{ base: "100%", md: "auto" }}>
                <Text display={{ base: "none", md: "block" }} fontWeight={'semibold'} fontSize={14} color={'white'}>LAINNYA</Text>
                <Stack
                color={'white'}
                pt={3}
                direction={'column'}>
                <Menu>
                    <MenuItem icon={FiUser} to="/profil">Profil</MenuItem>
                    <MenuItem icon={FiLogOut} onClick={logout} to="/login">Keluar</MenuItem>
                </Menu>
                </Stack>
            </Box>
            </Stack>
        </Container>
        <Stack p={{base: 3, md: 6}} bg={'gray.700'} direction={'row'} spacing={2.5} position={'absolute'} bottom={0} width={'100%'}>
            <Avatar
                mt={0}
                width={{base: 7, md: 10}} height={{base: 7, md: 10}}
                src={image}
                alt={'Author'}/>
            <Stack display={{ base: "none", md: "block" }} direction={'column'} spacing={0} fontSize={'sm'}>
                <Text fontSize={14} fontWeight={'semibold'} color={'white'}>{fullname}</Text>
                <Text fontSize={12} color={'gray.300'}>{publishYear(birthdate, d)} tahun</Text>
            </Stack>
        </Stack>
        </div>
    );
};

export default Sidebar;
