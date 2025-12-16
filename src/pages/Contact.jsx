import { useState, useRef } from "react";
import {
	Box,
	Container,
	VStack,
	HStack,
	Text,
	Heading,
	SimpleGrid,
	Input,
	Textarea,
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Icon,
	useToast,
	Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
	Mail,
	Phone,
	MapPin,
	Send,
	CheckCircle,
	AlertCircle,
} from "lucide-react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import LoadingSpinner from "../components/LoadingSpinner";
import SectionHeading from "../components/SectionHeading";

const MotionBox = motion(Box);

const contactInfo = [
	{
		icon: Mail,
		label: "Email",
		value: "faizan@gmail.com",
		href: "mailto:faizan@gmail.com",
	},
	{
		icon: Phone,
		label: "Phone",
		value: "+92 3225756268",
		href: "tel:+923225756268",
	},
	{
		icon: MapPin,
		label: "Location",
		value: "Multan, Pakistan",
		href: null,
	},
];

const Contact = () => {
	const { data: personal, loading } = usePortfolioData("personal");
	const formRef = useRef();
	const toast = useToast();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Invalid email address";
		}

		if (!formData.subject.trim()) {
			newErrors.subject = "Subject is required";
		}

		if (!formData.message.trim()) {
			newErrors.message = "Message is required";
		} else if (formData.message.trim().length < 10) {
			newErrors.message = "Message must be at least 10 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			toast({
				title: "Validation Error",
				description: "Please fill in all required fields correctly.",
				status: "error",
				duration: 3000,
				isClosable: true,
				icon: <AlertCircle />,
			});
			return;
		}

		setIsSubmitting(true);

		try {
			// EmailJS integration
			// Replace these with your actual EmailJS credentials
			await emailjs.sendForm(
				"service_fltna1c", // Replace with your EmailJS service ID
				"template_h4u35wq", // Replace with your EmailJS template ID
				formRef.current,
				"tBxvwZaEi3LtHSDkM" // Replace with your EmailJS public key
			);

			toast({
				title: "Message Sent!",
				description: "Thank you for reaching out. I will get back to you soon.",
				status: "success",
				duration: 5000,
				isClosable: true,
				icon: <CheckCircle />,
			});

			// Reset form
			setFormData({
				name: "",
				email: "",
				subject: "",
				message: "",
			});
		} catch (error) {
			console.error("EmailJS Error:", error);
			toast({
				title: "Error Sending Message",
				description:
					"Something went wrong. Please try again or contact me directly via email.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	if (loading) {
		return <LoadingSpinner text="Loading contact info..." />;
	}

	return (
		<Box minH="100vh" pt={{ base: 20, md: 24 }}>
			<Container maxW="7xl" py={{ base: 12, md: 20 }}>
				<SectionHeading
					title="Contact Me"
					subtitle="Have a project in mind or want to collaborate? Feel free to reach out!"
				/>

				<SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12}>
					{/* Contact Info */}
					<MotionBox
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<VStack align="flex-start" spacing={8}>
							<Box>
								<Heading size="lg" mb={4}>
									Let's Talk
								</Heading>
								<Text color="gray.400" fontSize="lg">
									I'm always excited to work on new projects and help bring
									ideas to life. Whether you have a question or just want to say
									hi, I'll do my best to get back to you!
								</Text>
							</Box>

							<VStack spacing={6} align="stretch" w="full">
								{contactInfo.map((info, index) => (
									<MotionBox
										key={info.label}
										initial={{ opacity: 0, x: -30 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
									>
										<HStack
											as={info.href ? "a" : "div"}
											href={info.href}
											p={4}
											bg="dark.800"
											borderRadius="xl"
											border="1px solid"
											borderColor="whiteAlpha.100"
											spacing={4}
											_hover={{
												borderColor: "brand.400",
												transform: "translateX(5px)",
											}}
											transition="all 0.3s ease"
											cursor={info.href ? "pointer" : "default"}
										>
											<Flex
												w={12}
												h={12}
												align="center"
												justify="center"
												bg="brand.400"
												bgGradient="linear(to-br, brand.400, brand.600)"
												borderRadius="lg"
											>
												<Icon as={info.icon} boxSize={5} color="white" />
											</Flex>
											<VStack align="flex-start" spacing={0}>
												<Text fontSize="sm" color="gray.500">
													{info.label}
												</Text>
												<Text fontWeight="semibold" color="white">
													{info.value}
												</Text>
											</VStack>
										</HStack>
									</MotionBox>
								))}
							</VStack>
						</VStack>
					</MotionBox>

					{/* Contact Form */}
					<MotionBox
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<Box
							as="form"
							ref={formRef}
							onSubmit={handleSubmit}
							bg="dark.800"
							p={8}
							borderRadius="2xl"
							border="1px solid"
							borderColor="whiteAlpha.100"
						>
							<VStack spacing={6}>
								<SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} w="full">
									<FormControl isInvalid={!!errors.name}>
										<FormLabel color="gray.300">Name</FormLabel>
										<Input
											name="name"
											value={formData.name}
											onChange={handleChange}
											placeholder="Your name"
											bg="dark.900"
											border="1px solid"
											borderColor="whiteAlpha.200"
											_hover={{ borderColor: "whiteAlpha.400" }}
											_focus={{
												borderColor: "brand.400",
												boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
											}}
										/>
										<FormErrorMessage>{errors.name}</FormErrorMessage>
									</FormControl>

									<FormControl isInvalid={!!errors.email}>
										<FormLabel color="gray.300">Email</FormLabel>
										<Input
											name="email"
											type="email"
											value={formData.email}
											onChange={handleChange}
											placeholder="your@email.com"
											bg="dark.900"
											border="1px solid"
											borderColor="whiteAlpha.200"
											_hover={{ borderColor: "whiteAlpha.400" }}
											_focus={{
												borderColor: "brand.400",
												boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
											}}
										/>
										<FormErrorMessage>{errors.email}</FormErrorMessage>
									</FormControl>
								</SimpleGrid>

								<FormControl isInvalid={!!errors.subject}>
									<FormLabel color="gray.300">Subject</FormLabel>
									<Input
										name="subject"
										value={formData.subject}
										onChange={handleChange}
										placeholder="What's this about?"
										bg="dark.900"
										border="1px solid"
										borderColor="whiteAlpha.200"
										_hover={{ borderColor: "whiteAlpha.400" }}
										_focus={{
											borderColor: "brand.400",
											boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
										}}
									/>
									<FormErrorMessage>{errors.subject}</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={!!errors.message}>
									<FormLabel color="gray.300">Message</FormLabel>
									<Textarea
										name="message"
										value={formData.message}
										onChange={handleChange}
										placeholder="Your message..."
										rows={5}
										bg="dark.900"
										border="1px solid"
										borderColor="whiteAlpha.200"
										_hover={{ borderColor: "whiteAlpha.400" }}
										_focus={{
											borderColor: "brand.400",
											boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
										}}
									/>
									<FormErrorMessage>{errors.message}</FormErrorMessage>
								</FormControl>

								<Button
									type="submit"
									w="full"
									size="lg"
									bg="brand.400"
									color="white"
									rightIcon={<Send size={18} />}
									isLoading={isSubmitting}
									loadingText="Sending..."
									_hover={{
										bg: "brand.500",
										transform: "translateY(-2px)",
										boxShadow: "0 10px 40px -10px rgba(56, 178, 172, 0.5)",
									}}
									transition="all 0.3s ease"
								>
									Send Message
								</Button>
							</VStack>
						</Box>
					</MotionBox>
				</SimpleGrid>
			</Container>
		</Box>
	);
};

export default Contact;
