export type FooterInfoKey = "about" | "privacy" | "terms" | "contact";

export type FooterInfoSection = {
  title: string;
  body: string;
};

export type FooterInfoPageData = {
  href: string;
  label: string;
  eyebrow: string;
  title: string;
  lead: string;
  sections: FooterInfoSection[];
};

export const footerInfoPages: Record<FooterInfoKey, FooterInfoPageData> = {
  about: {
    href: "/about",
    label: "Om Trainly",
    eyebrow: "Om oss",
    title: "Om Trainly",
    lead: "Trainly samlar hundarnas vardag, träning, kalender och kontakter på ett lugnt och överskådligt sätt.",
    sections: [
      {
        title: "Byggt för hundlivet",
        body: "Appen gör det enklare att hålla koll på träning, aktiviteter, vänner, hundar och anteckningar utan att allt sprids över flera olika ställen.",
      },
      {
        title: "Fokus på enkelhet",
        body: "Trainly ska kännas snabb att använda i vardagen. Du ska kunna lägga till det viktiga, hitta tillbaka till det och dela sådant som hör ihop med en vän.",
      },
      {
        title: "Under utveckling",
        body: "Projektet utvecklas steg för steg med målet att göra appen mer användbar utan att den blir rörig.",
      },
    ],
  },
  privacy: {
    href: "/privacy",
    label: "Integritetspolicy",
    eyebrow: "Integritet",
    title: "Integritetspolicy",
    lead: "Här beskriver vi hur Trainly hanterar information som hör till ditt konto och dina hundar.",
    sections: [
      {
        title: "Information du lägger in",
        body: "Trainly sparar den information du själv anger, till exempel konto, hundar, kalenderaktiviteter, träningsanteckningar och vänner.",
      },
      {
        title: "Varför informationen används",
        body: "Informationen används för att appens funktioner ska fungera, till exempel för att visa dina hundar, aktiviteter och sådant som en vän har delat med dig.",
      },
      {
        title: "Delning",
        body: "Information delas bara i appen när en funktion kräver det, till exempel när du blir vän med någon eller delar en kalenderaktivitet med en vän.",
      },
      {
        title: "Kontakt",
        body: "Har du frågor om integritet eller vill ändra uppgifter kan du kontakta oss via hej@trainly.se.",
      },
    ],
  },
  terms: {
    href: "/terms",
    label: "Användarvillkor",
    eyebrow: "Villkor",
    title: "Användarvillkor",
    lead: "Dessa villkor beskriver den grundläggande tanken för hur Trainly ska användas.",
    sections: [
      {
        title: "Ditt konto",
        body: "Du ansvarar för att uppgifterna du lägger in är korrekta och att ditt konto används på ett schysst och tryggt sätt.",
      },
      {
        title: "Innehåll",
        body: "Du äger det innehåll du själv lägger in i appen. Trainly använder innehållet för att kunna visa och hantera funktionerna i tjänsten.",
      },
      {
        title: "Vänner och delning",
        body: "När du lägger till vänner eller delar aktiviteter visas relevant information för den vännen enligt funktionens syfte.",
      },
      {
        title: "Ändringar",
        body: "Eftersom Trainly fortfarande utvecklas kan funktioner och villkor behöva justeras över tid.",
      },
    ],
  },
  contact: {
    href: "/contact",
    label: "Kontakt",
    eyebrow: "Kontakt",
    title: "Kontakt",
    lead: "Vill du komma i kontakt med Trainly kan du mejla oss. Vi återkommer så snart vi kan.",
    sections: [
      {
        title: "E-post",
        body: "Skicka ett mejl till hej@trainly.se om du har frågor, hittar något som inte fungerar eller vill lämna feedback.",
      },
      {
        title: "Support",
        body: "Beskriv gärna vad du försökte göra, vilken sida du var på och vad som hände. Då blir det lättare att hjälpa dig snabbt.",
      },
      {
        title: "Förslag",
        body: "Trainly växer efter verkliga behov. Tips på förbättringar och nya funktioner är alltid välkomna.",
      },
    ],
  },
};

export const footerInfoPageList = [
  footerInfoPages.about,
  footerInfoPages.privacy,
  footerInfoPages.terms,
  footerInfoPages.contact,
];
