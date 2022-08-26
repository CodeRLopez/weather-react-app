/* eslint-disable no-unused-vars */
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
import { cardContainer, mainFlexContainer, weatherImageAndTemp, locationAndImage, locationDate, cityAndCountry, image, tempWeatherAndButton, tabletFavButton, temperature, weather, phoneFavButton, divider, extraWeatherInfo, desktopFavButton } from './weatherCardsStyles'
import Cloudy from '../assets/Cloudy.png'
import Rainy from '../assets/Rain.png'
import Clear from '../assets/Clear.png'
import Storm from '../assets/Storm.png'
import Snow from '../assets/Snow.png'
import { dateBuilder } from '../utils/dateBuilder'

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

  const onClickHandler = () => {
    const numArray = props.fav.length
    numArray < 6
      ? props.setFav([
        ...props.fav,
        {
          icon,
          country: props.country,
          city: props.city,
          temperature: props.temperature,
          weather: props.weather,
          key: Math.random().toString(32).substring(2, 9)
        }
      ])
      : props.setFav(props.fav)
  }

  return (
    <Center pt={6} pr={'0px'}>
      <HStack {...cardContainer}>
      <Flex {...mainFlexContainer}>
        <HStack {...weatherImageAndTemp}>
          <VStack {...locationAndImage}>
            <Box {...locationDate}>
              <Heading {...cityAndCountry}>
                {props.city}, {props.country}
              </Heading>
              <Text>
                {dateBuilder(new Date())}
              </Text>
            </Box>
            <Image
              {...image}
              src={icon}
            />
          </VStack>
          <VStack {...tempWeatherAndButton}>
            <Button
            {...tabletFavButton}
            onClick={() => { onClickHandler() }}>
              ⭐
            </Button>
            <Text
              {...temperature}
            >
              {props.temperature}°c
            </Text>
            <Text {...weather}>
              {props.weather}
            </Text>
            <Button
            {...phoneFavButton}
            onClick={() => { onClickHandler() }}>
              ⭐
            </Button>
          </VStack>
          <Divider {...divider}/>
        </HStack>
        <VStack {...extraWeatherInfo}>
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
          {...desktopFavButton}
          onClick={() => { onClickHandler() }}>
          ⭐
        </Button>
      </Flex>
      </HStack>
    </Center>
  )
}

export default WeatherCards
