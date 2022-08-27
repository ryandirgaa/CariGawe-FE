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
    Textarea,
    Divider,
    Flex,
    Stack
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, SearchIcon, CloseIcon } from '@chakra-ui/icons';
import Form from 'react-validation/build/form';
import axios from 'axios';

const Register = (props) => {
    const [showPassword, setShowPassword] = React.useState();

    const [searchResult, setSearchResult] = React.useState([])
    const [inputLocation, setInputLocation] = React.useState('')
    const [inputLat, setInputLat] = React.useState(0)
    const [inputLon, setInputLon] = React.useState(0)

    const handleSearch = async (e) => {
        console.log(inputLocation)
        try{
          let res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&limit=10&q=${inputLocation}`)
          setSearchResult(res.data)
          console.log(res.data)
        } catch(err) {
          console.log(err)
        }
    }
    
    const handleSelectLocation = (val) => {
        setInputLocation(val.display_name)
        setInputLat(val.lat)
        setInputLon(val.lon)
        setSearchResult([])
    }
  
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
                            <FormLabel fontSize={14}>Tanggal Lahir</FormLabel>
                                <Input 
                                    borderColor={'gray.500'}
                                    fontSize={14}
                                    type={'date'}
                                    id= 'birthdate'
                                    name='birthdate'/>
                        </FormControl>

                        {/* <FormControl pt={5} isRequired>
                            <FormLabel fontSize={14}>Lokasi</FormLabel>
                            <InputGroup>
                                <Input 
                                    borderColor={'gray.500'}
                                    fontSize={14}
                                    autoComplete={'off'}
                                    onKeyDown={(e) => {if(e.keyCode === 13){handleSearch()}}}
                                    value={inputLocation}
                                    onChange={(e) => setInputLocation(e.target.value)}
                                    id= 'inputLocation'
                                    name='inputLocation'/>
                                <InputRightElement h={'full'}>
                                    <Button
                                        onClick={handleSearch}
                                        variant={'ghost'}>
                                        <SearchIcon/>
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            
                            {searchResult.length !== 0 && (
                                <Box
                                    px={2}
                                    py={4}
                                    m={'auto'}
                                    display={'flex'}
                                    fontSize={14}
                                    bg={'white'}
                                    color={'black'}
                                    width={'100%'}>
                                    <Stack>
                                        {searchResult.map((val,idx) => (
                                        <Container 
                                            py={2}
                                            key={idx} 
                                            cursor={'pointer'} 
                                            onClick={() => handleSelectLocation(val)}
                                            _hover={{bg: 'blue.400', color: 'white'}}>
                                            {val.display_name}
                                        </Container>
                                        ))}
                                    </Stack>
                                </Box>
                            )}
                        </FormControl> */}

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