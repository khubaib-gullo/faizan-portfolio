import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Badge,
  SimpleGrid,
  Image,
  Icon,
  Flex,
  Progress,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Briefcase, Code } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import LoadingSpinner from '../components/LoadingSpinner';
import SectionHeading from '../components/SectionHeading';

const MotionBox = motion(Box);

const Experience = () => {
  const { data: experience, loading } = usePortfolioData('experience');

  if (loading) {
    return <LoadingSpinner text="Loading experience data..." />;
  }

  const { projects, skills } = experience || { projects: [], skills: [] };

  return (
    <Box minH="100vh" pt={{ base: 20, md: 24 }}>
      <Container maxW="7xl" py={{ base: 12, md: 20 }}>
        <SectionHeading
          title="Experience"
          subtitle="Showcasing my projects and technical skills that I've developed over the years."
        />

        <Tabs variant="soft-rounded" colorScheme="teal">
          <TabList
            mb={8}
            bg="dark.800"
            p={2}
            borderRadius="xl"
            display="inline-flex"
            border="1px solid"
            borderColor="whiteAlpha.100"
          >
            <Tab
              _selected={{ bg: 'brand.400', color: 'white' }}
              color="gray.400"
            >
              <Icon as={Briefcase} boxSize={4} mr={2} />
              Projects
            </Tab>
            <Tab
              _selected={{ bg: 'brand.400', color: 'white' }}
              color="gray.400"
            >
              <Icon as={Code} boxSize={4} mr={2} />
              Skills
            </Tab>
          </TabList>

          <TabPanels>
            {/* Projects Panel */}
            <TabPanel p={0}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                {projects?.map((project, index) => (
                  <MotionBox
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Box
                      bg="dark.800"
                      borderRadius="2xl"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                      overflow="hidden"
                      _hover={{
                        borderColor: 'brand.400',
                        transform: 'translateY(-5px)',
                        boxShadow: '0 20px 40px -20px rgba(56, 178, 172, 0.3)',
                      }}
                      transition="all 0.3s ease"
                    >
                      <Box position="relative" overflow="hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          w="full"
                          h="200px"
                          objectFit="cover"
                          transition="transform 0.5s ease"
                          _groupHover={{ transform: 'scale(1.1)' }}
                        />
                        {project.featured && (
                          <Badge
                            position="absolute"
                            top={4}
                            right={4}
                            bg="brand.400"
                            color="white"
                            px={3}
                            py={1}
                            borderRadius="full"
                          >
                            Featured
                          </Badge>
                        )}
                        <Box
                          position="absolute"
                          inset={0}
                          bg="linear-gradient(to top, rgba(13, 17, 23, 0.9), transparent)"
                        />
                      </Box>

                      <Box p={6}>
                        <Heading size="md" mb={2} color="white">
                          {project.title}
                        </Heading>
                        <Text color="gray.400" fontSize="sm" mb={4} noOfLines={3}>
                          {project.description}
                        </Text>

                        <Flex wrap="wrap" gap={2} mb={4}>
                          {project.technologies?.map((tech) => (
                            <Badge
                              key={tech}
                              bg="dark.700"
                              color="brand.400"
                              fontSize="xs"
                              px={2}
                              py={1}
                              borderRadius="md"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </Flex>

                        <HStack spacing={2}>
                          <IconButton
                            as="a"
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Live Demo"
                            icon={<ExternalLink size={18} />}
                            variant="ghost"
                            size="sm"
                            color="gray.400"
                            _hover={{ color: 'brand.400', bg: 'whiteAlpha.100' }}
                          />
                          <IconButton
                            as="a"
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            icon={<Github size={18} />}
                            variant="ghost"
                            size="sm"
                            color="gray.400"
                            _hover={{ color: 'brand.400', bg: 'whiteAlpha.100' }}
                          />
                        </HStack>
                      </Box>
                    </Box>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </TabPanel>

            {/* Skills Panel */}
            <TabPanel p={0}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {skills?.map((category, index) => (
                  <MotionBox
                    key={category.category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Box
                      bg="dark.800"
                      borderRadius="2xl"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                      p={6}
                      h="full"
                      _hover={{
                        borderColor: 'brand.400',
                      }}
                      transition="all 0.3s ease"
                    >
                      <Heading size="md" mb={6} color="brand.400">
                        {category.category}
                      </Heading>

                      <VStack spacing={5} align="stretch">
                        {category.items?.map((skill, skillIndex) => (
                          <MotionBox
                            key={skill.name}
                            initial={{ opacity: 0, width: 0 }}
                            whileInView={{ opacity: 1, width: '100%' }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay: skillIndex * 0.1 + 0.3,
                            }}
                          >
                            <Flex justify="space-between" mb={2}>
                              <Text fontSize="sm" color="white">
                                {skill.name}
                              </Text>
                              <Text fontSize="sm" color="brand.400">
                                {skill.level}%
                              </Text>
                            </Flex>
                            <Progress
                              value={skill.level}
                              size="sm"
                              colorScheme="teal"
                              bg="dark.700"
                              borderRadius="full"
                              sx={{
                                '& > div': {
                                  bgGradient: 'linear(to-r, brand.400, brand.200)',
                                },
                              }}
                            />
                          </MotionBox>
                        ))}
                      </VStack>
                    </Box>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

export default Experience;
