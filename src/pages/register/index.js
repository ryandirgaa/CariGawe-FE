import { React, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Center,
    Box,
    Text,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Textarea,
    Divider,
    Flex,
    Stack
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Form from 'react-validation/build/form';

import APIConfig from "../../api";
import axios from "axios"; 

import qs from 'qs';

const Register = (props) => {
    let navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState(new Date());
    const [contact, setContact] = useState("");
    const [description, setDescription] = useState("");

    const [image, setImage] = useState(null);


    const handleRegister = async (e) => {
        e.preventDefault();
        let data = {
            "fullname": fullName,
            "email": email,
            "username": username,
            "password": password,
            "date_birth": birthdate.toString() + "T00:00:00.000Z",
            "contact": contact,
            "description": description
        }
        let formData = new FormData();
        formData.append("user", JSON.stringify(data))
        image && formData.append('file', image);

        console.log(image)
        axios.post(`https://carigawe-be.herokuapp.com/api/v1/register`, formData)
        .then(response => navigate((`/login`)))
        .catch(error => {
            console.log(error);
        });
    };
  
    return (
        <>
        <Container minW={'100%'} bg={'gray.800'} color={'white'}>
            <Center maxW={'3xl'} minH={'100vh'} m={'auto'} py={100}>
                <Container px={{base: 15, sm: 30}} py={30} bg={'gray.700'} boxShadow='xl' borderRadius={10}>
                    <Text fontWeight={'semibold'} fontSize={24} textAlign={'center'}>
                        Registrasi
                    </Text>

                    <Form onSubmit={handleRegister}>
                        <FormControl pt={10} isRequired>
                            <FormLabel fontSize={14}>Nama Lengkap</FormLabel>
                                <Input 
                                    borderColor={'gray.500'}
                                    fontSize={14}
                                    placeholder='Masukkan nama lengkap'
                                    id='fullName'
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}/>
                        </FormControl>
                        
                        <FormControl pt={5} isRequired>
                            <FormLabel fontSize={14}>Email</FormLabel>
                            <Input
                                borderColor={'gray.500'}
                                fontSize={14}
                                placeholder='Masukkan email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                        </FormControl>

                        <FormControl pt={5} isRequired>
                            <FormLabel fontSize={14}>Username</FormLabel>
                            <Input 
                                borderColor={'gray.500'}
                                fontSize={14}
                                placeholder='Masukkan username'
                                id='username'
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}/>
                        </FormControl>
                    
                        <FormControl pt={5} isRequired>
                            <FormLabel fontSize={14}>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    borderColor={'gray.500'}
                                    fontSize={14}
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder='Masukkan kata sandi'
                                    id='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}/>
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                        setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <FormControl pt={5} isRequired>
                            <FormLabel fontSize={14}>Tanggal Lahir</FormLabel>
                                <Input 
                                    borderColor={'gray.500'}
                                    fontSize={14}
                                    type={'date'}
                                    id= 'birthdate'
                                    value={birthdate}
                                    onChange={(e) => setBirthdate(e.target.value)}/>
                        </FormControl>

                        <FormControl pt={5} isRequired>
                            <FormLabel fontSize={14}>Kontak</FormLabel>
                            <Input 
                                borderColor={'gray.500'}
                                fontSize={14}
                                placeholder='Masukkan kontak'
                                id='contact'
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}/>
                        </FormControl>

                        <FormControl pt={5} isRequired>
                            <FormLabel fontSize={14}>Deskripsi</FormLabel>
                            <Textarea 
                                borderColor={'gray.500'}
                                fontSize={14}
                                type={'text'}
                                placeholder='Deskripsikan tentang kamu'
                                id='description' 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />  
                        </FormControl>

                        <FormControl pt={5} isRequired>
                            <FormLabel fontSize={14}>Foto Profil</FormLabel>
                                <Input 
                                    borderStyle={'none'}
                                    px={0}
                                    accept="image/*"
                                    type={'file'}
                                    fontSize={14}
                                    id= 'photo'
                                    onChange={(e) => {setImage(e.target.files[0])}}
                                    />
                        </FormControl>

                        <Box pt={5} align={'center'}>
                            <Button
                                width={'100%'}
                                size={'md'}
                                fontSize={14}
                                colorScheme={'blue.600'}
                                bg={'blue.600'}
                                _hover={{ bg: 'blue.400' }}
                                _active={{ bg: 'blue.400' }}
                                type='submit'>
                                Daftar
                            </Button>
                        </Box>
                    </Form>

                    <Box pt={5}>
                        <Text 
                            fontSize={14} 
                            align={'center'}>
                            Sudah punya akun? 
                            <Link 
                                href="/login" 
                                color={'blue.600'} 
                                _hover={{ color: 'blue.400', textDecoration: 'none' }}
                                _active={{ color: 'blue.400', textDecoration: 'none' }}> Login</Link>
                        </Text>
                    </Box>
                </Container>
            </Center>
        </Container>
        </>
    );
}

export default Register;