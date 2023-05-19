import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Input } from "@chakra-ui/input";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "features/auth/process";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Route, Routes, useNavigate } from "react-router";

const useVerify = () => {
  const navigator = useNavigate();
  const [loading, setLoading] = useState(true);
  const { authByToken } = useAuth();

  useLayoutEffect(() => {
    authByToken()
      .then((data) => {
        if (!Object.prototype.hasOwnProperty.call(data, "error")) {
          navigator(routes.redirect.path);
        }
      })
      .finally(() => setLoading(false));
  }, [authByToken, navigator]);

  return { loading };
};

const Redirect = () => {
  return (
    <Stack spacing={4} direction="column" align="center">
      <Spinner size="lg" />
      <Text align="center">
        Успешная авторизация. Собираем данные и перенаправляем. Пожалуйста
        подождите
      </Text>
    </Stack>
  );
};

const Login = () => {
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string>("");

  const { authByPassword } = useAuth();

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    authByPassword(data)
      .then((data) => {
        if ("error" in data) {
          setServerError((data.error as any).detail);
        } else {
          navigator(routes.redirect.path);
        }
      })
      .finally(() => setLoading(false));
  });

  const { username, password } = watch();

  const disableSubmit =
    username.length === 0 ||
    password.length === 0 ||
    Object.keys(errors).length !== 0;

  return (
    <Box as="form" onSubmit={onSubmit}>
      <Stack spacing={8}>
        <FormControl isRequired>
          <FormLabel>Никнейм</FormLabel>
          <Input {...register("username", { required: true })} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Пароль</FormLabel>
          <Input
            {...register("password", { required: true })}
            type="password"
          />
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
          Войти
        </Button>
      </FormControl>
    </Box>
  );
};

const routes = {
  login: {
    path: "login",
    element: <Login />,
  },
  redirect: {
    path: "redirect",
    element: <Redirect />,
  },
};

const AuthRoutes = () => (
  <Routes>
    {Object.values(routes).map((route) => (
      <Route key={route.path} {...route} />
    ))}
  </Routes>
);

export const Auth = () => {
  const { loading } = useVerify();

  return (
    <Card sx={{ w: "clamp(320px, 50%, 700px)" }}>
      <CardHeader>
        <Heading size="md">Вход</Heading>
      </CardHeader>
      <CardBody>{loading ? <Spinner /> : <AuthRoutes />}</CardBody>
    </Card>
  );
};
