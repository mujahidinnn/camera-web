import {
  Anchor,
  Button,
  Card,
  Loader,
  LoadingOverlay,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { registerDataUser } from "@utils/help-func";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  function handleSubmit(values) {
    const body = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    setLoading(true);

    try {
      registerDataUser(body);
      navigate("/sign-in/");
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
            label="Username"
            placeholder="your username"
            {...form.getInputProps("username")}
          />

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

          <Button w="100%" mt="sm" type="submit">
            Submit
          </Button>

          <Text size="sm" mt={16}>
            Have an account?{" "}
            <Anchor href="/sign-in/" underline="hover" size="sm">
              Sign In
            </Anchor>
          </Text>
        </form>
      </Card>
    </div>
  );
}
