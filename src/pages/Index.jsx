import React, { useState, useEffect } from "react";
import { Container, VStack, Box, Text, Button, Image, HStack, Select, useToast } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const flashcardsData = [
  {
    id: 1,
    front: {
      text: "What is the capital of France?",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwYXJpc3xlbnwwfHx8fDE3MTc1MjIzNjJ8MA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    back: {
      text: "The capital of France is Paris.",
      image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxlaWZmZWwlMjB0b3dlcnxlbnwwfHx8fDE3MTc1MjIzNjJ8MA&ixlib=rb-4.0.3&q=80&w=1080",
    },
  },
  {
    id: 2,
    front: {
      text: "What is the largest planet in our solar system?",
      image: "https://images.unsplash.com/photo-1630839437035-dac17da580d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxqdXBpdGVyfGVufDB8fHx8MTcxNzUyMjM2Mnww&ixlib=rb-4.0.3&q=80&w=1080",
    },
    back: {
      text: "The largest planet in our solar system is Jupiter.",
      image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxqdXBpdGVyJTIwcGxhbmV0fGVufDB8fHx8MTcxNzUyMjM2M3ww&ixlib=rb-4.0.3&q=80&w=1080",
    },
  },
];

const themes = {
  light: {
    bg: "white",
    color: "black",
  },
  dark: {
    bg: "gray.800",
    color: "white",
  },
};

const Index = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const [theme, setTheme] = useState("light");
  const toast = useToast();

  const handleToggleCard = () => {
    setIsFront(!isFront);
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcardsData.length);
    setIsFront(true);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcardsData.length) % flashcardsData.length);
    setIsFront(true);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleApiRequest = async () => {
    try {
      const response = await fetch("https://api.example.com/update-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: flashcardsData[currentCardIndex].front.text }),
      });
      const data = await response.json();
      toast({
        title: "API Request Successful",
        description: `Response: ${data.message}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "API Request Failed",
        description: `Error: ${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const currentCard = flashcardsData[currentCardIndex];
  const cardContent = isFront ? currentCard.front : currentCard.back;

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <HStack width="100%" justifyContent="space-between">
          <Button onClick={handlePrevCard} leftIcon={<FaArrowLeft />}>
            Previous
          </Button>
          <Select value={theme} onChange={handleThemeChange} width="150px">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Select>
          <Button onClick={handleNextCard} rightIcon={<FaArrowRight />}>
            Next
          </Button>
        </HStack>
        <Box width="100%" padding={4} bg={themes[theme].bg} color={themes[theme].color} borderRadius="md" boxShadow="md" textAlign="center" onClick={handleToggleCard} cursor="pointer">
          <Text fontSize="xl" mb={4}>
            {cardContent.text}
          </Text>
          {cardContent.image && <Image src={cardContent.image} alt="Flashcard Image" />}
        </Box>
        <Button onClick={handleApiRequest}>Update Text via API</Button>
      </VStack>
    </Container>
  );
};

export default Index;
