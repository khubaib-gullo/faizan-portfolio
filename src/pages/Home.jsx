import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  SimpleGrid,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Palette, Rocket, Download } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import LoadingSpinner from '../components/LoadingSpinner';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const features = [
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Writing maintainable and scalable code with best practices',
  },
  {
    icon: Palette,
    title: 'Creative Design',
    description: 'Crafting beautiful user interfaces with attention to detail',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Building fast and optimized web applications',
  },
];

const Home = () => {
  const { data: personal, loading } = usePortfolioData('personal');

  if (loading) {
    return <LoadingSpinner text="Loading profile..." />;
  }

  return (
    <Box minH="100vh" pt={{ base: 20, md: 24 }}>
      {/* Hero Section */}
      <Container maxW="7xl" py={{ base: 12, md: 20 }}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="space-between"
          gap={12}
        >
          <MotionVStack
            align={{ base: 'center', lg: 'flex-start' }}
            spacing={6}
            flex={1}
            textAlign={{ base: 'center', lg: 'left' }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color="brand.400"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Welcome to my portfolio
            </Text>
            
            <Heading
              as="h1"
              size={{ base: '2xl', md: '3xl', lg: '4xl' }}
              fontWeight="bold"
              lineHeight="shorter"
            >
              Hi, I'm{' '}
              <Text
                as="span"
                bgGradient="linear(to-r, brand.400, brand.200)"
                bgClip="text"
              >
                {personal?.name}
              </Text>
            </Heading>

            <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.400">
              {personal?.title}
            </Text>

            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.500"
              maxW="500px"
            >
              {personal?.bio}
            </Text>

            <HStack spacing={4} pt={4}>
              <Link to="/contact">
                <Button
                  size="lg"
                  bg="brand.400"
                  color="white"
                  rightIcon={<ArrowRight size={18} />}
                  _hover={{
                    bg: 'brand.500',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 40px -10px rgba(56, 178, 172, 0.5)',
                  }}
                  transition="all 0.3s ease"
                >
                  Get in Touch
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                borderColor="brand.400"
                color="brand.400"
                leftIcon={<Download size={18} />}
                _hover={{
                  bg: 'brand.400',
                  color: 'white',
                }}
              >
                Resume
              </Button>
            </HStack>
          </MotionVStack>

          <MotionBox
            flex={1}
            display="flex"
            justifyContent="center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box position="relative">
              <Box
                position="absolute"
                top="-20px"
                right="-20px"
                w="100%"
                h="100%"
                borderRadius="2xl"
                border="2px solid"
                borderColor="brand.400"
                opacity={0.3}
              />
              <Image
                src={personal?.avatar}
                alt={personal?.name}
                boxSize={{ base: '280px', md: '350px', lg: '400px' }}
                objectFit="cover"
                borderRadius="2xl"
                border="3px solid"
                borderColor="brand.400"
                boxShadow="0 20px 60px -20px rgba(56, 178, 172, 0.4)"
              />
              <Box
                position="absolute"
                bottom="-10px"
                left="-10px"
                bg="dark.800"
                border="1px solid"
                borderColor="whiteAlpha.200"
                borderRadius="xl"
                px={4}
                py={2}
              >
                <Text fontSize="sm" color="brand.400" fontWeight="semibold">
                  {personal?.tagline}
                </Text>
              </Box>
            </Box>
          </MotionBox>
        </Flex>
      </Container>

      {/* Features Section */}
      <Box bg="dark.800" py={{ base: 16, md: 24 }}>
        <Container maxW="7xl">
          <VStack spacing={12}>
            <MotionVStack
              spacing={4}
              textAlign="center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Heading size="xl">What I Do</Heading>
              <Text color="gray.400" maxW="600px">
                I specialize in building modern web applications with a focus on user experience and performance.
              </Text>
            </MotionVStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              {features.map((feature, index) => (
                <MotionBox
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <VStack
                    p={8}
                    bg="dark.900"
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    spacing={4}
                    align="center"
                    textAlign="center"
                    _hover={{
                      borderColor: 'brand.400',
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 40px -20px rgba(56, 178, 172, 0.3)',
                    }}
                    transition="all 0.3s ease"
                  >
                    <Flex
                      w={16}
                      h={16}
                      align="center"
                      justify="center"
                      bg="brand.400"
                      bgGradient="linear(to-br, brand.400, brand.600)"
                      borderRadius="xl"
                    >
                      <Icon as={feature.icon} boxSize={8} color="white" />
                    </Flex>
                    <Heading size="md">{feature.title}</Heading>
                    <Text color="gray.400">{feature.description}</Text>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxW="7xl" py={{ base: 16, md: 24 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <VStack
            spacing={6}
            p={{ base: 8, md: 12 }}
            bg="dark.800"
            borderRadius="2xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
            textAlign="center"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top="-50%"
              right="-10%"
              w="400px"
              h="400px"
              bg="brand.400"
              filter="blur(150px)"
              opacity={0.1}
              borderRadius="full"
            />
            <Heading size="lg">Ready to work together?</Heading>
            <Text color="gray.400" maxW="500px">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </Text>
            <Link to="/contact">
              <Button
                size="lg"
                bg="brand.400"
                color="white"
                rightIcon={<ArrowRight size={18} />}
                _hover={{
                  bg: 'brand.500',
                  transform: 'translateY(-2px)',
                }}
              >
                Let's Talk
              </Button>
            </Link>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Home;
