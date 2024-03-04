import { Button, Textarea } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

const Form = () => {
  const today = new Date();
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() - 3);

  const form = useForm({
    initialValues: {
      date: threeDaysAgo,
      description: "",
    },
  });

  async function handleSubmit(values) {
    try {
      await fetch("/api/", values);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <DatePickerInput
        disabled
        type="default"
        label="Date"
        withAsterisk
        mb={16}
        {...form.getInputProps("date")}
      />
      <Textarea
        required
        label="Description"
        placeholder="Input description"
        withAsterisk
        mb={16}
        {...form.getInputProps("description")}
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default Form;
