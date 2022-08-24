/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import {
  Heading,
  Image,
  Center,
  Text,
  Button,
  HStack,
  VStack,
  Flex,
  Box,
  Divider
} from '@chakra-ui/react'
import Cloudy from '../assets/Cloudy.png'
import Rainy from '../assets/Rain.png'
import Clear from '../assets/Clear.png'
import Storm from '../assets/Storm.png'
import Snow from '../assets/Snow.png'

export function WeatherCards (props) {
  const [icon, setIcon] = useState('')

  useEffect(() => {
    switch (props.weather) {
      case 'Clouds':
        setIcon(Cloudy)
        break
      case 'Rain':
        setIcon(Rainy)
        break
      case 'Drizzle':
        setIcon(Rainy)
        break
      case 'Snow':
        setIcon(Snow)
        break
      case 'Clear':
        setIcon(Clear)
        break
      case 'Thunderstorm':
        setIcon(Storm)
        break
    }
  }, [props.weather])

  const dateBuilder = (d) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const day = days[d.getDay()]
    const date = d.getDate()
    const month = months[d.getMonth()]
    const year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <Center pt={6} pr={'0px'}>
      <HStack
        w={['280px', '350px', '700px', '700px', '75vw']}
        mx={'2%'}
        h={'500px'}
        bg='#9da0a059'
        boxShadow={'dark-lg'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
        overflow-x={'hidden'}
      >
      <Flex w={'100%'} h={'100%'} justifyContent={'space-between'}>
        <HStack display={'flex'} wrap={'wrap'} justifyContent={'center'}>
          <VStack justifyContent={'center'} mr={['0px', '0px', '40px']} >
            <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={['center', 'center', 'flex-start']}>
              <Heading fontSize={['3xl', '3xl', '3xl', '3xl', '4xl']} fontFamily={'body'} maxW={'220px'}>
                {props.city}, {props.country}
              </Heading>
              <Text>
                {dateBuilder(new Date())}
              </Text>
            </Box>
            <Image
              maxW={'320px'}
              pr={'10px'}
              h={['150px', '150px', '250px']}
              src={icon}
              alt={'Weather Icon'}
              pos={'relative'}
            />
          </VStack>
          <VStack alignItems={['center', 'center', 'flex-start']} pr={['0px', '0px', '50px']} pb={['0px', '0px', '50px']}>
            <Button
            w={'40px'}
            h={'40px'}
            color={'black'}
            fontWeight={'bold'}
            fontSize={'2xl'}
            pb={'5px'}
            ml={'150px'}
            mb={'50px'}
            rounded={'full'}
            display={['none', 'none', 'flex', 'flex', 'none']}>
              +
            </Button>
            <Text
              textAlign={['start']}
              fontStyle='italic'
              fontWeight={'extrabold'}
              fontSize={['6xl', '6xl', '8xl']}
              w={'200px'}
              h={['80px', '80px', '120px']}
              pl={['38px', '38px', '0px']}
            >
              {props.temperature}°c
            </Text>
            <Text fontSize={'2xl'} fontWeight={'bold'}>
              {props.weather}
            </Text>
            <Button
            w={'40px'}
            h={'40px'}
            color={'black'}
            fontWeight={'bold'}
            fontSize={'2xl'}
            pb={'5px'}
            rounded={'full'}
            display={['flex', 'flex', 'none', 'none']}>
              +
            </Button>
          </VStack>
          <Divider orientation={['vertical']} w={'20px'} display={['none', 'none', 'none', 'none', 'none', 'block']}/>
        </HStack>
        <VStack display={'flex'} wrap={'wrap'} fontSize={['0px', '0px', '0px', '0px', '2xl', '3xl']} justifyContent={'center'} fontWeight={'bold'} fontStyle={'italic'}>
          <Text>
            Feels like: {props.feels}°c
          </Text>
          <Text>
            Low: {props.low}°c
          </Text>
          <Text>
            High: {props.high}°c
          </Text>
          <Text>
            Humidity: {props.humidity}%
          </Text>
          <Text>
            Wind: {props.wind}m/s
          </Text>
        </VStack>
        <Button
          w={'40px'}
          h={'40px'}
          color={'black'}
          fontWeight={'bold'}
          fontSize={'2xl'}
          pb={'5px'}
          rounded={'full'}
          display={['none', 'none', 'none', 'none', 'flex']}
          onClick={() => {
            props.setFav([
              {
                weather: props.weather
              }
            ])
          }}>
          +
        </Button>
      </Flex>
      </HStack>
    </Center>
  )
}

export default WeatherCards
