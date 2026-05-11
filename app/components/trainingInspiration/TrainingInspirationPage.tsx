"use client";

import { useState } from "react";

import AsideNav from "../nav/AsideNav";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import styles from "./TrainingInspirationPage.module.css";

type TrainingTip = {
  group: string;
  title: string;
  body: string;
  sections?: {
    title: string;
    items: string[];
  }[];
  note?: string;
  progression?: string;
  linkUrl?: string;
};

const branches = [
  "Lydnad",
  "Bruks",
  "Rallylydnad",
  "IGP",
  "Mondioring",
  "Specialsök",
  "Nosework",
  "Drag",
  "HTM",
  "Freestyle",
];

const branchLinks: Record<string, string> = {
  Lydnad: "https://brukshundklubben.se/prov-tavling/regler/regler-lydnad/",
  Rallylydnad: "https://brukshundklubben.se/prov-tavling/regler/regler-rallylydnad/",
  Bruks: "https://brukshundklubben.se/prov-tavling/regler/regler-bruksprov/",
  IGP: "https://brukshundklubben.se/prov-tavling/regler/regler-igp/",
  Mondioring: "https://brukshundklubben.se/media/xemg5fvu/regelbok_mondioring_webb.pdf",
  Specialsök:
    "https://brukshundklubben.se/media/h4xmfman/regler-sbk-specials%C3%B6k-231101-261231.pdf",
  Nosework:
    "https://brukshundklubben.se/media/tcjh5y1t/snwk-slutligt-regelverk-nosework-2022_rev2-docx.pdf",
  Drag: "https://brukshundklubben.se/prov-tavling/prov-och-tavlingsgrenar/draghund/",
  HTM: "https://brukshundklubben.se/sbk-ovre-norrlands-distrikt/lokala-klubbar/holmsund-brukshundklubb/om-oss/sektorer/freestyle-och-heelwork-to-music/",
  Freestyle: "https://www.shfk.se/wp-content/uploads/2024/02/Freestyleregler_2022-2026.pdf",
};

const tipCategories = ["Valp", "Senior", "Vardag", "Tricks", "Styrketräning"];

