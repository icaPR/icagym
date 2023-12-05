import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, ScrollView, Skeleton, VStack } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

const PHOTO_SIZE = 33;
export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 56 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              rounded="full"
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              startColor="gray.400"
              endColor="gray.600"
            />
          ) : (
            <UserPhoto
              source={{ uri: "https://github.com/icaPR.png" }}
              alt="Foto do usúario"
              size={33}
            />
          )}
          <TouchableOpacity>
            <Heading
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Heading>
          </TouchableOpacity>
          <Input placeholder="Nome" bg="gray.600" />
          <Input placeholder="icaPR@email.com" bg="gray.600" isDisabled />

          <Heading
            color="gray.200"
            fontSize="md"
            mb={2}
            mt={12}
            alignSelf="flex-start"
          >
            Alterar Senha
          </Heading>
          <Input placeholder="Senha antiga" bg="gray.600" secureTextEntry />
          <Input placeholder="Nova senha" bg="gray.600" secureTextEntry />
          <Input
            placeholder="Confirme a nova senha"
            bg="gray.600"
            secureTextEntry
          />
          <Button title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  );
}
