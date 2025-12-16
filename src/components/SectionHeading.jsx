import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionVStack = motion(VStack);

const SectionHeading = ({ title, subtitle, align = 'center' }) => {
  return (
    <MotionVStack
      spacing={3}
      align={align}
      mb={12}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Box position="relative">
        <Heading
          as="h2"
          size="xl"
          bgGradient="linear(to-r, brand.400, brand.200)"
          bgClip="text"
          fontWeight="bold"
        >
          {title}
        </Heading>
        <Box
          position="absolute"
          bottom="-8px"
          left={align === 'center' ? '50%' : '0'}
          transform={align === 'center' ? 'translateX(-50%)' : 'none'}
          w="60px"
          h="3px"
          bgGradient="linear(to-r, brand.400, brand.200)"
          borderRadius="full"
        />
      </Box>
      {subtitle && (
        <Text color="gray.400" maxW="600px" textAlign={align}>
          {subtitle}
        </Text>
      )}
    </MotionVStack>
  );
};

export default SectionHeading;
