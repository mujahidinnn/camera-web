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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/auth";
import { request } from "../../utils/request";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      remembeMe: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  async function handleSubmit(values) {
    const body = {
      email: values.email,
      password: values.password,
    };
    try {
      setLoading(true);
      const resp = await request.post("/auth/login/", body);
      setToken(resp.data.data);

      navigate("/employee");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

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
              label="Remember Me"
              {...form.getInputProps("rememberMe", { type: "checkbox" })}
            />
            <Anchor href="/forgot-password/" underline="hover" size="sm">
              Forgot Password
            </Anchor>
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