const trainingTips: TrainingTip[] = [
  {
    group: "Lydnad",
    title: "Vittring",
    body: "Börja med en pinne som bara du har rört vid. Lägg den nära hunden och belöna direkt när hunden nosar eller plockar rätt pinne lugnt.",
    progression:
      "Avancera genom att lägga fler rena pinnar bredvid och gradvis öka antalet.",
    linkUrl: "https://brukshundklubben.se/prov-tavling/regler/regler-lydnad/",
  },
  {
    group: "Lydnad",
    title: "Apportering i startklass",
    body: "Tips: Bygg värde i att hålla apporten lugnt. Många hundar lär sig snabbt att springa ut efter apporten, men tappar poäng på tugg eller stress i greppet. Börja därför med att bara belöna lugna hållanden. Ge hunden apporten i handen och belöna direkt när hunden håller stilla utan att tugga.",
    sections: [
      {
        title: "Börja",
        items: [
          "Korta hållanden, 1-2 sekunder.",
          "Stöd apporten med handen i början.",
          "Belöna lugn mun och stillhet.",
        ],
      },
      {
        title: "Avancera",
        items: [
          "Längre tid.",
          "Hunden tar apporten själv.",
          "Lägg till gripande från marken och senare hela apporteringen.",
        ],
      },
    ],
    linkUrl: "https://brukshundklubben.se/prov-tavling/regler/regler-lydnad/",
  },
  {
    group: "Lydnad",
    title: "Fooddrive i fritt följ",
    body: "Tips: Belöna nära position och högt fokus med rörelse framåt. Fooddrive handlar inte bara om att hunden vill ha godis, utan att energin riktas in i positionen och arbetet. Belöna medan hunden är i rätt fotposition och fortfarande fokuserad uppåt mot dig.",
    sections: [
      {
        title: "Börja",
        items: [
          "Några få steg i perfekt position.",
          "Belöna snabbt och ofta.",
          "Ha maten nära kroppen för att förstärka rätt plats.",
        ],
      },
      {
        title: "Avancera",
        items: [
          "Fler steg mellan belöningar.",
          "Tempoväxlingar och svängar.",
          "Belöna ibland med lek eller framåtrörelse för mer intensitet.",
        ],
      },
    ],
    linkUrl: "https://brukshundklubben.se/prov-tavling/regler/regler-lydnad/",
  },
  {
    group: "Lydnad",
    title: "Bakdelskontroll på pall",
    body: "Bra för kroppskontroll, styrka och balans. Passar för sporthundar, unghundar och seniorer. Hunden står med framtassarna på en pall och flyttar baktassarna runt.",
    sections: [
      {
        title: "Börja",
        items: ["Belöna bara att stå still på pallen."],
      },
      {
        title: "Avancera",
        items: ["Få hunden att gå runt pallen kontrollerat åt båda håll."],
      },
    ],
    linkUrl: "https://brukshundklubben.se/prov-tavling/regler/regler-lydnad/",
  },
  {
    group: "Lydnad",
    title: "Target med nos eller tass",
    body: "Bra för precision och lättare inlärning av andra beteenden. Passar för tricks, agility, vardagslydnad och hantering. Hunden lär sig nudda hand eller target.",
    sections: [
      {
        title: "Börja",
        items: ["Belöna spontana nosduttar."],
      },
      {
        title: "Avancera",
        items: ["Flytta targeten längre bort eller använd tass istället."],
      },
    ],
    linkUrl: "https://brukshundklubben.se/prov-tavling/regler/regler-lydnad/",
  },
  {
    group: "Rallylydnad",
    title: "Stå",
    body: "Belöna hunden när den söker sig rakt in framför dig. Använd gärna handtarget i början för att få rak position.",
    progression:
      "Avancera genom att lägga till längre avstånd och ingångar från olika vinklar.",
    linkUrl: "https://brukshundklubben.se/prov-tavling/regler/regler-rallylydnad/",
  },
  {
    group: "Rallylydnad",
    title: "Bakdelskontroll på pall",
    body: "Bra för kroppskontroll, styrka och balans. Passar för sporthundar, unghundar och seniorer. Hunden står med framtassarna på en pall och flyttar baktassarna runt.",
    sections: [
      {
        title: "Börja",
        items: ["Belöna bara att stå still på pallen."],
      },
      {
        title: "Avancera",
        items: ["Få hunden att gå runt pallen kontrollerat åt båda håll."],
      },
    ],
    linkUrl: "https://brukshundklubben.se/prov-tavling/regler/regler-rallylydnad/",
  },
  {
    group: "Rallylydnad",
    title: "Backa på signal",
    body: "Bra för bakdelskontroll och självförtroende. Passar för tricks, lydnad och kroppsträning. Hunden går bakåt på signal.",
    sections: [
      {
        title: "Börja",
        items: ["Locka försiktigt bakåt i trång passage."],
      },
      {
        title: "Avancera",
        items: ["Lägg till fler steg och styrning runt hinder."],
      },
    ],
    linkUrl: "https://brukshundklubben.se/prov-tavling/regler/regler-rallylydnad/",
  },
  {
    group: "Bruks",
    title: "Spår",
    body: "Trampa ett kort, rakt spår med godis i nästan varje fotsteg. Låt hunden jobba lugnt med nosen nere.",
    progression: "Avancera genom längre spår, färre godisar och vinklar.",
    linkUrl: "https://brukshundklubben.se/prov-tavling/regler/regler-bruksprov/",
  },
  {
    group: "IGP",
    title: "Växla mellan energi och kontroll",
    body: "Lek upp hunden med kamp eller boll och be sedan om ett lugnt moment, exempelvis fotgående eller sitt. Belöna när hunden snabbt kan växla ner igen.",
    progression: "Avancera genom högre intensitet innan kontrollmomenten.",
    linkUrl: "https://brukshundklubben.se/prov-tavling/regler/regler-igp/",
  },
  {
    group: "Mondioring",
    title: "Miljöträning med konstiga föremål",
    body: "Låt hunden träna runt paraplyer, koner, tunnor, prassel och människor som rör sig märkligt. Belöna lugn och fokus.",
    progression: "Avancera genom att kombinera flera störningar samtidigt.",
    linkUrl: "https://brukshundklubben.se/media/xemg5fvu/regelbok_mondioring_webb.pdf",
  },
  {
    group: "Specialsök",
    title: "Lära in doften",
    body: "Para ihop måldoften med hög belöning. Varje gång hunden nosar på doften kommer belöningen direkt.",
    progression: "Avancera genom att gömma doften i små sök.",
    linkUrl:
      "https://brukshundklubben.se/media/h4xmfman/regler-sbk-specials%C3%B6k-231101-261231.pdf",
  },
  {
    group: "Nosework",
    title: "Introducera doft med smeller",
    body: "Ha doften i en öppen burk eller smeller och belöna direkt när hunden söker sig till den. Målet är att hunden kopplar doften till belöning.",
    progression: "Avancera genom att flytta smellern till olika miljöer och höjder.",
    linkUrl: "https://brukshundklubben.se/media/tcjh5y1t/snwk-slutligt-regelverk-nosework-2022_rev2-docx.pdf",
  },
  {
    group: "Nosework",
    title: "Nosework med eukalyptus",
    body: "Bra för mental aktivering och koncentration. Passar för nästan alla hundar, särskilt energiska eller osäkra. Hunden söker efter en specifik doft.",
    sections: [
      {
        title: "Börja",
        items: ["Koppla doften till belöning."],
      },
      {
        title: "Avancera",
        items: ["Gör svårare gömmor och träna i fler miljöer."],
      },
    ],
    linkUrl: "https://brukshundklubben.se/media/tcjh5y1t/snwk-slutligt-regelverk-nosework-2022_rev2-docx.pdf",
  },
  {
    group: "Drag",
    title: "Lära hunden svänga",
    body: "Lär in riktningar som höger och vänster under promenad eller lätt jogg. Belöna direkt när hunden svänger rätt.",
    progression: "Avancera genom högre fart och fler riktningsbyten.",
    linkUrl: "https://brukshundklubben.se/prov-tavling/prov-och-tavlingsgrenar/draghund/",
  },
  {
    group: "Drag",
    title: "Dragövningar",
    body: "Bra för muskelstyrka och kondition. Passar för vuxna, friska hundar. Hunden drar lätt vikt eller springer i dragsele.",
    sections: [
      {
        title: "Börja",
        items: ["Börja med tom sele och korta sträckor."],
      },
      {
        title: "Avancera",
        items: ["Lägg till vikt eller längre pass gradvis."],
      },
    ],
    linkUrl: "https://brukshundklubben.se/prov-tavling/prov-och-tavlingsgrenar/draghund/",
  },
  {
    group: "HTM",
    title: "Träna sidposition",
    body: "Lär hunden gå parallellt vid din sida men med huvudet vänt framåt istället för mot dig. Belöna små steg i rätt position.",
    progression: "Avancera med svängar, tempoändringar och längre sekvenser.",
    linkUrl:
      "https://brukshundklubben.se/sbk-ovre-norrlands-distrikt/lokala-klubbar/holmsund-brukshundklubb/om-oss/sektorer/freestyle-och-heelwork-to-music/",
  },
  {
    group: "HTM",
    title: "Target med nos eller tass",
    body: "Bra för precision och lättare inlärning av andra beteenden. Passar för tricks, agility, vardagslydnad och hantering. Hunden lär sig nudda hand eller target.",
    sections: [
      {
        title: "Börja",
        items: ["Belöna spontana nosduttar."],
      },
      {
        title: "Avancera",
        items: ["Flytta targeten längre bort eller använd tass istället."],
      },
    ],
    linkUrl:
      "https://brukshundklubben.se/sbk-ovre-norrlands-distrikt/lokala-klubbar/holmsund-brukshundklubb/om-oss/sektorer/freestyle-och-heelwork-to-music/",
  },
  {
    group: "Freestyle",
    title: "Snurra",
    body: "Locka hunden i en cirkel med godis eller handtarget. Sätt signal när rörelsen börjar bli flytande.",
    progression: "Avancera genom att hunden snurrar på avstånd eller åt båda håll.",
    linkUrl: "https://www.shfk.se/wp-content/uploads/2024/02/Freestyleregler_2022-2026.pdf",
  },
  {
    group: "Freestyle",
    title: "Target med nos eller tass",
    body: "Bra för precision och lättare inlärning av andra beteenden. Passar för tricks, agility, vardagslydnad och hantering. Hunden lär sig nudda hand eller target.",
    sections: [
      {
        title: "Börja",
        items: ["Belöna spontana nosduttar."],
      },
      {
        title: "Avancera",
        items: ["Flytta targeten längre bort eller använd tass istället."],
      },
    ],
    linkUrl: "https://www.shfk.se/wp-content/uploads/2024/02/Freestyleregler_2022-2026.pdf",
  },
  {
    group: "Valp",
    title: "Passivitetsträning för valp - Sitt och titta",
    body: "Bra för lugn, självkontroll och att kunna koppla av i olika miljöer. Passar på café, träning, hemma, vid fotbollsplanen eller bara i vardagen. Sätt dig med valpen i koppel på en lugn plats. Belöna varje gång valpen väljer lugn: sitter, lägger sig, tittar lugnt eller slappnar av. Målet är inte lydnad utan att valpen lär sig att inget behöver hända hela tiden.",
    sections: [
      {
        title: "Börja",
        items: [
          "Välj en ganska lugn plats.",
          "Ha låg energi själv.",
          "Belöna lugnt mellan tassarna.",
          "Håll passen korta, 2-5 minuter räcker i början.",
        ],
      },
      {
        title: "Avancera",
        items: [
          "Träna på platser med mer störningar.",
          "Öka tiden mellan belöningar.",
          "Vänta ut att valpen själv lägger sig och slappnar av helt.",
          "Variera miljöer så passivitet blir en vana överallt.",
        ],
      },
    ],
    note: "Många valpar blir överstimulerade av för mycket aktivitet. Passivitet är något man ofta behöver träna lika mycket som lek och lydnad.",
  },
  {
    group: "Valp",
    title: "Godissök i gräs",
    body: "Bra för mental stimulans, stressreducering och självförtroende. Perfekt för valpar, regniga dagar, stressade eller äldre hundar. Sprid ut godis eller foder i gräset och låt hunden nosa upp det.",
    sections: [
      {
        title: "Börja",
        items: ["Lägg godiset öppet och enkelt."],
      },
      {
        title: "Avancera",
        items: ["Använd högre gräs, större ytor eller göm godis utan att hunden ser."],
      },
    ],
  },
  {
    group: "Valp",
    title: "Vänta och ta ögonkontakt",
    body: "Bra för impulskontroll och fokus på föraren. Passar i vardagen, vid mat, dörrar eller hundmöten. Håll fram något hunden vill ha och belöna när den tittar på dig.",
    sections: [
      {
        title: "Börja",
        items: ["Belöna minsta blickkontakt."],
      },
      {
        title: "Avancera",
        items: ["Öka störningar och väntetid."],
      },
    ],
  },
  {
    group: "Valp",
    title: "Omvänt lockande",
    body: "Bra för självkontroll och tålamod. Passar för ivriga eller lättstressade hundar. Hunden får godiset först när den slutar försöka ta det.",
    sections: [
      {
        title: "Börja",
        items: ["Håll godis i stängd hand."],
      },
      {
        title: "Avancera",
        items: ["Lägg godiset synligt på golvet."],
      },
    ],
  },
  {
    group: "Valp",
    title: "Passivitetsträning",
    body: "Bra för avslappning och stresshantering. Passar på kaféer, träningar eller hemma. Belöna lugnt beteende när hunden vilar.",
    sections: [
      {
        title: "Börja",
        items: ["Träna en kort stund i lugn miljö."],
      },
      {
        title: "Avancera",
        items: ["Öka till längre tid och mer störningar."],
      },
    ],
  },
  {
    group: "Valp",
    title: "Fyra tassar på",
    body: "Bra för mod och kroppskännedom. Passar för miljöträning och tricks. Hunden ska sätta alla tassar på ett objekt.",
    sections: [
      {
        title: "Börja",
        items: ["Använd stora, stabila objekt."],
      },
      {
        title: "Avancera",
        items: ["Byt till mindre eller rörliga saker."],
      },
    ],
  },
  {
    group: "Valp",
    title: "Bakdelskontroll på pall",
    body: "Bra för kroppskontroll, styrka och balans. Passar för sporthundar, unghundar och seniorer. Hunden står med framtassarna på en pall och flyttar baktassarna runt.",
    sections: [
      {
        title: "Börja",
        items: ["Belöna bara att stå still på pallen."],
      },
      {
        title: "Avancera",
        items: ["Få hunden att gå runt pallen kontrollerat åt båda håll."],
      },
    ],
  },
  {
    group: "Valp",
    title: "Target med nos eller tass",
    body: "Bra för precision och lättare inlärning av andra beteenden. Passar för tricks, agility, vardagslydnad och hantering. Hunden lär sig nudda hand eller target.",
    sections: [
      {
        title: "Börja",
        items: ["Belöna spontana nosduttar."],
      },
      {
        title: "Avancera",
        items: ["Flytta targeten längre bort eller använd tass istället."],
      },
    ],
  },
  {
    group: "Valp",
    title: "Backa på signal",
    body: "Bra för bakdelskontroll och självförtroende. Passar för tricks, lydnad och kroppsträning. Hunden går bakåt på signal.",
    sections: [
      {
        title: "Börja",
        items: ["Locka försiktigt bakåt i trång passage."],
      },
      {
        title: "Avancera",
        items: ["Lägg till fler steg och styrning runt hinder."],
      },
    ],
  },
  {
    group: "Styrketräning",
    title: "Balansbollsträning - Framtassar på boll",
    body: "Bra för balans, kroppskontroll och stabiliserande muskler. Passar för sporthundar, unghundar och hundar som behöver bättre kroppskännedom. Hunden sätter framtassarna på en balansboll eller balanskudde och håller balansen lugnt.",
    sections: [
      {
        title: "Börja",
        items: ["Använd en stabil och låg kudde.", "Belöna bara att hunden står lugnt."],
      },
      {
        title: "Avancera",
        items: [
          "Låt hunden flytta tassarna.",
          "Låt hunden stå längre.",
          "Lägg till baktassarna också.",
        ],
      },
    ],
  },
  {
    group: "Styrketräning",
    title: "Balans på olika underlag",
    body: "Bra för koordination och stabilitet. Passar för kroppskontroll och miljöträning. Låt hunden gå över olika underlag som stockar, kuddar eller stenar.",
    sections: [
      {
        title: "Börja",
        items: ["Använd stabila och låga underlag."],
      },
      {
        title: "Avancera",
        items: ["Byt till mer rörliga eller smala underlag."],
      },
    ],
  },
  {
    group: "Styrketräning",
    title: "Cavaletti",
    body: "Bra för rörlighet och kroppsmedvetenhet. Passar för fys, rehab och uppvärmning. Hunden går lugnt över låga bommar.",
    sections: [
      {
        title: "Börja",
        items: ["Använd få och låga bommar."],
      },
      {
        title: "Avancera",
        items: ["Höj bommar eller ändra avstånd."],
      },
    ],
  },
  {
    group: "Styrketräning",
    title: "Backa uppför",
    body: "Bra för bakdelsstyrka och kroppskontroll. Passar för aktiva hundar eller som skadeförebyggande träning. Hunden backar långsamt uppför en liten backe eller ramp.",
    sections: [
      {
        title: "Börja",
        items: ["Börja med några få steg i svag lutning."],
      },
      {
        title: "Avancera",
        items: ["Öka till längre sträcka eller brantare backe med kontrollerat tempo."],
      },
    ],
  },
  {
    group: "Senior",
    title: "Cavaletti i slow motion",
    body: "Bra för rörlighet, koordination och att hålla igång kroppen skonsamt. Passar för äldre hundar eller rehabträning. Hunden går långsamt över låga bommar.",
    sections: [
      {
        title: "Börja",
        items: ["Använd få och väldigt låga bommar."],
      },
      {
        title: "Avancera",
        items: ["Lägg till lite fler bommar eller längre mellanrum för större steg."],
      },
    ],
  },
  {
    group: "Vardag",
    title: "Gå fint genom dörrar",
    body: "Bra för impulskontroll och lugn i vardagen. Passar vid ytterdörr, bil eller grindar. Hunden får bara gå genom dörren när den är lugn och väntar på signal.",
    sections: [
      {
        title: "Börja",
        items: ["Öppna dörren lite och stäng om hunden kastar sig fram."],
      },
      {
        title: "Avancera",
        items: ["Lägg på mer störningar och längre väntan innan frikommando."],
      },
    ],
  },
  {
    group: "Vardag",
    title: "Godissök i gräs",
    body: "Bra för mental stimulans, stressreducering och självförtroende. Perfekt för valpar, regniga dagar, stressade eller äldre hundar. Sprid ut godis eller foder i gräset och låt hunden nosa upp det.",
    sections: [
      {
        title: "Börja",
        items: ["Lägg godiset öppet och enkelt."],
      },
      {
        title: "Avancera",
        items: ["Använd högre gräs, större ytor eller göm godis utan att hunden ser."],
      },
    ],
  },
  {
    group: "Vardag",
    title: "Vänta och ta ögonkontakt",
    body: "Bra för impulskontroll och fokus på föraren. Passar i vardagen, vid mat, dörrar eller hundmöten. Håll fram något hunden vill ha och belöna när den tittar på dig.",
    sections: [
      {
        title: "Börja",
        items: ["Belöna minsta blickkontakt."],
      },
      {
        title: "Avancera",
        items: ["Öka störningar och väntetid."],
      },
    ],
  },
  {
    group: "Vardag",
    title: "Omvänt lockande",
    body: "Bra för självkontroll och tålamod. Passar för ivriga eller lättstressade hundar. Hunden får godiset först när den slutar försöka ta det.",
    sections: [
      {
        title: "Börja",
        items: ["Håll godis i stängd hand."],
      },
      {
        title: "Avancera",
        items: ["Lägg godiset synligt på golvet."],
      },
    ],
  },
  {
    group: "Vardag",
    title: "Passivitetsträning",
    body: "Bra för avslappning och stresshantering. Passar på kaféer, träningar eller hemma. Belöna lugnt beteende när hunden vilar.",
    sections: [
      {
        title: "Börja",
        items: ["Träna en kort stund i lugn miljö."],
      },
      {
        title: "Avancera",
        items: ["Öka till längre tid och mer störningar."],
      },
    ],
  },
  {
    group: "Vardag",
    title: "Fyra tassar på",
    body: "Bra för mod och kroppskännedom. Passar för miljöträning och tricks. Hunden ska sätta alla tassar på ett objekt.",
    sections: [
      {
        title: "Börja",
        items: ["Använd stora, stabila objekt."],
      },
      {
        title: "Avancera",
        items: ["Byt till mindre eller rörliga saker."],
      },
    ],
  },
  {
    group: "Vardag",
    title: "Långsamt promenadfot",
    body: "Bra för fokus, balans och lugn. Passar som uppvärmning eller kontaktträning. Gå extremt långsamt tillsammans.",
    sections: [
      {
        title: "Börja",
        items: ["Belöna några lugna steg nära dig."],
      },
      {
        title: "Avancera",
        items: ["Lägg till fler steg, svängar och störningar."],
      },
    ],
  },
  {
    group: "Vardag",
    title: "Lek med regler",
    body: "Bra för relation och impulskontroll. Passar för lekglada hundar med mycket energi. Lek kamp eller jakt med tydliga pauser och signaler.",
    sections: [
      {
        title: "Börja",
        items: ["Lär in ta och loss."],
      },
      {
        title: "Avancera",
        items: ["Lägg på mer fart och längre kontrollmoment."],
      },
    ],
  },
  {
    group: "Vardag",
    title: "Target med nos eller tass",
    body: "Bra för precision och lättare inlärning av andra beteenden. Passar för tricks, agility, vardagslydnad och hantering. Hunden lär sig nudda hand eller target.",
    sections: [
      {
        title: "Börja",
        items: ["Belöna spontana nosduttar."],
      },
      {
        title: "Avancera",
        items: ["Flytta targeten längre bort eller använd tass istället."],
      },
    ],
  },
  {
    group: "Vardag",
    title: "Backa på signal",
    body: "Bra för bakdelskontroll och självförtroende. Passar för tricks, lydnad och kroppsträning. Hunden går bakåt på signal.",
    sections: [
      {
        title: "Börja",
        items: ["Locka försiktigt bakåt i trång passage."],
      },
      {
        title: "Avancera",
        items: ["Lägg till fler steg och styrning runt hinder."],
      },
    ],
  },
  {
    group: "Tricks",
    title: "Snurra runt dina ben",
    body: "Bra för kroppskontroll, fokus och samarbete. Passar som aktivering eller freestyletrick. Locka hunden i en åtta runt dina ben med godis eller handtarget.",
    sections: [
      {
        title: "Börja",
        items: ["Gör ett varv långsamt med tydlig hjälp."],
      },
      {
        title: "Avancera",
        items: ["Träna utan handhjälp, snabbare tempo eller flera varv i rad."],
      },
    ],
  },
];

