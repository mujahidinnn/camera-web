import {
  Anchor,
  Button,
  Card,
  Group,
  Loader,
  LoadingOverlay,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { request } from "../../utils/request";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  async function handleSubmit(values) {
    const body = {
      email: values.email,
    };
    try {
      setLoading(true);
      await request.post("/auth/forgot-password/", body);
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

          <Group justify="flex-end">
            <Anchor href="/sign-in/" underline="hover" size="sm">
              Sign In
            </Anchor>
          </Group>

          <Button w="100%" mt="sm" type="submit">
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}
