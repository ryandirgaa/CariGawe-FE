import React from 'react';
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
    Select,
    Textarea
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Form from 'react-validation/build/form';

const Register = (props) => {
    const [showPassword, setShowPassword] = React.useState();

    return (
        <>
        <Container minW={'100%'} bg={'gray.800'} color={'white'}>
            <Center maxW={'3xl'} minH={'100vh'} m={'auto'} py={100}>
                <Container px={{base: 15, sm: 30}} py={30} bg={'gray.700'} boxShadow='xl' borderRadius={10}>
                    <Text fontWeight={'semibold'} fontSize={24} textAlign={'center'}>
                        Registrasi
                    </Text>

                    <Form>
                        <FormControl pt={10} isRequired>
                            <FormLabel fontSize={14}>Nama Lengkap</FormLabel>
                                <Input 
                                    borderColor={'gray.500'}
                                    fontSize={14}
                                    placeholder='Masukkan nama lengkap'
                                    id='fullname'
                                    name='fullname'/>
                        </FormControl>

                        <FormControl pt={5} isRequired>
                            <FormLabel fontSize={14}>Tanggal Lahir</FormLabel>
                                <Input 
                                    borderColor={'gray.500'}
                                    fontSize={14}
                                    type={'date'}
                                    id= 'birthdate'
                                    name='birthdate'/>
                        </FormControl>
                        
                        <FormControl pt={5} isRequired>
                            <FormLabel fontSize={14}>Email</FormLabel>
                            <Input
                                borderColor={'gray.500'}
                                fontSize={14}
                                placeholder='Masukkan email'
                                id='email'
                                name='email'/>
                        </FormControl>

                        <FormControl pt={5} isRequired>
                            <FormLabel fontSize={14}>Username</FormLabel>
                            <Input 
                                borderColor={'gray.500'}
                                fontSize={14}
                                placeholder='Masukkan username'
                                id='username'
                                name='username'/>
                        </FormControl>
                    
                        <FormControl pt={5} isRequired>
                            <FormLabel fontSize={14}>Kata sandi</FormLabel>
                            <InputGroup>
                                <Input
                                    borderColor={'gray.500'}
                                    fontSize={14}
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder='Masukkan kata sandi'
                                    id='password'
                                    name='password'/>
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
                            <FormLabel fontSize={14}>Deskripsi</FormLabel>
                            <Textarea 
                                borderColor={'gray.500'}
                                fontSize={14}
                                type={'text'}
                                placeholder='Deskripsikan tentang kamu'
                                id='description' 
                                name='description'
                            />  
                        </FormControl>

                        <FormControl pt={5} isRequired>
                            <FormLabel fontSize={14}>Foto Profil</FormLabel>
                                <Input 
                                    borderStyle={'none'}
                                    px={0}
                                    type={'file'}
                                    fontSize={14}
                                    id= 'photo'
                                    name='photo'/>
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