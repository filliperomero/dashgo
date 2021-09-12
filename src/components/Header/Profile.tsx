import { Box, Flex, Text, Avatar } from '@chakra-ui/react'

type ProfileProps = {
  showProfileData?: boolean
}

const Profile = ({ showProfileData = true }: ProfileProps) => {
  return (
    <Flex align="center">
      { showProfileData && (<Box mr="4" textAlign="right">
          <Text>Fillipe Romero</Text>
          <Text color="gray.300" fontSize="small">fillipe.romero@gmail.com</Text>
        </Box>
      )}

      <Avatar size="md" name="Fillipe Romero" src="https://github.com/filliperomero.png" />
    </Flex>
  )
}

export default Profile