import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	Box,
	Flex,
	HStack,
	IconButton,
	Button,
	useDisclosure,
	Stack,
	Container,
	Text,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Menu,
	X,
	Home,
	GraduationCap,
	Briefcase,
	Mail,
	BookOpen,
} from "lucide-react";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const navItems = [
	{ name: "Home", path: "/", icon: Home },
	{ name: "Education", path: "/education", icon: GraduationCap },
	{ name: "Experience", path: "/experience", icon: Briefcase },
	{ name: "Contact", path: "/contact", icon: Mail },
	{ name: "Blog", path: "/blog", icon: BookOpen },
];

const Navbar = () => {
	const { isOpen, onToggle } = useDisclosure();
	const location = useLocation();

	return (
		<Box
			position="fixed"
			top={0}
			left={0}
			right={0}
			zIndex={100}
			bg="rgba(13, 17, 23, 0.8)"
			backdropFilter="blur(20px)"
			borderBottom="1px solid"
			borderColor="whiteAlpha.100"
		>
			<Container maxW="7xl">
				<Flex h={16} alignItems="center" justifyContent="space-between">
					<MotionFlex
						alignItems="center"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<Link to="/">
							<Text
								fontSize="xl"
								fontWeight="bold"
								bgGradient="linear(to-r, brand.400, brand.200)"
								bgClip="text"
								letterSpacing="tight"
							>
								Muhammad Faizan
							</Text>
						</Link>
					</MotionFlex>

					<HStack spacing={1} display={{ base: "none", md: "flex" }}>
						{navItems.map((item, index) => {
							const Icon = item.icon;
							const isActive = location.pathname === item.path;

							return (
								<MotionBox
									key={item.name}
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
								>
									<Link to={item.path}>
										<Button
											variant="ghost"
											size="sm"
											leftIcon={<Icon size={16} />}
											color={isActive ? "brand.400" : "gray.400"}
											bg={isActive ? "whiteAlpha.100" : "transparent"}
											_hover={{
												bg: "whiteAlpha.100",
												color: "brand.400",
											}}
										>
											{item.name}
										</Button>
									</Link>
								</MotionBox>
							);
						})}
					</HStack>

					<IconButton
						display={{ base: "flex", md: "none" }}
						onClick={onToggle}
						icon={isOpen ? <X size={20} /> : <Menu size={20} />}
						variant="ghost"
						aria-label="Toggle Navigation"
					/>
				</Flex>

				<AnimatePresence>
					{isOpen && (
						<MotionBox
							display={{ md: "none" }}
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							overflow="hidden"
						>
							<Stack pb={4} spacing={2}>
								{navItems.map((item) => {
									const Icon = item.icon;
									const isActive = location.pathname === item.path;

									return (
										<Link key={item.name} to={item.path} onClick={onToggle}>
											<Button
												w="full"
												variant="ghost"
												justifyContent="flex-start"
												leftIcon={<Icon size={18} />}
												color={isActive ? "brand.400" : "gray.400"}
												bg={isActive ? "whiteAlpha.100" : "transparent"}
											>
												{item.name}
											</Button>
										</Link>
									);
								})}
							</Stack>
						</MotionBox>
					)}
				</AnimatePresence>
			</Container>
		</Box>
	);
};

export default Navbar;
