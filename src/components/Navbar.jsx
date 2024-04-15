// const Navbar = () => {
//   return (
//     <ul>
//       <Link to="/">
//         <li>Home</li>
//       </Link>
//       <Link to="/pokemon">
//         <li>All Pokemon</li>
//       </Link>
//       <Link to="/team">
//         <li>Team</li>
//       </Link>
//       <Link to="/about">
//         <li>About</li>
//       </Link>
//       <Link to="/log-in">
//         <li>Log in</li>
//       </Link>
//     </ul>
//   );
// };

// export default Navbar;

import { Link } from "react-router-dom";
import { useState } from "react";
import { Container, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../styles/HeaderSimple.module.css";
import testLogo from "../assets/test-logo.png";

const links = [
  { link: "/", label: "Home" },
  { link: "/pokemon", label: "All Pokemon" },
  { link: "/team", label: "My Team" },
  { link: "/about", label: "About" },
  { link: "/log-in", label: "Login" },
];

function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={() => setActive(link.link)}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <img src={testLogo} className={classes.logo} />
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}

export default Navbar;
