import {
  Button,
  Checkbox,
  Group,
  Modal,
  MultiSelect,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

const Edit = ({ opened, close, data }) => {
  const form = useForm();

  function handleEdit(values) {}

  useEffect(() => {
    if (data) {
      form.setValues({
        code: data?.code,
        period: [new Date(data?.period?.first), new Date(data?.period?.last)],
        programs: data?.programs?.map((elm) => elm.label),
      });
    }
  }, [data]);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit work out">
        <form onSubmit={form.onSubmit((values) => handleEdit(values))}>
          <TextInput
            {...form.getInputProps("code")}
            label="Code"
            placeholder="Input code"
            withAsterisk
            mb={16}
          />
          <DatePickerInput
            {...form.getInputProps("period")}
            type="range"
            label="Period"
            withAsterisk
            mb={16}
            placeholder="Pick period"
          />

          <MultiSelect
            clearable
            required
            withAsterisk
            label="Programs"
            placeholder="Pick value"
            data={["React", "Angular", "Vue", "Svelte"]}
            mb={16}
            {...form.getInputProps("programs")}
          />

          <Group justify="end">
            <Button variant="light" onClick={close}>
              Cancel
            </Button>

            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Edit;
