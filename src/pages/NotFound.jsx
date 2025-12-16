import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const MotionBox = motion(Box);

const NotFound = () => {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="lg">
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          textAlign="center"
        >
          <VStack spacing={6}>
            <Heading
              fontSize={{ base: '8xl', md: '9xl' }}
              bgGradient="linear(to-r, brand.400, brand.200)"
              bgClip="text"
              fontWeight="bold"
            >
              404
            </Heading>
            <Heading size="xl" color="white">
              Page Not Found
            </Heading>
            <Text color="gray.400" maxW="400px">
              Oops! The page you're looking for doesn't exist or has been moved.
            </Text>
            <Link to="/">
              <Button
                size="lg"
                bg="brand.400"
                color="white"
                leftIcon={<Home size={18} />}
                _hover={{
                  bg: 'brand.500',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.3s ease"
              >
                Back to Home
              </Button>
            </Link>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default NotFound;
