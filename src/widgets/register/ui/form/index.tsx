import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRegister } from "features/register/process";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { getLinkPath, routesPath } from "shared/constants/routes";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "shared/components";

const scheme = yup.object({
  email: yup.string().required().email(),
  username: yup.string().required().min(4, "Length must be min 4 symbols"),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*;:'"-]).{8,}$/,
      "Minimum eight characters, at least one letter, one number and one special character"
    ),
  passwordVerify: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const RegisterForm = () => {
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordVerify: "",
    },
    resolver: yupResolver(scheme),
  });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string>("");

  const { registerUser } = useRegister();

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    registerUser({
      username: data.username,
      email: data.email,
      password: data.password,
    })
      .then((data) => {
        if ("error" in data) {
          setServerError((data.error as any).detail);
        } else {
          navigator(routesPath.auth.path);
        }
      })
      .finally(() => setLoading(false));
  });

  const { email, username, password, passwordVerify } = watch();

  const isFieldsEmpty = [email, username, password, passwordVerify].every(
    (fieldValue) => fieldValue.length === 0
  );
  const disableSubmit = isFieldsEmpty || Object.keys(errors).length !== 0;

  return (
    <Box as="form" onSubmit={onSubmit}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors["email"]?.message} isRequired>
          <FormLabel>Почта</FormLabel>
          <Input {...register("email")} />
          <FormErrorMessage>{errors["email"]?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors["username"]} isRequired>
          <FormLabel>Никнейм</FormLabel>
          <Input {...register("username")} placeholder={email.split("@")[0]} />
          <FormErrorMessage>{errors["username"]?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors["password"]} isRequired>
          <FormLabel>Пароль</FormLabel>
          <Input {...register("password")} type="password" />
          {errors["password"] && (
            <FormErrorMessage>{errors["password"]?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors["passwordVerify"]} isRequired>
          <FormLabel>Потверждение пароля</FormLabel>
          <Input {...register("passwordVerify")} type="password" />
          {errors["passwordVerify"] && (
            <FormErrorMessage>
              {errors["passwordVerify"].message}
            </FormErrorMessage>
          )}
        </FormControl>
      </Stack>
      {serverError && (
        <Text align="center" color="red.500" sx={{ my: 8 }}>
          {serverError}
        </Text>
      )}
      <FormControl sx={{ mt: 10 }}>
        <Button
          isLoading={loading}
          isDisabled={disableSubmit}
          sx={{ w: "100%" }}
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </FormControl>
    </Box>
  );
};

export const Register = () => {
  return (
    <Card sx={{ w: "clamp(320px, 50%, 700px)" }}>
      <CardHeader>
        <Heading size="md">Регистрация</Heading>
      </CardHeader>
      <CardBody>
        <RegisterForm />
      </CardBody>
      <CardFooter>
        <Text sx={{ mr: 1 }}>Зарегистрированы?</Text>
        <Link to={getLinkPath("auth.children.login.path")}>Войти</Link>
      </CardFooter>
    </Card>
  );
};
