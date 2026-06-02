import phantom75 from "@/assets/product-phantom-75.jpg";
import auroraTkl from "@/assets/product-aurora-tkl.jpg";
import void65 from "@/assets/product-void-65.jpg";
import gateronYellow from "@/assets/product-gateron-yellow.jpg";
import bobaU4t from "@/assets/product-boba-u4t.jpg";
import keycapsNeon from "@/assets/product-keycaps-neon.jpg";
import keycapsArctic from "@/assets/product-keycaps-arctic.jpg";
import deskmat from "@/assets/product-deskmat.jpg";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  stock: number;
  badge: string | null;
  tags: string[];
  switches?: string[];
  colors?: string[];
  gradient: string;
  image: string;
  description: string;
  specs?: Record<string, string>;
};

export const products: Product[] = [
  {
    id: 1,
    image: phantom75,
    name: "MechKeys Phantom 75%",
    category: "Keyboards",
    price: 289,
    originalPrice: 349,
    rating: 4.9,
    reviews: 412,
    stock: 8,
    badge: "Bestseller",
    tags: ["75%", "RGB", "Hot-swap"],
    switches: ["Cherry MX Red", "Gateron Yellow", "Kailh Box White"],
    colors: ["Midnight Black", "Arctic White", "Deep Purple"],
    gradient: "from-purple-600 via-fuchsia-500 to-cyan-400",
    description:
      "Phantom 75% to nasza flagowa kompaktowa klawiatura. Gasket-mounted aluminiowa obudowa, hot-swap PCB i RGB pod każdym klawiszem. Zbudowana dla profesjonalistów, którzy wymagają perfekcji.",
    specs: {
      Layout: "75%",
      Obudowa: "CNC Aluminium",
      PCB: "Hot-swap, QMK/VIA",
      Łączność: "USB-C + Bluetooth 5.0",
      Bateria: "4000mAh (tryb bezprzewodowy)",
      Waga: "1.2kg",
    },
  },
  {
    id: 2,
    image: auroraTkl,
    name: "MechKeys Aurora TKL",
    category: "Keyboards",
    price: 219,
    originalPrice: 219,
    rating: 4.7,
    reviews: 287,
    stock: 23,
    badge: "Nowość",
    tags: ["TKL", "RGB", "Wireless"],
    switches: ["Cherry MX Brown", "Gateron Red", "Akko CS Jelly"],
    colors: ["Stealth Grey", "Rose Gold"],
    gradient: "from-cyan-500 via-blue-500 to-purple-600",
    description:
      "Tenkeyless w idealnym wydaniu. Aurora ma obudowę z poliwęglanu dla pożądanego 'flexu', z PCB skierowanym diodami w dół, by RGB nie świeciło przez keycapy.",
    specs: {
      Layout: "TKL (87 klawiszy)",
      Obudowa: "Poliwęglan",
      PCB: "Hot-swap, QMK",
      Łączność: "USB-C + 2.4GHz Wireless",
      Bateria: "3000mAh",
      Waga: "0.95kg",
    },
  },
  {
    id: 3,
    image: void65,
    name: "MechKeys Void 65%",
    category: "Keyboards",
    price: 179,
    originalPrice: 199,
    rating: 4.8,
    reviews: 564,
    stock: 0,
    badge: "Wyprzedane",
    tags: ["65%", "Kompaktowa", "Hot-swap"],
    switches: ["Gateron Milky Yellow", "Boba U4T", "Kailh Box Red"],
    colors: ["Jet Black", "Glacier White", "Olive Green"],
    gradient: "from-slate-700 via-purple-700 to-slate-900",
    description:
      "Kompaktowa nie znaczy gorsza. Void 65% pakuje poważne osiągi w layout, który oszczędza miejsce na biurku.",
    specs: {
      Layout: "65%",
      Obudowa: "Aluminium + PC dół",
      PCB: "Hot-swap",
      Łączność: "USB-C odłączany",
      Waga: "0.85kg",
    },
  },
  {
    id: 4,
    image: gateronYellow,
    name: "Gateron Pro Yellow (x35)",
    category: "Switches",
    price: 24,
    originalPrice: 24,
    rating: 4.9,
    reviews: 1203,
    stock: 500,
    badge: "Top",
    tags: ["Linear", "Cichy", "5-pin"],
    gradient: "from-yellow-400 via-amber-500 to-orange-500",
    description:
      "Maślano gładkie liniowe switche. Fabrycznie wstępnie nasmarowane dla idealnie cichego, szybkiego klawisza uwielbianego przez typujących i graczy.",
  },
  {
    id: 5,
    image: bobaU4t,
    name: "Boba U4T (x45)",
    category: "Switches",
    price: 38,
    originalPrice: 42,
    rating: 4.8,
    reviews: 876,
    stock: 120,
    badge: "Ulubieniec",
    tags: ["Tactile", "Thocky", "5-pin"],
    gradient: "from-rose-500 via-pink-500 to-purple-600",
    description:
      "Definitywny taktylny switch. Mocny, satysfakcjonujący bump z głębokim thocky dźwiękiem, na którym zwariowali entuzjaści klawiatur.",
  },
  {
    id: 6,
    image: keycapsNeon,
    name: "Phantom Keycap Set — Cyber Neon",
    category: "Keycaps",
    price: 89,
    originalPrice: 110,
    rating: 4.6,
    reviews: 341,
    stock: 45,
    badge: "Promocja",
    tags: ["PBT", "Cherry profile", "RGB-friendly"],
    gradient: "from-fuchsia-600 via-purple-600 to-cyan-500",
    description:
      "Double-shot PBT legendy, które nigdy nie znikają. Cyber Neon łączy głębokie czarne klawisze z elektryczno-cyan i fioletowymi legendami. Profil Cherry dla klasycznego feelingu.",
  },
  {
    id: 7,
    image: keycapsArctic,
    name: "Phantom Keycap Set — Arctic",
    category: "Keycaps",
    price: 79,
    originalPrice: 79,
    rating: 4.7,
    reviews: 219,
    stock: 67,
    badge: null,
    tags: ["PBT", "OEM profile", "Minimalistyczne"],
    gradient: "from-slate-200 via-slate-400 to-slate-600",
    description:
      "Czyste. Minimalistyczne. Arctic to białe PBT z szarymi sublegendami — idealne, gdy chcesz, by to klawiatura mówiła głośniej niż keycapy.",
  },
  {
    id: 8,
    image: deskmat,
    name: "MechKeys Desk Mat XL",
    category: "Accessories",
    price: 39,
    originalPrice: 39,
    rating: 4.8,
    reviews: 667,
    stock: 200,
    badge: null,
    tags: ["900x400mm", "Antypoślizgowa", "Stębnowane brzegi"],
    gradient: "from-indigo-700 via-purple-700 to-slate-900",
    description:
      "900×400mm premium materiał z antypoślizgowym gumowym spodem i stębnowanymi brzegami, które się nie strzępią. Dostępne w wariantach Midnight i Arctic.",
  },
];

export const getProduct = (id: number | string) =>
  products.find((p) => p.id === Number(id));