export default function TrainingInspirationPage() {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedTipCategory, setSelectedTipCategory] = useState("");
  const [search, setSearch] = useState("");

  const activeGroup = selectedBranch || selectedTipCategory;
  const activeBranchLink = selectedBranch ? branchLinks[selectedBranch] : "";
  const normalizedSearch = search.trim().toLowerCase();
  const visibleTips = trainingTips.filter((tip) => {
    if (tip.group !== activeGroup) {
      return false;
    }

    if (!normalizedSearch) {
      return true;
    }

    const searchableText = [
      tip.title,
      tip.body,
      tip.progression ?? "",
      tip.note ?? "",
      ...(tip.sections?.flatMap((section) => [section.title, ...section.items]) ?? []),
    ];

    return searchableText.some((value) => value.toLowerCase().includes(normalizedSearch));
  });

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Header />

        <main className={styles.main}>
          <div className={styles.inner}>
            <section className={styles.content}>
              <div className={styles.topLine} aria-hidden />
              <div className={styles.panel}>
                <h1 className={styles.title}>Träningsinspiration</h1>
                <p className={styles.lead}>
                  Här kan vi samla övningar, pass och idéer för hundträningen.
                </p>

                <div className={styles.filters}>
                  <label className={styles.field}>
                    <span>Grenar</span>
                    <select
                      className={styles.select}
                      value={selectedBranch}
                      onChange={(event) => {
                        setSelectedBranch(event.target.value);
                        setSelectedTipCategory("");
                        setSearch("");
                      }}
                    >
                      <option value="" disabled>
                        Välj gren
                      </option>
                      {branches.map((branch) => (
                        <option value={branch} key={branch}>
                          {branch}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>Tips</span>
                    <select
                      className={styles.select}
                      value={selectedTipCategory}
                      onChange={(event) => {
                        setSelectedTipCategory(event.target.value);
                        setSelectedBranch("");
                        setSearch("");
                      }}
                    >
                      <option value="" disabled>
                        Välj typ av tips
                      </option>
                      {tipCategories.map((category) => (
                        <option value={category} key={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {activeGroup ? (
                  <>
                    <label className={`${styles.field} ${styles.searchField}`}>
                      <span>Sök i {activeGroup}</span>
                      <input
                        className={styles.searchInput}
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder={`Sök tips inom ${activeGroup}`}
                      />
                    </label>

                    {activeBranchLink ? (
                      <div className={styles.linkRow}>
                        <a
                          className={styles.tipLink}
                          href={activeBranchLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Läs regler och mer information
                        </a>
                      </div>
                    ) : null}

                    <p className={styles.srOnly} aria-live="polite">
                      {visibleTips.length === 1
                        ? "1 tips visas."
                        : `${visibleTips.length} tips visas.`}
                    </p>

                    <div className={styles.tipList} aria-live="polite">
                      {visibleTips.length > 0 ? (
                        visibleTips.map((tip) => (
                          <article className={styles.tipCard} key={`${tip.group}-${tip.title}`}>
                            <p className={styles.tipBranch}>{tip.group}</p>
                            <h2 className={styles.tipTitle}>{tip.title}</h2>
                            <p className={styles.tipText}>{tip.body}</p>

                            {tip.sections?.map((section) => (
                              <section className={styles.tipSection} key={section.title}>
                                <h3>{section.title}</h3>
                                <ul>
                                  {section.items.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              </section>
                            ))}

                            {tip.progression ? (
                              <p className={styles.tipProgression}>{tip.progression}</p>
                            ) : null}

                            {tip.note ? <p className={styles.tipNote}>{tip.note}</p> : null}

                          </article>
                        ))
                      ) : (
                        <p className={styles.empty}>Inga tips matchar din sökning.</p>
                      )}
                    </div>
                  </>
                ) : null}
              </div>
            </section>

            <aside className={styles.aside}>
              <AsideNav />
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
