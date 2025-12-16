import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Badge,
  SimpleGrid,
  Icon,
  Flex,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award, CheckCircle } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import LoadingSpinner from '../components/LoadingSpinner';
import SectionHeading from '../components/SectionHeading';

const MotionBox = motion(Box);

const levelColors = {
  University: 'teal',
  Intermediate: 'blue',
  Matriculation: 'purple',
};

const levelIcons = {
  University: '🎓',
  Intermediate: '📚',
  Matriculation: '📖',
};

const Education = () => {
  const { data: education, loading } = usePortfolioData('education');

  if (loading) {
    return <LoadingSpinner text="Loading education data..." />;
  }

  return (
    <Box minH="100vh" pt={{ base: 20, md: 24 }}>
      <Container maxW="7xl" py={{ base: 12, md: 20 }}>
        <SectionHeading
          title="Education"
          subtitle="My academic journey from matriculation to university, building a strong foundation in technology and science."
        />

        <VStack spacing={8} align="stretch">
          {education?.map((edu, index) => (
            <MotionBox
              key={edu.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Box
                bg="dark.800"
                borderRadius="2xl"
                border="1px solid"
                borderColor="whiteAlpha.100"
                overflow="hidden"
                position="relative"
                _hover={{
                  borderColor: 'brand.400',
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 40px -20px rgba(56, 178, 172, 0.3)',
                }}
                transition="all 0.3s ease"
              >
                {/* Header Strip */}
                <Box
                  h="4px"
                  bgGradient="linear(to-r, brand.400, brand.200)"
                />

                <Box p={{ base: 6, md: 8 }}>
                  <Flex
                    direction={{ base: 'column', lg: 'row' }}
                    gap={6}
                    align={{ base: 'flex-start', lg: 'center' }}
                    justify="space-between"
                  >
                    <HStack spacing={4} align="flex-start">
                      <Flex
                        w={16}
                        h={16}
                        align="center"
                        justify="center"
                        bg="brand.400"
                        bgGradient="linear(to-br, brand.400, brand.600)"
                        borderRadius="xl"
                        fontSize="2xl"
                        flexShrink={0}
                      >
                        {levelIcons[edu.level]}
                      </Flex>
                      
                      <VStack align="flex-start" spacing={2}>
                        <Badge
                          colorScheme={levelColors[edu.level]}
                          fontSize="xs"
                          px={3}
                          py={1}
                          borderRadius="full"
                        >
                          {edu.level}
                        </Badge>
                        
                        <Heading size="md" color="white">
                          {edu.degree}
                        </Heading>
                        
                        <HStack spacing={2} color="brand.400" fontWeight="semibold">
                          <Icon as={GraduationCap} boxSize={4} />
                          <Text>{edu.institution}</Text>
                        </HStack>
                      </VStack>
                    </HStack>

                    <VStack align={{ base: 'flex-start', lg: 'flex-end' }} spacing={2}>
                      <HStack color="gray.400" fontSize="sm">
                        <Icon as={Calendar} boxSize={4} />
                        <Text>{edu.year}</Text>
                      </HStack>
                      <HStack color="gray.400" fontSize="sm">
                        <Icon as={MapPin} boxSize={4} />
                        <Text>{edu.location}</Text>
                      </HStack>
                      <Badge
                        bg="dark.700"
                        color="brand.400"
                        fontSize="sm"
                        px={3}
                        py={1}
                        borderRadius="md"
                      >
                        {edu.grade}
                      </Badge>
                    </VStack>
                  </Flex>

                  <Text color="gray.400" mt={4}>
                    {edu.description}
                  </Text>

                  {edu.achievements && edu.achievements.length > 0 && (
                    <Box mt={6}>
                      <HStack mb={3}>
                        <Icon as={Award} boxSize={5} color="brand.400" />
                        <Text fontWeight="semibold" color="white">
                          Achievements
                        </Text>
                      </HStack>
                      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={3}>
                        {edu.achievements.map((achievement, achIndex) => (
                          <HStack
                            key={achIndex}
                            bg="dark.700"
                            px={4}
                            py={2}
                            borderRadius="lg"
                            border="1px solid"
                            borderColor="whiteAlpha.100"
                          >
                            <Icon as={CheckCircle} boxSize={4} color="brand.400" />
                            <Text fontSize="sm" color="gray.300">
                              {achievement}
                            </Text>
                          </HStack>
                        ))}
                      </SimpleGrid>
                    </Box>
                  )}
                </Box>
              </Box>
            </MotionBox>
          ))}
        </VStack>

        {/* Timeline connector */}
        <Box
          display={{ base: 'none', lg: 'block' }}
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
          w="2px"
          h="100%"
          bg="brand.400"
          opacity={0.2}
          top={0}
          zIndex={-1}
        />
      </Container>
    </Box>
  );
};

export default Education;
