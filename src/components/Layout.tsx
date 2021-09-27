import { Container, Flex, Text } from 'UI'
import Logo from 'common/logo.svg'

export const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <Flex css={{ alignItems: 'center', py: '$32' }}>
        <Logo />
        <Text as="h1" size="md" fontWeight="medium" css={{ ml: '$8' }}>
          Significa Bug Reporter
        </Text>
      </Flex>
      {children}
    </Container>
  )
}
