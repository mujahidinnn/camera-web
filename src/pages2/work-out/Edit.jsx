import { Button, Checkbox, Group, Modal, Textarea } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { convertToISOString } from "@utils/helper";
import { updateWorkoutById } from "@utils/help-func";
import { useSetAtom } from "jotai";
import { triggerTable } from "@stores/atoms/table";
import { sumPercent } from "../../utils/helper";

const Edit = ({ opened, close, data }) => {
  const form = useForm();
  const { id } = useParams();
  const setTriggerTable = useSetAtom(triggerTable);

  function handleTrigger() {
    setTriggerTable(true);
  }

  useEffect(() => {
    if (data) {
      form.setValues({
        id: data?.id,
        day: new Date(data?.day),
        description: data?.description,
        progress: data?.progress,
        programs_data: data.programs_data.reduce((acc, program) => {
          const key = Object.keys(program)[0];
          acc[key] = program[key];
          return acc;
        }, {}),
      });
    }
  }, [data]);

  function handleCheckboxChange(key, checked) {
    form.setFieldValue(`programs_data.${key}`, checked);
  }

  function handleSubmit(values) {
    const objArrProgramsData = Object.entries(values.programs_data);

    const progress = sumPercent(
      objArrProgramsData.length,
      Object.values(values.programs_data).filter((value) => value == true)
        .length
    );

    const body = {
      id: values.id,
      day: convertToISOString(values.day),
      description: values.description,
      progress: progress,
      status: objArrProgramsData.some(([_, val]) => val == false)
        ? "NOT"
        : "DONE",
      programs_data: objArrProgramsData.map(([key, value]) => ({
        [key]: value,
      })),
    };
    console.log("b", body);
    if (id && data?.id && body) {
      updateWorkoutById(id, data?.id, body);
      close();
      handleTrigger();
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit work out">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <DatePickerInput
            readOnly
            valueFormat="DD MMMM YYYY"
            type="default"
            label="Date"
            withAsterisk
            mb={16}
            {...form.getInputProps("day")}
          />

          <Checkbox.Group label="Programs" withAsterisk />
          <Group mt="xs" mb={16}>
            {data != null &&
              Array.isArray(data?.programs_data) &&
              data?.programs_data?.map((program, index) => {
                const key = Object.keys(program)[0];
                return (
                  <Checkbox
                    key={index}
                    label={key}
                    checked={form.values.programs_data?.[key] || false}
                    onChange={(e) =>
                      handleCheckboxChange(key, e.currentTarget.checked)
                    }
                  />
                );
              })}
          </Group>

          <Textarea
            label="Description"
            mb={16}
            placeholder="Input description"
            {...form.getInputProps("description")}
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
