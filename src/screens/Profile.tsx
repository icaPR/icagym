import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  VStack,
  useToast,
} from "native-base";
import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const PHOTO_SIZE = 33;
export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState("");

  const toast = useToast();
  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });
      if (photoSelected.canceled) {
        return;
      }
      if (photoSelected.assets.length !== 0) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );
        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Essa Image é muito grande. Escolha uma de até 5MB",
            placement: "top",
            bgColor: "red.500",
          });
        }
        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

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
              source={{ uri: userPhoto }}
              alt="Foto do usúario"
              size={33}
            />
          )}
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Heading
              fontFamily="heading"
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
            fontFamily="heading"
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
