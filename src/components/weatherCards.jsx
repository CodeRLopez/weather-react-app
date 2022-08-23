/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import {
  Heading,
  Image,
  Box,
  Center,
  Text,
  Button,
  useColorModeValue
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
    <Center py={6}>
      <Box
        w={'300px'}
        h={'450px'}
        bg='#9da0a059'
        boxShadow={'dark-lg'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Box display={'flex'} justifyContent='center'>
        <Image
          w={'150px'}
          src={icon}
          alt={'Weather Icon'}
          pos={'relative'}
        />
        </Box>
        <Text fontSize={'lg'} fontWeight='bold' mb={'15px'}>
          {props.weather}
        </Text>
        <Heading fontSize={'2xl'} fontFamily={'body'}>
        {props.city}, {props.country}
        </Heading>
        <Text
          mt='10px'
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
          fontStyle='italic'
          fontWeight={'black'}
          fontSize={'6xl'}
        >
          {props.temperature}°c
        </Text>
        <Text>
        {dateBuilder(new Date())}
        </Text>
        <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            color={'white'}
            mt={'10px'}>
            ⭐
          </Button>
      </Box>
    </Center>
  )
}

export default WeatherCards
