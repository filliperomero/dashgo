import { Text, Link as ChakraLink, Icon, LinkProps } from '@chakra-ui/react'
import { ElementType } from 'react'

import ActiveLink from '../ActiveLink'

type NavLinkProps = {
  icon: ElementType
  href: string
  children: string
} & LinkProps

const NavLink = ({ icon, href, children, ...rest }: NavLinkProps) => {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  )
}

export default NavLink