import { Button, Tooltip } from "@mantine/core";

const ActionButton = ({ label, icon, color, onClick, ...props }) => {
  return (
    <Tooltip label={label} {...props}>
      <Button
        onClick={onClick}
        p={5}
        style={{ height: "max-content" }}
        color={color}
      >
        {icon}
      </Button>
    </Tooltip>
  );
};

export default ActionButton;
