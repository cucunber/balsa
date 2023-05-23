import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Input } from "@chakra-ui/input";
import {
  Box,
  Button,
  CardFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "features/auth/process";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Route, Routes, useNavigate } from "react-router";
import { Link } from "shared/components";
import { getLinkPath, routesPath } from "shared/constants/routes";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useProfile } from "entities/user/api/useProfile";
import { observer } from "mobx-react-lite";
import { useMst } from "shared/hooks/useMst";
import { authKeys } from "shared/constants/localStorage";

const scheme = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const useVerify = () => {
  const navigator = useNavigate();
  const [loading, setLoading] = useState(true);
  const { authByToken } = useAuth();

  useEffect(() => {
    authByToken()
      .then((data) => {
        if (!Object.prototype.hasOwnProperty.call(data, "error")) {
          navigator(getLinkPath("auth.children.redirect.path"));
        } else {
          navigator(getLinkPath("auth.children.login.path"));
        }
      })
      .finally(() => setLoading(false));
  }, [authByToken, navigator]);

  return { loading };
};

const messages = [
  "Собираем данные",
  "Красим кнопки на странице",
  "Озвучиваем фильмы",
  "Добавляем рекламу",
];

const MessageGenerator = () => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  useEffect(() => {
    const newMessage = messages[Math.floor(Math.random() * messages.length)];
    const timerId = setTimeout(() => {
      setCurrentMessage(newMessage);
    }, 2000);
    return () => {
      clearTimeout(timerId);
    };
  }, [currentMessage]);
  return (
    <Text align="center">
      Успешная авторизация.
      <Text color="blue.500" as="p">
        {currentMessage}
      </Text>
      Пожалуйста подождите
    </Text>
  );
};

const Redirect = observer(() => {
  const navigator = useNavigate();
  const { getMe } = useProfile();
  const updateProfile = useMst((state) => state.updateUser.bind(state));
  useEffect(() => {
    const timerId = setTimeout(() => navigator(getLinkPath("main.path")), 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, [navigator]);
  useEffect(() => {
    const getUser = async () => {
      const [state, data] = await getMe();
      if (state) {
        return;
      }
      updateProfile({
        ...data,
        access: localStorage.getItem(authKeys.accessToken),
        refresh: localStorage.getItem(authKeys.refreshToken),
      });
    };
    getUser();
  }, [getMe, updateProfile]);

  return (
    <Stack spacing={4} direction="column" align="center">
      <Spinner size="lg" />
      <MessageGenerator />
    </Stack>
  );
});

const Login = () => {
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
      username: "",
      password: "",
    },
    resolver: yupResolver(scheme),
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
          navigator(getLinkPath("auth.children.redirect.path"));
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
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Никнейм</FormLabel>
          <Input {...register("username", { required: true })} />
          {errors["username"] && (
            <FormErrorMessage>{errors["username"].message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Пароль</FormLabel>
          <Input
            {...register("password", { required: true })}
            type="password"
          />
          {errors["password"] && (
            <FormErrorMessage>{errors["password"].message}</FormErrorMessage>
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
          Войти
        </Button>
      </FormControl>
      <Box>
        <Text sx={{ mr: 1 }}>Первый раз с нами?</Text>
        <Link to={getLinkPath("register.path")}>Зарегистрироваться</Link>
      </Box>
    </Box>
  );
};

const routes = {
  login: {
    path: routesPath.auth.children.login.path,
    element: <Login />,
  },
  redirect: {
    path: routesPath.auth.children.redirect.path,
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
      {loading ? (
        <Spinner />
      ) : (
        <CardBody>
          <AuthRoutes />
        </CardBody>
      )}
    </Card>
  );
};
