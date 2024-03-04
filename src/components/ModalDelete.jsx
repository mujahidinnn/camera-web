import { Button, Group, Modal } from "@mantine/core";

const ModalDelete = ({ title, handleClose, opened, loading, handleDelete }) => {
  return (
    <Modal onClose={handleClose} opened={opened}>
      {title}
      <Group justify="end">
        <Button variant="light">Cancel</Button>
        <Button color="red" onClick={handleDelete}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
};

export default ModalDelete;
