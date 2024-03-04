import { NavLink } from "@mantine/core";
import { createElement } from "react";

function pathIsStartsWith(path) {
  return document.location.pathname.startsWith(path);
}

export default function MenuItemDev({ data, navigate, level = 0 }) {
  const hasChildren = Array.isArray(data.children) && data.children.length > 0;

  const isActive =
    data.path != null &&
    (pathIsStartsWith(data.path) ||
      (hasChildren &&
        data.children.some((child) => pathIsStartsWith(child.path))));

  const handleOnClick = () => {
    if (!hasChildren) {
      navigate(data.path);
    }
  };

  const menuIcon = data.icon ? (
    typeof data.icon !== "string" ? (
      <div style={{ position: "relative", right: "0.5rem" }}>
        {createElement(data.icon)}
      </div>
    ) : (
      <i className={data.icon} />
    )
  ) : null;

  return (
    <>
      <NavLink
        href={data.path}
        key={data.path}
        active={isActive}
        label={data.name}
        // leftSection={<data.icon size="1rem" stroke={1.5} />}
        leftSection={menuIcon}
        onClick={handleOnClick}
        childrenOffset={28 + level}
        px={24}
      >
        {hasChildren &&
          data.children.map((item) => (
            <MenuItemDev
              key={item.path}
              data={item}
              navigate={(route) => navigate(route)}
              level={level + 1}
            />
          ))}
      </NavLink>
    </>
  );
}
