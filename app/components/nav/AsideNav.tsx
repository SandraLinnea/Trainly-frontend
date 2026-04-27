import Link from "next/link";

import styles from "./AsideNav.module.css";
import {
  CoursesIcon,
  DogClubIcon,
  DogIcon,
  ShoppingIcon,
  TrophyIcon,
  VetIcon,
} from "../icons/NavIcons";

type NavItem = {
  href: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number }>;
  external?: boolean;
};

const items: NavItem[] = [
  { href: "/clubs", label: "Brukshundsklubbar", Icon: DogIcon },
  { href: "/courses", label: "Kurser", Icon: CoursesIcon },
  { href: "/competitions", label: "SBK Tävling", Icon: TrophyIcon },
  { href: "/shopping", label: "Shopping", Icon: ShoppingIcon },
  {
    href: "https://brukshundklubben.se/om-oss/",
    label: "Svenska brukshundsklubben",
    Icon: DogClubIcon,
    external: true,
  },
  { href: "/vets", label: "Veterinär", Icon: VetIcon },
];

export default function AsideNav() {
  return (
    <aside className={styles.aside} aria-label="Snabblankar">
      <h2 className={styles.heading}>Brukshundsklubbar</h2>
      <div className={styles.rightLine} aria-hidden />
      <ul className={styles.list}>
        {items.map(({ href, label, Icon, external }) => (
          <li key={href}>
            <Link
              href={href}
              className={styles.listItem}
              prefetch={false}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
            >
              <Icon className={styles.icon} />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
