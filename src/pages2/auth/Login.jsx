import {
  Anchor,
  Button,
  Card,
  Checkbox,
  Group,
  Loader,
  LoadingOverlay,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  dataUserLogin,
  isRememberMe,
  matchingDataUser,
  setDataUserLogin,
} from "@utils/help-func";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  function handleSubmit(values) {
    const body = {
      email: values.email,
      password: values.password,
    };

    setLoading(true);
    const isMatching = matchingDataUser(body);

    if (isMatching) {
      setDataUserLogin({ ...body, rememberMe: values.rememberMe });
      navigate("/dashboard");
    } else {
      console.error("Data user tidak ditemukan!");
      notifications.show({
        title: "Gagal",
        message:
          "Email atau password tidak sesuai. Silakan coba lagi atau daftar jika belum memiliki akun.",
      });
    }

    setLoading(false);
  }

  const user = JSON.parse(dataUserLogin);

  useEffect(() => {
    if (isRememberMe) {
      form.initialize({
        email: user.email,
        password: user.password,
        rememberMe: user.rememberMe,
      });
    }
  }, []);

  return (
    <div className="auth-layout">
      <Card
        maw={500}
        w={340}
        pos="relative"
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          opacity: 0,
          animation: "fadeIn 0.5s forwards",
        }}
      >
        <LoadingOverlay
          visible={loading}
          loaderProps={{ children: <Loader /> }}
        />
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            mb="lg"
            required
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            mb="md"
            required
            withAsterisk
            label="Password"
            placeholder="********"
            {...form.getInputProps("password")}
          />

          <Group display="flex" justify="space-between" align="center">
            <Checkbox
              size="sm"
              label="Remember Me"
              {...form.getInputProps("rememberMe", { type: "checkbox" })}
            />
          </Group>

          <Button w="100%" mt="sm" type="submit">
            Submit
          </Button>
        </form>
        <Text size="sm" mt={16}>
          Don't have an account yet?{" "}
          <Anchor href="/sign-up/" underline="hover" size="sm">
            Sign Up
          </Anchor>
        </Text>
      </Card>
    </div>
  );
}
