import ModalDelete from "@components/ModalDelete";

const Delete = ({ handleDelete, close, opened }) => {
  return (
    <ModalDelete
      handleDelete={handleDelete}
      close={close}
      opened={opened}
      title={`Are you sure to delete it?`}
    />
  );
};

export default Delete;
