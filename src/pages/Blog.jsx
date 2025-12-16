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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import LoadingSpinner from "../components/LoadingSpinner";
import SectionHeading from "../components/SectionHeading";

const MotionBox = motion(Box);

const Blog = () => {
	const { data: blogs, loading } = usePortfolioData("blogs");

	if (loading) {
		return <LoadingSpinner text="Loading blog posts..." />;
	}

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString("en-US", options);
	};

	return (
		<Box minH="100vh" pt={{ base: 20, md: 24 }}>
			<Container maxW="7xl" py={{ base: 12, md: 20 }}>
				<SectionHeading
					title="Blog"
					subtitle="Thoughts, tutorials, and insights about web development and technology."
				/>

				<SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
					{blogs?.map((post, index) => (
						<MotionBox
							key={post.id}
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
								cursor="pointer"
								role="group"
								_hover={{
									borderColor: "brand.400",
									transform: "translateY(-5px)",
									boxShadow: "0 20px 40px -20px rgba(56, 178, 172, 0.3)",
								}}
								transition="all 0.3s ease"
							>
								{/* Image */}
								<Box position="relative" overflow="hidden">
									<Image
										src={post.image}
										alt={post.title}
										w="full"
										h="220px"
										objectFit="cover"
										transition="transform 0.5s ease"
										_groupHover={{ transform: "scale(1.05)" }}
									/>
									<Box
										position="absolute"
										inset={0}
										bg="linear-gradient(to top, rgba(13, 17, 23, 0.9), transparent 50%)"
									/>
									<Badge
										position="absolute"
										top={4}
										left={4}
										bg="brand.400"
										color="white"
										px={3}
										py={1}
										borderRadius="full"
										fontSize="xs"
										fontWeight="semibold"
									>
										{post.category}
									</Badge>
								</Box>

								{/* Content */}
								<Box p={6}>
									<VStack align="flex-start" spacing={4}>
										{/* Meta Info */}
										<HStack spacing={4} color="gray.500" fontSize="sm">
											<HStack spacing={1}>
												<Icon as={Calendar} boxSize={4} />
												<Text>{formatDate(post.date)}</Text>
											</HStack>
											<HStack spacing={1}>
												<Icon as={Clock} boxSize={4} />
												<Text>{post.readTime}</Text>
											</HStack>
										</HStack>

										{/* Title */}
										<Heading
											size="md"
											color="white"
											noOfLines={2}
											_groupHover={{ color: "brand.400" }}
											transition="color 0.3s ease"
										>
											{post.title}
										</Heading>

										{/* Excerpt */}
										<Text color="gray.400" noOfLines={3} fontSize="sm">
											{post.excerpt}
										</Text>

										{/* Tags */}
										<Flex wrap="wrap" gap={2}>
											{post.tags?.map((tag) => (
												<Badge
													key={tag}
													bg="dark.700"
													color="gray.400"
													fontSize="xs"
													px={2}
													py={1}
													borderRadius="md"
												>
													#{tag}
												</Badge>
											))}
										</Flex>

										{/* Author and Read More */}
										<Flex
											w="full"
											justify="space-between"
											align="center"
											pt={2}
										>
											<HStack spacing={2}>
												<Icon as={User} boxSize={4} color="gray.500" />
												<Text fontSize="sm" color="gray.500">
													{post.author}
												</Text>
											</HStack>
											<HStack
												spacing={1}
												color="brand.400"
												fontSize="sm"
												fontWeight="semibold"
												_groupHover={{ transform: "translateX(5px)" }}
												transition="transform 0.3s ease"
											>
												<Text>Read More</Text>
												<Icon as={ArrowRight} boxSize={4} />
											</HStack>
										</Flex>
									</VStack>
								</Box>
							</Box>
						</MotionBox>
					))}
				</SimpleGrid>
			</Container>
		</Box>
	);
};

export default Blog;
