import { Box, Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import MenuItemDev from "./MenuItemDev";
import { getMenus } from "./menus";

export default function Menu() {
  const [opened, { open, close }] = useDisclosure();

  const menus = getMenus();

  const navigate = useNavigate();
  const items = menus.map((item, index) => (
    <MenuItemDev data={item} navigate={navigate} key={index} />
  ));

  return (
    <Box
      w={220}
      style={{
        border: "1px solid lightgrey",
        height: "100vh",
      }}
    >
      {items}
      <div style={{ position: "absolute", bottom: 0 }}>
        <Button onClick={open} w={180} color="red">
          Sign Out
        </Button>
      </div>
      <Modal opened={opened} onClose={close} title="Are you sure to sign out?">
        <Group justify="end" gap={12}>
          <Button onClick={close}>Cancel</Button>
          <Button
            color="red"
            onClick={() => {
              navigate("/sign-in/");
            }}
          >
            Logout
          </Button>
        </Group>
      </Modal>
    </Box>
  );
}
