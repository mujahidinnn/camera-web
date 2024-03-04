import { Badge, Card, Divider, Group, Text } from "@mantine/core";
import { dataTableCodes } from "@utils/help-func";
import { convertISO, convertISODateToIndonesianFormat } from "@utils/helper";
import { sumPercent } from "@utils/helper";

const Dashboard = () => {
  return (
    <div>
      {Array.isArray(dataTableCodes) &&
        dataTableCodes.map((item) => {
          const sumProgress = sumPercent(
            item.work_out_data?.length,
            item.work_out_data?.filter((elm) => elm.progress == 100).length
          );
          return (
            <Card shadow="sm" maw={400}>
              <Group justify="space-between">
                <Text size="lg">{item.code}</Text>
                <Text>{sumProgress?.toFixed(2)}%</Text>
              </Group>
              <Divider mb={16} />
              <Text>
                {convertISODateToIndonesianFormat(
                  convertISO(item.period.first)
                )}{" "}
                -{" "}
                {convertISODateToIndonesianFormat(convertISO(item.period.last))}
              </Text>
              <Group gap={2} mt={16}>
                {Array.isArray(item.programs) &&
                  item.programs.map((elm) => (
                    <Badge color="cyan">{elm.label}</Badge>
                  ))}
              </Group>
            </Card>
          );
        })}
    </div>
  );
};

export default Dashboard;
