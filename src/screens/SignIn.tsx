import {
  Center,
  Image,
  VStack,
  Text,
  Heading,
  ScrollView,
  useToast,
} from "native-base";

import LogoSVG from "@assets/logo.svg";
import BackgroundIMG from "@assets/background.png";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { useState } from "react";

const signInSchema = yup.object({
  email: yup.string().required("Informe o email."),
  password: yup
    .string()
    .required("Informe sua senha.")
    .min(6, "A senha deve ter pelo menos 6 digitos,"),
});

type FormData = yup.InferType<typeof signInSchema>;

export function SignIn() {
  const [isLoading, setIsloading] = useState(false);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { signIn } = useAuth();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(signInSchema) });

  async function handleSignIn({ email, password }: FormData) {
    setIsloading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Error ao tentar fazer o login. Tente novamente mais tarde";
      setIsloading(false);
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }
  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundIMG}
          defaultSource={BackgroundIMG}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />
        <Center my={24}>
          <LogoSVG />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="E-mail"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                secureTextEntry
              />
            )}
          />
          <Button
            title="Acessar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso ?
          </Text>
          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
