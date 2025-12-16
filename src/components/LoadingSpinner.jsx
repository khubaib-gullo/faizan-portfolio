import { Box, Spinner, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="50vh"
    >
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="dark.700"
          color="brand.400"
          size="xl"
        />
        <Text color="gray.400" fontSize="sm">
          {text}
        </Text>
      </VStack>
    </MotionBox>
  );
};

export default LoadingSpinner;
