import React, { useEffect, useState } from 'react'
import WeatherCards from './components/weatherCards'
import { Stack, Input, Box, VStack, Flex, Spinner } from '@chakra-ui/react'

function App () {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState()
  const [loading, setLoading] = useState(false)

  const api = {
    key: '35a517189df8b523bf85a9cfdbfe1160',
    base: 'https://api.openweathermap.org/data/2.5/'
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

  return (
    <Stack bg="#219ebc" h="100vh">
      <Box display="flex" justifyContent="center">
        <Input
          placeholder="Search a place"
          w="30%"
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
        />
      </VStack>
    </Stack>
  )
}

export default App