import Link from "next/link";
import styles from "./AsideNav.module.css";
import { DogClubIcon, CoursesIcon, TrophyIcon, VetIcon, ShoppingIcon, } from "../icons/NavIcons";

type NavItem = {
  href: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number }>;
};

const items: NavItem[] = [
  { href: "/shopping", label: "Shopping", Icon: ShoppingIcon },
  { href: "/dogclub", label: "Brukshundsklubbar", Icon: DogClubIcon },
  { href: "/competitions", label: "SBK Tävling", Icon: TrophyIcon },
  { href: "/vets", label: "Veterinär", Icon: VetIcon },
  { href: "/courses", label: "Kurser", Icon: CoursesIcon },
];

export default function AsideNav() {
  return (
    <aside className={styles.aside} aria-label="Snabblänkar">
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
