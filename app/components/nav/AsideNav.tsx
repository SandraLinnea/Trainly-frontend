import Link from "next/link";
import styles from "./AsideNav.module.css";
import {
  CoursesIcon,
  DogClubIcon,
  ShoppingIcon,
  TrophyIcon,
  VetIcon,
} from "../icons/NavIcons";

type NavItem = {
  href: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number }>;
};

const items: NavItem[] = [
  { href: "/dogclub", label: "Brukshundsklubbar", Icon: DogClubIcon },
  { href: "/courses", label: "Kurser", Icon: CoursesIcon },
  { href: "/competitions", label: "SBK Tavling", Icon: TrophyIcon },
  { href: "/shopping", label: "Shopping", Icon: ShoppingIcon },
  { href: "/vets", label: "Veterinar", Icon: VetIcon },
];

export default function AsideNav() {
  return (
    <aside className={styles.aside} aria-label="Snabblankar">
      <h2 className={styles.heading}>Brukshundsklubbar</h2>
      <div className={styles.rightLine} aria-hidden />
      <ul className={styles.list}>
        {items.map(({ href, label, Icon }) => (
          <li key={href}>
            <Link href={href} className={styles.listItem}>
              <Icon className={styles.icon} />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
