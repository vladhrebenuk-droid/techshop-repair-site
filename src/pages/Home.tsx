import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  Clock,
  Cpu,
  Hammer,
  Laptop,
  MapPin,
  Menu,
  Phone,
  Shield,
  Smartphone,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

import heroPhone from "@/assets/phone-hero.jpg";
import phoneClose from "@/assets/phone-close.jpg";
import repairLab from "@/assets/repair-lab.jpg";
import workbench from "@/assets/workbench.jpg";

interface HomeProps {
  targetSection?: string;
}

type Product = {
  title: string;
  price: string;
  tag: string;
  specs: string[];
  img: string;
};

type Service = {
  title: string;
  icon: React.ReactNode;
  from: string;
  time: string;
  note: string;
};

type NewsItem = {
  title: string;
  date: string;
  tag: string;
  desc: string;
  cta: string;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

function AnchorLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 head-tech text-sm text-muted-foreground hover:text-foreground transition">
      {children}
      <ArrowRight className="size-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
    </Link>
  );
}

function SectionTitle({ kicker, title, desc }: { kicker: string; title: string; desc: string }) {
  return (
    <div className="max-w-3xl">
      <div className="head-tech text-xs tracking-[0.14em] text-accent">{kicker}</div>
      <h2 className="mt-2 text-3xl sm:text-4xl font-semibold head-tech">{title}</h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

export default function Home({ targetSection }: HomeProps) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (targetSection) {
      // give layout a tick
      setTimeout(() => {
        document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [targetSection]);

  const products: Product[] = useMemo(
    () => [
      {
        title: "iPhone 11 64GB (б/в)",
        price: "від 8 900 грн",
        tag: "Перевірений / гарантія",
        specs: ["Face ID", "Акумулятор: 85%+", "Комплект: кабель"],
        img: heroPhone,
      },
      {
        title: "Android-смартфони (різні моделі)",
        price: "від 4 500 грн",
        tag: "Підбір під бюджет",
        specs: ["2 SIM / eSIM (залежить від моделі)", "Тест перед покупкою", "Обмін/Trade‑in"],
        img: phoneClose,
      },
      {
        title: "Аксесуари та захист",
        price: "від 99 грн",
        tag: "Скло / чохли",
        specs: ["Поклейка скла", "Чохли", "Кабелі / зарядки"],
        img: workbench,
      },
    ],
    []
  );

  const services: Service[] = useMemo(
    () => [
      {
        title: "Діагностика",
        icon: <BadgeCheck className="size-5" />,
        from: "0 грн",
        time: "до 30 хв",
        note: "Узгодимо ціну до ремонту",
      },
      {
        title: "Ремонт ноутбуків",
        icon: <Laptop className="size-5" />,
        from: "від 350 грн",
        time: "1–3 дні",
        note: "Чистка, живлення, клавіатура, матриця",
      },
      {
        title: "Ремонт телефонів",
        icon: <Smartphone className="size-5" />,
        from: "від 250 грн",
        time: "від 1 години",
        note: "Дисплей, акумулятор, роз'єми",
      },
      {
        title: "Профілактика / чистка",
        icon: <Wrench className="size-5" />,
        from: "від 300 грн",
        time: "у день звернення",
        note: "Система охолодження, термопаста",
      },
    ],
    []
  );

  const news: NewsItem[] = useMemo(
    () => [
      {
        date: "20.06.2026",
        tag: "АКЦІЯ",
        title: "-15% на чистку ноутбука + термопаста",
        desc: "Діє цього тижня. Профілактика охолодження + контроль температур після обслуговування.",
        cta: "Записатися",
      },
      {
        date: "18.06.2026",
        tag: "НОВИНА",
        title: "Trade‑in: приймаємо старі телефони",
        desc: "Принесіть свій смартфон — оцінимо стан і зробимо знижку на покупку.",
        cta: "Дізнатися деталі",
      },
      {
        date: "12.06.2026",
        tag: "АКЦІЯ",
        title: "Поклейка захисного скла зі знижкою",
        desc: "При покупці чохла — знижка на поклейку скла. Швидко та без пилу.",
        cta: "Уточнити",
      },
    ],
    []
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function submitRequest(e: React.FormEvent) {
    e.preventDefault();

    // No backend: we show confirmation and keep data locally.
    if (!phone.trim()) {
      toast.error("Введіть номер телефону — щоб ми могли зв'язатися");
      return;
    }

    toast.success("Заявку надіслано (демо)", {
      description: "На реальному сайті підключимо Telegram/Email/CRM форму.",
    });

    setName("");
    setPhone("");
    setMessage("");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top chrome */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => setLocation("/")}
            className="group flex items-baseline gap-2"
            aria-label="На головну"
          >
            <div className="flex flex-col items-start leading-none">
              <div className="head-tech text-lg font-semibold tracking-tight">TECH//SHOP</div>
              <div className="head-tech text-xs text-accent mt-1">BuBLik</div>
            </div>
            <div className="hidden sm:block text-xs text-muted-foreground">
              продаж • ремонт • апгрейд
            </div>
            <div className="ml-1 size-2 bg-accent rounded-[2px]" />
          </button>

          <nav className="ml-auto hidden md:flex items-center gap-5">
            <AnchorLink href="/catalog">Каталог</AnchorLink>
            <AnchorLink href="/repair">Ремонт</AnchorLink>
            <AnchorLink href="/prices">Ціни</AnchorLink>
            <AnchorLink href="/news">Новини / акції</AnchorLink>
            <AnchorLink href="/contacts">Контакти</AnchorLink>
          </nav>

          <div className="ml-auto md:ml-0 flex items-center gap-2">
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="head-tech border-border/60 bg-transparent hover:bg-muted" size="icon" aria-label="Меню">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-background text-foreground border-border/60">
                  <SheetHeader>
                    <SheetTitle className="head-tech">Навігація</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 grid gap-3">
                    <Button variant="outline" className="justify-start head-tech" onClick={() => setLocation("/catalog")}>Каталог</Button>
                    <Button variant="outline" className="justify-start head-tech" onClick={() => setLocation("/repair")}>Ремонт</Button>
                    <Button variant="outline" className="justify-start head-tech" onClick={() => setLocation("/prices")}>Ціни</Button>
                    <Button variant="outline" className="justify-start head-tech" onClick={() => setLocation("/news")}>Новини / акції</Button>
                    <Button variant="outline" className="justify-start head-tech" onClick={() => setLocation("/contacts")}>Контакти</Button>
                    <Button className="justify-start head-tech bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setLocation("/request")}>Залишити заявку</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <Button
              variant="outline"
              className="head-tech border-border/60 bg-transparent hover:bg-muted"
              onClick={() => setLocation("/contacts")}
            >
              <Phone className="mr-2 size-4" />
              Зателефонувати
            </Button>
            <Button
              className="head-tech bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => setLocation("/request")}
            >
              Залишити заявку
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brutal-grid" />
        <div className="absolute inset-0 grain" />

        <div className="mx-auto max-w-6xl px-4 pt-10 pb-10 sm:pt-14 sm:pb-14 relative">
          <motion.div variants={container} initial="hidden" animate="show" className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <motion.div variants={item} className="pt-2">
              <div className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/40 px-4 py-2">
                <span className="head-tech text-xs tracking-[0.18em] text-muted-foreground">SERVICE-BAY</span>
                <span className="h-4 w-px bg-border/70" />
                <span className="text-xs text-muted-foreground">Діагностика • продаж • ремонт</span>
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold head-tech leading-[1.05]">
                Смартфони та ремонт техніки
                <span className="text-accent"> без сюрпризів</span>.
              </h1>
              <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl">
                Підберемо телефон під бюджет, перевіримо перед покупкою. Полагодимо ноутбук або телефон:
                від діагностики до заміни компонентів — зі зрозумілими термінами та гарантією.
              </p>

              <motion.div variants={item} className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setLocation("/news")}
                  className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-card/40 px-3 py-2 text-sm hover:bg-muted transition"
                  aria-label="Перейти до новин та акцій"
                >
                  <span className="head-tech text-xs tracking-[0.16em] text-accent">АКЦІЯ</span>
                  <span className="text-muted-foreground">-15% на чистку ноутбука цього тижня</span>
                  <ArrowRight className="size-4" />
                </button>
                <div className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-card/40 px-3 py-2 text-sm">
                  <Clock className="size-4 text-accent" />
                  Швидкі терміни
                </div>
                <div className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-card/40 px-3 py-2 text-sm">
                  <Shield className="size-4 text-accent" />
                  Гарантія на роботу
                </div>
                <div className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-card/40 px-3 py-2 text-sm">
                  <Hammer className="size-4 text-accent" />
                  Чесна діагностика
                </div>
              </motion.div>

              <motion.div variants={item} className="mt-7 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="head-tech bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => setLocation("/catalog")}
                >
                  Переглянути телефони <ArrowRight className="ml-2 size-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="head-tech border-border/60 bg-transparent hover:bg-muted"
                  onClick={() => setLocation("/repair")}
                >
                  Дізнатися про ремонт
                </Button>
              </motion.div>

              <motion.div variants={item} className="mt-8 grid sm:grid-cols-3 gap-3">
                <Card className="bg-card/40 border-border/60 p-4">
                  <div className="head-tech text-xs text-muted-foreground tracking-[0.16em]">ДІАГНОСТИКА</div>
                  <div className="mt-1 text-2xl font-semibold">до 30 хв</div>
                  <div className="mt-1 text-sm text-muted-foreground">у більшості випадків</div>
                </Card>
                <Card className="bg-card/40 border-border/60 p-4">
                  <div className="head-tech text-xs text-muted-foreground tracking-[0.16em]">РЕМОНТ ТЕЛЕФОНУ</div>
                  <div className="mt-1 text-2xl font-semibold">від 1 години</div>
                  <div className="mt-1 text-sm text-muted-foreground">типові роботи</div>
                </Card>
                <Card className="bg-card/40 border-border/60 p-4">
                  <div className="head-tech text-xs text-muted-foreground tracking-[0.16em]">РЕМОНТ НОУТБУКА</div>
                  <div className="mt-1 text-2xl font-semibold">1–3 дні</div>
                  <div className="mt-1 text-sm text-muted-foreground">залежно від завдання</div>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={item} className="relative">
              <div className="relative rounded-xl overflow-hidden border border-border/60">
                <img
                  src={heroPhone}
                  alt="Смартфон"
                  className="w-full h-[420px] sm:h-[520px] object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className="head-tech text-xs tracking-[0.18em] text-muted-foreground">СЬОГОДНІ В НАЯВНОСТІ</div>
                      <div className="mt-1 text-lg font-semibold">Хіти та б/в у хорошому стані</div>
                      <div className="mt-1 text-sm text-muted-foreground">Перевірка, тест, допомога з перенесенням даних</div>
                    </div>
                    <div className="hidden sm:block">
                      <div className="h-10 w-10 hazard-divider rounded-md border border-border/60" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <Card className="bg-card/40 border-border/60 overflow-hidden">
                  <div className="p-4">
                    <div className="head-tech text-xs tracking-[0.16em] text-muted-foreground">СЕРВІС</div>
                    <div className="mt-1 text-sm">Працюємо акуратно та за чек-листом</div>
                  </div>
                  <div className="h-28">
                    <img src={workbench} alt="Робоче місце" className="w-full h-full object-cover opacity-90" loading="lazy" />
                  </div>
                </Card>
                <Card className="bg-card/40 border-border/60 overflow-hidden">
                  <div className="p-4">
                    <div className="head-tech text-xs tracking-[0.16em] text-muted-foreground">ПАЙКА / МОДУЛІ</div>
                    <div className="mt-1 text-sm">Живлення, роз'єми, плати</div>
                  </div>
                  <div className="h-28">
                    <img src={repairLab} alt="Ремонт" className="w-full h-full object-cover opacity-90" loading="lazy" />
                  </div>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="hazard-divider h-2" />
      </section>

      {/* CATALOG */}
      <section id="catalog" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionTitle
          kicker="CATALOG"
          title="Продаж телефонів"
          desc="Приклади карток — сюди легко додати реальні моделі та ціни. На робочому сайті можна підключити фільтри та завантаження каталогу з таблиці/CRM."
        />

        <div className="mt-7 grid md:grid-cols-3 gap-4">
          {products.map((p) => (
            <Card key={p.title} className="bg-card/40 border-border/60 overflow-hidden">
              <div className="h-44">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="font-semibold leading-snug">{p.title}</div>
                  <div className="head-tech text-xs px-2 py-1 rounded-md bg-accent text-accent-foreground">{p.tag}</div>
                </div>
                <div className="mt-2 head-tech text-lg">{p.price}</div>
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  {p.specs.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-accent" />
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex gap-2">
                  <Button
                    className="head-tech bg-accent text-accent-foreground hover:bg-accent/90 flex-1"
                    onClick={() => setLocation("/request")}
                  >
                    Дізнатися наявність
                  </Button>
                  <Button
                    variant="outline"
                    className="head-tech border-border/60 bg-transparent hover:bg-muted"
                    onClick={() => toast.message("Демо", { description: "Тут буде сторінка товару / швидке замовлення" })}
                  >
                    Детальніше
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="hazard-divider h-2" />

      {/* REPAIR */}
      <section id="repair" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionTitle
          kicker="REPAIR"
          title="Ремонт ноутбуків та іншої техніки"
          desc="Ми не починаємо ремонт, доки ви не підтвердите вартість. Нижче — типові послуги та орієнтири за термінами."
        />

        <div className="mt-7 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => (
            <Card key={s.title} className="bg-card/40 border-border/60 p-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 head-tech">
                  <span className="text-accent">{s.icon}</span>
                  <span className="text-sm">{s.title}</span>
                </div>
                <div className="size-2 rounded-[2px] bg-accent" />
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="inline-flex items-center gap-2"><BatteryCharging className="size-4" /> від</span>
                  <span className="text-foreground font-medium">{s.from}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="inline-flex items-center gap-2"><Clock className="size-4" /> термін</span>
                  <span className="text-foreground font-medium">{s.time}</span>
                </div>
                <div className="pt-2 text-muted-foreground leading-relaxed">{s.note}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-7 grid lg:grid-cols-[0.9fr_1.1fr] gap-4">
          <Card className="bg-card/40 border-border/60 overflow-hidden">
            <div className="h-56">
              <img src={repairLab} alt="Ремонтна зона" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-5">
              <div className="head-tech text-xs tracking-[0.16em] text-muted-foreground">ПРОЦЕС</div>
              <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-3"><span className="head-tech text-accent">01</span> Прийом та швидкий огляд</li>
                <li className="flex gap-3"><span className="head-tech text-accent">02</span> Діагностика та узгодження вартості</li>
                <li className="flex gap-3"><span className="head-tech text-accent">03</span> Ремонт / тести / видача + гарантія</li>
              </ol>
            </div>
          </Card>

          <Card className="bg-card/40 border-border/60 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="head-tech text-xs tracking-[0.16em] text-muted-foreground">ЩО РЕМОНТУЄМО</div>
                <div className="mt-2 text-lg font-semibold">Ноутбуки • телефони • інша електроніка</div>
              </div>
              <Cpu className="size-10 text-accent" />
            </div>

            <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/30 p-4">
                <Laptop className="size-5 text-accent mt-0.5" />
                <div>
                  <div className="font-medium">Ноутбуки</div>
                  <div className="text-muted-foreground">чистка, живлення, матриця, клавіатура</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/30 p-4">
                <Smartphone className="size-5 text-accent mt-0.5" />
                <div>
                  <div className="font-medium">Смартфони</div>
                  <div className="text-muted-foreground">дисплей, АКБ, роз'єми, динаміки</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/30 p-4">
                <Wrench className="size-5 text-accent mt-0.5" />
                <div>
                  <div className="font-medium">Профілактика</div>
                  <div className="text-muted-foreground">термопаста, охолодження, апгрейд</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/30 p-4">
                <Phone className="size-5 text-accent mt-0.5" />
                <div>
                  <div className="font-medium">Консультація</div>
                  <div className="text-muted-foreground">підбір, перенесення даних, налаштування</div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button className="head-tech bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setLocation("/request")}
              >
                Розрахувати ремонт
              </Button>
              <Button
                variant="outline"
                className="head-tech border-border/60 bg-transparent hover:bg-muted"
                onClick={() => setLocation("/contacts")}
              >
                Як нас знайти
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <div className="hazard-divider h-2" />

      {/* PRICES */}
      <section id="prices" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionTitle
          kicker="PRICES"
          title="Ціни на ремонт"
          desc="Таблиця типових послуг: орієнтири за вартістю, термінами та гарантією. Підсумок підтверджуємо до початку робіт."
        />

        <Card className="mt-7 bg-card/40 border-border/60 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-5 border-b border-border/60">
            <div className="head-tech text-xs tracking-[0.16em] text-muted-foreground">ПРАЙС (ОРІЄНТИРИ)</div>
            <div className="text-sm text-muted-foreground">Запчастини та модель можуть впливати на підсумок</div>
          </div>

          <div className="p-2 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/60">
                  <TableHead className="head-tech min-w-[220px]">Послуга</TableHead>
                  <TableHead className="head-tech min-w-[120px]">Від</TableHead>
                  <TableHead className="head-tech min-w-[140px]">Термін</TableHead>
                  <TableHead className="head-tech min-w-[120px]">Гарантія</TableHead>
                  <TableHead className="head-tech min-w-[240px]">Коментар</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-border/60">
                  <TableCell className="font-medium">Заміна акумулятора (телефон)</TableCell>
                  <TableCell className="head-tech">від 550 грн</TableCell>
                  <TableCell>1–2 години</TableCell>
                  <TableCell>30 днів</TableCell>
                  <TableCell className="text-muted-foreground">Перевірка зарядки/ємності після заміни</TableCell>
                </TableRow>

                <TableRow className="border-border/60">
                  <TableCell className="font-medium">Заміна дисплея (телефон)</TableCell>
                  <TableCell className="head-tech">від 900 грн</TableCell>
                  <TableCell>1–3 години</TableCell>
                  <TableCell>30 днів</TableCell>
                  <TableCell className="text-muted-foreground">Ціна залежить від моделі та якості модуля</TableCell>
                </TableRow>

                <TableRow className="border-border/60">
                  <TableCell className="font-medium">Заміна роз'єму зарядки</TableCell>
                  <TableCell className="head-tech">від 450 грн</TableCell>
                  <TableCell>2–5 годин</TableCell>
                  <TableCell>30 днів</TableCell>
                  <TableCell className="text-muted-foreground">Пайка/заміна шлейфу — за ситуацією</TableCell>
                </TableRow>

                <TableRow className="border-border/60">
                  <TableCell className="font-medium">Чистка ноутбука + термопаста</TableCell>
                  <TableCell className="head-tech">від 600 грн</TableCell>
                  <TableCell>у день звернення</TableCell>
                  <TableCell>14 днів</TableCell>
                  <TableCell className="text-muted-foreground">Профілактика охолодження, контроль температур</TableCell>
                </TableRow>

                <TableRow className="border-border/60">
                  <TableCell className="font-medium">Встановлення Windows + налаштування</TableCell>
                  <TableCell className="head-tech">від 500 грн</TableCell>
                  <TableCell>2–4 години</TableCell>
                  <TableCell>7 днів</TableCell>
                  <TableCell className="text-muted-foreground">Драйвери, оновлення, базовий софт</TableCell>
                </TableRow>

                <TableRow className="border-border/60">
                  <TableCell className="font-medium">Апгрейд SSD / RAM</TableCell>
                  <TableCell className="head-tech">від 350 грн</TableCell>
                  <TableCell>1–2 години</TableCell>
                  <TableCell>14 днів</TableCell>
                  <TableCell className="text-muted-foreground">Перенесення системи/даних — за домовленістю</TableCell>
                </TableRow>

                <TableRow className="border-border/60">
                  <TableCell className="font-medium">Складний ремонт плати (живлення)</TableCell>
                  <TableCell className="head-tech">від 900 грн</TableCell>
                  <TableCell>1–3 дні</TableCell>
                  <TableCell>30 днів</TableCell>
                  <TableCell className="text-muted-foreground">Після діагностики уточнюємо ціну та термін</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="px-5 pb-5 text-xs text-muted-foreground">
            <span className="head-tech text-accent">Примітка:</span> гарантія не поширюється на наслідки вологи/механіки після ремонту.
          </div>
        </Card>
      </section>

      <div className="hazard-divider h-2" />

      {/* NEWS */}
      <section id="news" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionTitle
          kicker="NEWS"
          title="Новини / акції"
          desc="Оновлення, знижки та корисні оголошення. Натисніть — і ми підкажемо деталі."
        />

        <div className="mt-7 grid md:grid-cols-3 gap-4">
          {news.map((n) => (
            <Card key={n.title} className="bg-card/40 border-border/60 p-5 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 hazard-divider" />

              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="head-tech text-xs tracking-[0.16em] text-muted-foreground">{n.date}</div>
                  <div className="mt-2 text-lg font-semibold leading-snug">{n.title}</div>
                </div>
                <div className="head-tech text-xs px-2 py-1 rounded-md bg-accent text-accent-foreground">{n.tag}</div>
              </div>

              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{n.desc}</p>

              <div className="mt-4 flex gap-2">
                <Button
                  className="head-tech bg-accent text-accent-foreground hover:bg-accent/90 flex-1"
                  onClick={() => {
                    toast.message(n.title, { description: "Демо: тут може бути повна новина/акція або форма запису." });
                    setLocation("/request");
                  }}
                >
                  {n.cta}
                </Button>
                <Button
                  variant="outline"
                  className="head-tech border-border/60 bg-transparent hover:bg-muted"
                  onClick={() => toast.message("Демо", { description: "Тут може бути окрема сторінка новини/акції" })}
                >
                  Деталі
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionTitle
          kicker="FAQ"
          title="Часті питання"
          desc="Коротко і по суті — щоб клієнт одразу розумів правила роботи." 
        />

        <div className="mt-7 grid lg:grid-cols-[1fr_1fr] gap-4 items-start">
          <Card className="bg-card/40 border-border/60 p-2">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-4 head-tech">Скільки коштує діагностика?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground">
                  Часто — безкоштовно або входить у вартість ремонту. Якщо потрібен складний розбір/вимірювання — попередимо заздалегідь.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="px-4 head-tech">Чи даєте гарантію?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground">
                  Так. Термін залежить від типу робіт та запчастин. Вкажемо у квитанції.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="px-4 head-tech">Що, якщо ціна зміниться?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground">
                  Без вашого підтвердження — нічого не робимо. Якщо виявимо додаткові проблеми, узгодимо новий бюджет.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="px-4 head-tech">Чи можна терміново «в день звернення»?</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground">
                  Так, для типових ремонтів (акумулятор/роз'єм/чистка). Щодо складних випадків — залежить від деталей.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          <Card className="bg-card/40 border-border/60 p-5">
            <div className="head-tech text-xs tracking-[0.16em] text-muted-foreground">ШВИДКИЙ ЗВ'ЯЗОК</div>
            <div className="mt-2 text-lg font-semibold">Напишіть у WhatsApp</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Натисніть кнопку нижче — відкриється чат у WhatsApp (якщо встановлено).
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                className="inline-flex"
                href="https://wa.me/380990744311"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline" className="head-tech border-border/60 bg-transparent hover:bg-muted">WhatsApp: +380 99 074 43 11</Button>
              </a>
              <a
                className="inline-flex"
                href="https://wa.me/380633366773"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline" className="head-tech border-border/60 bg-transparent hover:bg-muted">WhatsApp: +380 63 336 67 73</Button>
              </a>
            </div>
          </Card>
        </div>
      </section>

      <div className="hazard-divider h-2" />

      {/* CONTACTS + REQUEST */}
      <section id="contacts" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-4 items-start">
          <div>
            <SectionTitle
              kicker="CONTACTS"
              title="Контакти"
              desc="Підставте реальні телефон/адресу/графік — я залишив зрозумілі місця для заміни."
            />

            <div className="mt-6 grid gap-3">
              <Card className="bg-card/40 border-border/60 p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-accent mt-0.5" />
                  <div>
                    <div className="font-medium">Адреса</div>
                    <div className="text-sm text-muted-foreground">м. Ірпінь, вул. Соборна, 105</div>
                  </div>
                </div>
              </Card>
              <Card className="bg-card/40 border-border/60 p-5">
                <div className="flex items-start gap-3">
                  <Phone className="size-5 text-accent mt-0.5" />
                  <div>
                    <div className="font-medium">Телефон / WhatsApp</div>
                    <div className="text-sm text-muted-foreground">+380 99 074 43 11 • +380 63 336 67 73</div>
                  </div>
                </div>
              </Card>
              <Card className="bg-card/40 border-border/60 p-5">
                <div className="flex items-start gap-3">
                  <Clock className="size-5 text-accent mt-0.5" />
                  <div>
                    <div className="font-medium">Графік</div>
                    <div className="text-sm text-muted-foreground">Пн–Сб: 10:00–19:00 • Нд: вихідний</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <Card id="request" className="bg-card/40 border-border/60 p-5">
            <div className="head-tech text-xs tracking-[0.16em] text-muted-foreground">REQUEST</div>
            <div className="mt-2 text-2xl font-semibold head-tech">Залишити заявку</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Зараз це демонстраційна форма (без backend). Підключимо відправку в Telegram/Email/CRM.
            </p>

            <form className="mt-5 grid gap-3" onSubmit={submitRequest}>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ім'я (необов'язково)" />
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон *" />
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Що потрібно? (модель, проблема, терміново/не терміново)"
                className="min-h-[120px]"
              />
              <Button type="submit" className="head-tech bg-accent text-accent-foreground hover:bg-accent/90">
                Надіслати
              </Button>
            </form>

            <div className="mt-4 text-xs text-muted-foreground">
              Натискаючи «Надіслати», ви погоджуєтеся на обробку даних для зв'язку.
            </div>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex flex-col items-start leading-none">
              <div className="head-tech">TECH//SHOP</div>
              <div className="head-tech text-xs text-accent mt-1">BuBLik</div>
            </div>
            <div className="text-sm text-muted-foreground">Продаж телефонів • Ремонт ноутбуків • Інша техніка</div>
          </div>
          <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} • макет сайту</div>
        </div>
      </footer>
    </div>
  );
}