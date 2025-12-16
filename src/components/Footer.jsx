import {
  Box,
  Container,
  Stack,
  Text,
  IconButton,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const MotionBox = motion(Box);

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

const Footer = () => {
  const { data: personal } = usePortfolioData('personal');

  const socialLinks = personal?.socialLinks || {};

  return (
    <Box
      bg="dark.900"
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      py={8}
    >
      <Container maxW="7xl">
        <Stack spacing={6} align="center">
          <HStack spacing={4}>
            {Object.entries(socialLinks).map(([key, url], index) => {
              const Icon = socialIcons[key];
              if (!Icon) return null;
              
              return (
                <MotionBox
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <IconButton
                    as="a"
                    href={key === 'email' ? `mailto:${url}` : url}
                    target={key !== 'email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={key}
                    icon={<Icon size={20} />}
                    variant="ghost"
                    color="gray.400"
                    _hover={{
                      color: 'brand.400',
                      bg: 'whiteAlpha.100',
                      transform: 'translateY(-3px)',
                    }}
                    transition="all 0.3s ease"
                  />
                </MotionBox>
              );
            })}
          </HStack>

          <Divider borderColor="whiteAlpha.100" w="200px" />

          <Text
            fontSize="sm"
            color="gray.500"
            display="flex"
            alignItems="center"
            gap={2}
          >
            Made with <Heart size={14} color="#38b2ac" fill="#38b2ac" /> by{' '}
            <Text as="span" color="brand.400" fontWeight="semibold">
              {personal?.name || 'Developer'}
            </Text>
          </Text>

          <Text fontSize="xs" color="gray.600">
            © {new Date().getFullYear()} All rights reserved.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
