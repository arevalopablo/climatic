import { Box } from "@mui/material";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const NAV_ITEMS = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Favoritos", path: "/dashboard/favoritos" },
  ];
  return (
    <Box className={styles.navbarContainer}>
      {NAV_ITEMS.map(({ title, path }) => (
        <NavLink
          to={path}
          end={title === "Dashboard"}
          key={title}
          className={({ isActive }: { isActive: boolean }) =>
            `${styles.navbarLinks} ${isActive ? styles.isActive : ""}`
          }
        >
          {title}
        </NavLink>
      ))}
    </Box>
  );
};

export default Navbar;
