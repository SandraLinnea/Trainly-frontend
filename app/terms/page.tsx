import FooterInfoPage from "../components/footerPages/FooterInfoPage";
import { footerInfoPages } from "../components/footerPages/footerInfoContent";

export default function Page() {
  return <FooterInfoPage {...footerInfoPages.terms} />;
}
