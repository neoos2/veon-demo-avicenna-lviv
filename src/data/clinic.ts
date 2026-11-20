// Facts for the homepage. Source: veon/client.json (fact ids in comments). Nothing here is invented.
const nb = " ";
export const grn = (n: string) => `${n}${nb}грн`;

export const clinic = {
  name: "Авіценна",
  // B-F004
  phones: [
    { href: "tel:+380933856039", label: `+38${nb}(093)${nb}385${nb}60${nb}39`, main: true },
    { href: "tel:+380974770183", label: `+38${nb}(097)${nb}477${nb}01${nb}83`, main: false },
    { href: "tel:+380676093612", label: `+38${nb}(067)${nb}609${nb}36${nb}12`, main: false },
  ],
  // B-F005, company.contacts.messengers (Viber is not shown: number not confirmed, UX-R007)
  telegram: "https://t.me/avicennaLviv",
  whatsapp: "https://wa.me/380933856039",
  // socials (confirmed)
  instagram: "https://www.instagram.com/avicenna.lviv/",
  facebook: "https://www.facebook.com/avicenalviv",
  // B-F002, B-F027
  street: "вул. Бориса Антоненка-Давидовича, 1",
  district: "Сихів",
  landmark: "напроти «Сільпо», заїзд з двору",
  map: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Львів, вулиця Бориса Антоненка-Давидовича, 1"),
  // B-F003
  week: [
    ["Пн", "9:30–21:00"], ["Вт", "9:30–21:00"], ["Ср", "9:30–21:00"], ["Чт", "9:30–21:00"],
    ["Пт", "9:30–21:00"], ["Сб", "9:30–21:00"], ["Нд", "вихідний"],
  ] as const,
  // B-F007
  license: "Ліцензія МОЗ № 582 від 05.04.2024",
};

export type Shape = "photo" | "figure" | "ledger" | "pair" | "kids";
export interface Direction {
  id: string;
  name: string;
  tab: string; // short price line under the name
  text: string;
  shape: Shape;
  img?: { name: string; widths: number[]; w: number; h: number; alt: string };
  prices?: { label: string; value: string; from?: boolean }[];
  figure?: { value: string; from?: boolean; caption: string };
  note?: string; // terracotta line (discounts)
  list?: string[];
}

// B-F012 (directions), B-F014 / B-F020 (prices), B-F016 (guarantee)
export const directions: Direction[] = [
  {
    id: "terapiya", name: "Терапія і канали під мікроскопом", tab: `пломба ${grn("1 300")}`, shape: "photo",
    text: "Лікування карієсу і пульпіту, канали під мікроскопом, реставрація зубів.",
    img: { name: "terapiya", widths: [640, 1135], w: 1135, h: 756, alt: "Лікарі клініки біля стоматологічного мікроскопа COXO в кабінеті" },
    prices: [{ label: "Пломба з фотополімеру «Спектрум»", value: grn("1 300") }],
  },
  {
    id: "hihiyena", name: "Гігієна і пародонтологія", tab: `гігієна ${grn("1 350")}`, shape: "figure",
    text: "Професійна гігієна зубів і пародонтологія.",
    figure: { value: grn("1 350"), caption: "Професійна трьохетапна гігієна" },
    note: "−10% на гігієну до дня народження",
  },
  {
    id: "ortodontiya", name: "Ортодонтія", tab: `брекети від ${grn("12 600")}`, shape: "figure",
    text: "Брекети, елайнери, дитячий ортодонт.",
    figure: { value: grn("12 600"), from: true, caption: "металеві брекети, одна щелепа" },
    list: ["Брекети", "Елайнери", "Дитячий ортодонт"],
  },
  {
    id: "implantatsiya", name: "Імплантація і протезування", tab: `імплант від ${grn("8 400")}`, shape: "photo",
    text: "Імпланти MegaGen, коронки, протези.",
    img: { name: "implant", widths: [640, 1200], w: 1200, h: 800, alt: "Лікар показує пацієнтові знімок на моніторі під час планування" },
    prices: [
      { label: "Імплант MegaGen ST", value: grn("8 400"), from: true },
      { label: "Цирконієва коронка", value: grn("8 300") },
      { label: "Металокераміка Duceram", value: grn("4 100") },
    ],
  },
  {
    id: "khirurhiya", name: "Хірургія", tab: "ціна — у повному прайсі", shape: "photo",
    text: "Видалення зубів, зокрема зубів мудрості. Ціни — у повному прайсі.",
    img: { name: "khirurgiya", widths: [640, 1200], w: 1200, h: 800, alt: "Лікарі клініки під час хірургічного втручання" },
  },
  {
    id: "estetyka", name: "Естетика", tab: `відбілювання ${grn("2 300")}`, shape: "pair",
    text: "Вініри, відбілювання, реставрація.",
    prices: [
      { label: "Вінір керамічний e-max", value: grn("10 900") },
      { label: "Відбілювання MagicSmile", value: grn("2 300") },
    ],
  },
  {
    id: "dytyacha", name: "Дитяча стоматологія", tab: `гігієна до 14 років ${grn("950")}`, shape: "kids",
    text: "Герметизація фісур, фторування, професійна гігієна для дітей до 14 років.",
    prices: [{ label: "Дитяча професійна гігієна (до 14 років)", value: grn("950") }],
  },
];

// #ciny: key prices grouped by direction (B-F014, B-F020)
export const priceGroups = [
  { title: "Консультація", rows: [{ label: "Консультація стоматолога", value: "безкоштовно", from: false }] },
  { title: "Терапія", rows: [{ label: "Пломба з фотополімеру «Спектрум»", value: grn("1 300"), from: false }] },
  {
    title: "Гігієна", rows: [
      { label: "Професійна трьохетапна гігієна", value: grn("1 350"), from: false },
      { label: "Дитяча професійна гігієна (до 14 років)", value: grn("950"), from: false },
    ],
  },
  { title: "Ортодонтія", rows: [{ label: "Брекети металеві, одна щелепа", value: grn("12 600"), from: true }] },
  {
    title: "Імплантація і протезування", rows: [
      { label: "Імплант MegaGen ST", value: grn("8 400"), from: true },
      { label: "Цирконієва коронка", value: grn("8 300"), from: false },
      { label: "Металокераміка Duceram", value: grn("4 100"), from: false },
    ],
  },
  {
    title: "Естетика", rows: [
      { label: "Вінір керамічний e-max", value: grn("10 900"), from: false },
      { label: "Відбілювання MagicSmile", value: grn("2 300"), from: false },
    ],
  },
];

export const note = "Розділ у розробці";
