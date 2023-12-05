import { HStack, Heading, VStack, Text } from "native-base";

type Props = {
  title: string;
};

export function HistoryCard() {
  return (
    <HStack
      w="full"
      px={5}
      py={4}
      mb={3}
      bg="gray.600"
      rounded="md"
      alignContent="center"
    >
      <VStack mr={5} flex={1}>
        <Heading
          color="white"
          fontSize="md"
          textTransform="capitalize"
          fontFamily="heading"
          numberOfLines={1}
        >
          Peito
        </Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          Supino reto
        </Text>
      </VStack>
      <Text color="gray.300" fontSize="md">
        15:30
      </Text>
    </HStack>
  );
}
