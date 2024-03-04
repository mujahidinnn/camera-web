import { Button, Group, Modal, MultiSelect, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { triggerTable } from "@stores/atoms/table";
import { PROGRAMS_WORKOUT } from "@utils/constant";
import { setDataTableCodes } from "@utils/help-func";
import { useSetAtom } from "jotai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

const Add = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const setTriggerTable = useSetAtom(triggerTable);
  function handleTrigger() {
    setTriggerTable(true);
  }

  const form = useForm();

  function handleAdd(values) {
    const startDate = new Date(values.period[0]);
    const endDate = new Date(values.period[1]);

    // Calculate the number of days between start and end dates
    const daysDifference = Math.ceil(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );

    // Generate work_out_data array with day and programs properties
    const workOutData = Array.from(
      { length: daysDifference + 1 },
      (_, index) => {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + index);

        const day = currentDate;

        const programs_data = values.programs?.map((elm) => {
          return {
            [elm]: false,
          };
        });

        const description = "";
        const status = "NOT";
        const progress = 0;
        const id = uuidv4();

        return { id, day, programs_data, description, status, progress };
      }
    );

    const body = {
      id: uuidv4(),
      code: values.code,
      period: {
        // first: convertISO(values.period[0]),
        // last: convertISO(values.period[1]),
        first: values.period[0],
        last: values.period[1],
      },
      programs:
        Array.isArray(values.programs) &&
        values.programs.map((elm) => ({
          label: elm,
          value: elm,
          checked: false,
        })),

      work_out_data: workOutData,
    };

    if (body) {
      setDataTableCodes([body]);
      close();
      form.reset();
      handleTrigger();
    }
  }

  return (
    <>
      <Button onClick={open}>
        <AiOutlinePlusCircle style={{ marginRight: "3px" }} /> Add
      </Button>

      <Modal opened={opened} onClose={close} title="Add new code work out">
        <form onSubmit={form.onSubmit((values) => handleAdd(values))}>
          <TextInput
            required
            label="Program Code"
            placeholder="Input program code"
            withAsterisk
            mb={16}
            {...form.getInputProps("code")}
          />
          <DatePickerInput
            required
            clearable
            valueFormat="DD MMMM YYYY"
            type="range"
            label="Period"
            placeholder="Pick period"
            withAsterisk
            mb={16}
            {...form.getInputProps("period")}
          />
          <MultiSelect
            clearable
            required
            withAsterisk
            label="Programs"
            placeholder="Pick program"
            data={PROGRAMS_WORKOUT}
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

export default Add;
