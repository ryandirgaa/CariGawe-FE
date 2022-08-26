import React from 'react';
import {
    Container,
    Center,
    Box,
    Text,
    Button,
    Image,
    HStack,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Link
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Form from 'react-validation/build/form';
import Logo from '../../carigawe.png';

const Login = (props) => {
    const [showPassword, setShowPassword] = React.useState();

    return (
        <>
        <Container minW={'100%'} bg={'gray.800'} color={'white'}>
            <Center maxW={'md'} minH={'100vh'} m={'auto'}>
                <Container px={{base: 15, sm: 30}} py={30} bg={'gray.700'} boxShadow='xl' borderRadius={10}>
                    <HStack ml={-3} justifyContent={'center'}>
                        <Image src={Logo} width={65} height={95}></Image>
                        <Text fontWeight={'semibold'} fontSize={24} color={'white'}>CariGawe</Text>
                    </HStack>

                    <Form>
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
                            <FormLabel fontSize={14}>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    borderColor={'gray.500'}
                                    fontSize={14} 
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder='Masukkan password'
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
                                Login
                            </Button>
                        </Box>
                    </Form>

                    <Box pt={5}>
                        <Text 
                            fontSize={14} 
                            align={'center'}>
                            Belum punya akun? 
                            <Link 
                                href='/register'
                                color={'blue.600'} 
                                _hover={{ color: 'blue.400', textDecoration: 'none' }}
                                _active={{ color: 'blue.400', textDecoration: 'none' }}> Registrasi</Link>
                        </Text>
                    </Box>
                </Container>
            </Center>
        </Container>
        </>
    );
}

export default Login;