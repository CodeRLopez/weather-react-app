/* eslint-disable no-unused-vars */
import { Box, HStack, Heading, Text, Image } from '@chakra-ui/react'
import {
  mainCardContainer,
  infoContainer,
  cityAndCountryText,
  image
} from './favCardsStyles'

export function FavCards (props) {
  return (
    <HStack {...mainCardContainer} key={props.key}>
      <Box {...infoContainer}>
        <Text {...cityAndCountryText}>
          {props.city}, {props.country}
        </Text>
        <Image {...image} src={props.img} />
        <Heading>{props.temperature}°c</Heading>
        <Box>{props.weather}</Box>
      </Box>
    </HStack>
  )
}
