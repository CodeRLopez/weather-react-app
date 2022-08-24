import React, { useEffect, useState } from 'react'
import WeatherCards from './components/weatherCards'
import { Stack, Input, Box, VStack, Flex, Spinner, Center, HStack, Heading, Text, Image } from '@chakra-ui/react'

function App () {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState()
  const [loading, setLoading] = useState(false)
  const [fav, setFav] = useState([])

  const api = {
    key: process.env.REACT_APP_KEY,
    base: process.env.REACT_APP_BASE
  }

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result)
          setQuery('')
          console.log(weather)
        })
    }
  }

  const success = (position) => {
    fetch(
      `${api.base}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${api.key}`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result)
        setLoading(false)
      })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
    setLoading(true)
  }, [])

  useEffect(() => {
    console.log(fav)
  }, [fav])

  return (
    <Stack bgGradient='linear(to-b, #2980b9, #6dd5fa, #6dd5fa, #ffffff)' h="100vh">
      <Box display="flex" justifyContent="center">
        <Input
          placeholder="Search a place"
          w={['60%', '60%', '45%', '45%', '30%']}
          bg="white"
          border="none"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </Box>

      <Flex
        h={'50vh'}
        justifyContent={'center'}
        display={loading ? 'flex' : 'none'}
        alignItems={'center'}
      >
        <Spinner w={'100px'} h={'100px'} color="#E9E9EB" thickness="15px" />
      </Flex>

      <VStack display={loading ? 'none' : 'flex'}>
        <WeatherCards
          city={weather?.name}
          country={weather?.sys.country}
          weather={weather?.weather[0].main}
          temperature={Math.round(weather?.main.temp)}
          feels={Math.round(weather?.main.feels_like)}
          low={weather?.main.temp_min}
          high={weather?.main.temp_max}
          humidity={weather?.main.humidity}
          wind={weather?.wind.speed}
          setFav={setFav}
          fav={fav}
        />
        <Center pt={6} pr={'0px'}>
          {fav.map((card) => {
            return (
            <HStack
              w={'200px'}
              mx={'2%'}
              h={'220px'}
              bg='#9da0a059'
              boxShadow={'dark-lg'}
              rounded={'lg'}
              textAlign={'center'}
              justifyContent={'center'}
              key={card.key}
            >
              <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
                <Text fontWeight={'bold'} maxW={'100px'} h={'50px'}>
                  {card.city}, {card.country}
                </Text>
                <Image w={'90px'} h={'80px'} src={card.icon}/>
                <Heading>
                  {card.temperature}°c
                </Heading>
                <Box>
                {card.weather}
                </Box>
              </Box>
            </HStack>
            )
          })}
        </Center>
      </VStack>
    </Stack>
  )
}

export default App
