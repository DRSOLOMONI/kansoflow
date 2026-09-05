import { useEffect, useMemo, useRef, useState } from "react";
import { Mic, Send, Trash2, CheckCircle2, Plus, Minus, X } from "lucide-react";

type Lang = "en" | "ar";
type Role = "user" | "assistant";

type MenuItem = {
  emoji: string;
  price: number;
  en: string;
  ar: string;
  aliases: string[];
  upsell: string | null;
};

type OrderItem = {
  id: string;
  qty: number;
  mod: string;
  emoji: string;
  price: number;
  en: string;
  ar: string;
};

type Message = { role: Role; content: string; arabic?: boolean };

const CURRENCY = "OMR";

const MENU: Record<string, MenuItem> = {
  cappuccino: { emoji: "☕", price: 1.2, en: "Cappuccino", ar: "كابتشينو", aliases: ["cappuccino", "coffee", "قهوة", "كابتشينو"], upsell: "croissant" },
  latte: { emoji: "🥛", price: 1.3, en: "Latte", ar: "لاتيه", aliases: ["latte", "لاتيه"], upsell: "vanilla-syrup" },
  "matcha-latte": { emoji: "🍵", price: 1.5, en: "Matcha Latte", ar: "لاتيه ماتشا", aliases: ["matcha", "ماتشا"], upsell: "croissant" },
  "orange-juice": { emoji: "🍊", price: 1.1, en: "Fresh Orange Juice", ar: "عصير برتقال طازج", aliases: ["orange", "juice", "عصير", "برتقال"], upsell: "croissant" },
  "lemon-mint": { emoji: "🍋", price: 1.0, en: "Lemon Mint", ar: "ليمون نعناع", aliases: ["lemon", "mint", "ليمون", "نعناع"], upsell: "cheesecake" },
  croissant: { emoji: "🥐", price: 0.7, en: "Butter Croissant", ar: "كرواسان بالزبدة", aliases: ["croissant", "كرواسان"], upsell: "cappuccino" },
  muffin: { emoji: "🧁", price: 0.8, en: "Blueberry Muffin", ar: "مافن توت أزرق", aliases: ["muffin", "مافن"], upsell: "latte" },
  cheesecake: { emoji: "🍰", price: 1.5, en: "New York Cheesecake", ar: "تشيزكيك نيويورك", aliases: ["cake", "cheesecake", "كيك", "تشيزكيك"], upsell: "latte" },
  "club-sandwich": { emoji: "🥪", price: 2.2, en: "Club Sandwich", ar: "كلوب ساندويتش", aliases: ["sandwich", "club", "ساندويتش", "كلوب"], upsell: "orange-juice" },
  "caesar-salad": { emoji: "🥗", price: 2.0, en: "Caesar Salad", ar: "سلطة سيزر", aliases: ["salad", "caesar", "سلطة", "سيزر"], upsell: "lemon-mint" },
  "vanilla-syrup": { emoji: "🍯", price: 0.2, en: "Vanilla Syrup", ar: "شراب الفانيليا", aliases: ["vanilla", "syrup", "فانيليا"], upsell: null },
  "oat-milk": { emoji: "🌾", price: 0.3, en: "Oat Milk Upgrade", ar: "ترقية لحليب الشوفان", aliases: ["oat", "oat milk", "شوفان"], upsell: null },
};

const T = {
  en: {
    greeting: "Hi, I am Zara from Kanso Flow. I can take a pickup order, answer menu questions, and hand the summary to your team. Try: two lattes and a croissant for pickup.",
    title: "Meet Zara, the AI phone agent for cafes.",
    subtitle: "This front-end demo works even before a live phone/POS integration is connected.",
    orderTitle: "Confirmed draft order",
    totalLabel: "Total",
    confirm: "Send to team",
    clear: "Clear",
    mic: "Speak order",
    listening: "Listening",
    placeholder: "Type a customer call, menu question, or pickup order...",
    chips: ["Two lattes", "Croissant", "Any vegan dessert?", "Book table for four", "Catering for 30"],
    empty: "No order yet. Ask Zara for coffee, cake, salad, sandwiches, or juice.",
  },
  ar: {
    greeting: "أهلاً، أنا زارا من كانسو فلو. أستطيع أخذ طلب استلام، الرد على أسئلة المنيو، وإرسال ملخص للفريق. جرّب: لاتيهين وكرواسان للاستلام.",
    title: "تعرّف على زارا، وكيل الهاتف الذكي للمقاهي.",
    subtitle: "هذا العرض يعمل في الواجهة حتى قبل ربط الهاتف أو نظام نقاط البيع.",
    orderTitle: "مسودة الطلب المؤكد",
    totalLabel: "الإجمالي",
    confirm: "إرسال للفريق",
    clear: "مسح",
    mic: "تحدث بالطلب",
    listening: "جاري الاستماع",
    placeholder: "اكتب مكالمة عميل أو سؤال منيو أو طلب استلام...",
    chips: ["لاتيهين", "كرواسان", "هل لديكم حلى نباتي؟", "حجز طاولة لأربعة", "كاترينغ لـ ٣٠"],
    empty: "لا يوجد طلب بعد. اطلب من زارا قهوة، كيك، سلطة، ساندويتش، أو عصير.",
  },
} as const;

const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

function quantityFrom(text: string) {
  const lower = text.toLowerCase();
  if (/\b(two|2)\b|اثنين|اثنتين|٢/.test(lower)) return 2;
  if (/\b(three|3)\b|ثلاث|٣/.test(lower)) return 3;
  if (/\b(four|4)\b|أربع|اربعة|٤/.test(lower)) return 4;
  return 1;
}

function findMenuItems(text: string) {
  const lower = text.toLowerCase();
  return Object.entries(MENU)
    .filter(([, item]) => item.aliases.some((alias) => lower.includes(alias.toLowerCase())))
    .map(([id]) => id);
}

export default function VoiceWaiter() {
  const [lang, setLang] = useState<Lang>("en");
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [modal, setModal] = useState<"none" | "success">("none");
  const [orderNumber, setOrderNumber] = useState("");
  const recognitionRef = useRef<any>(null);
  const convRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: "assistant", content: T[lang].greeting, arabic: lang === "ar" }]);
  }, [lang]);

  useEffect(() => {
    if (convRef.current) convRef.current.scrollTop = convRef.current.scrollHeight;
  }, [messages]);

  const total = useMemo(() => order.reduce((sum, item) => sum + item.price * item.qty, 0), [order]);

  function addToOrder(ids: string[], qty: number, mod = "") {
    setOrder((prev) => {
      const next = [...prev];
      ids.forEach((id) => {
        const item = MENU[id];
        if (!item) return;
        const existing = next.find((orderItem) => orderItem.id === id && orderItem.mod === mod);
        if (existing) existing.qty += qty;
        else next.push({ id, qty, mod, emoji: item.emoji, price: item.price, en: item.en, ar: item.ar });
      });
      return next;
    });
  }

  function buildReply(text: string, ids: string[], ar: boolean) {
    const lower = text.toLowerCase();
    if (/catering|كاترينغ|تموين/.test(lower)) {
      return ar
        ? "أكيد. سأجمع التاريخ، عدد الأشخاص، الميزانية، الملاحظات الغذائية، ورقم التواصل، ثم أرسل ملخصاً للمدير للمتابعة."
        : "Absolutely. I would collect the date, guest count, budget, dietary notes, and contact number, then send a structured catering brief to the manager.";
    }
    if (/book|reservation|table|حجز|طاولة/.test(lower)) {
      return ar
        ? "أقدر أساعد بالحجز. سأحتاج عدد الأشخاص، الوقت، الاسم، ورقم الهاتف، ثم أرسل تأكيداً للفريق والعميل."
        : "I can help with the reservation. I would collect party size, time, name, and phone number, then send the confirmation to staff and the guest.";
    }
    if (/vegan|allerg|gluten|نباتي|حساسية|حساسيه/.test(lower)) {
      return ar
        ? "لدينا تشيزكيك وحلويات يومية، ويمكن ضبط زارا لتعرف الحساسية والمكونات المتوفرة كل يوم قبل الرد على العميل."
        : "We can train Zara on allergens and daily availability. For this demo, she can explain dessert options and flag anything the team should confirm.";
    }
    if (ids.length > 0) {
      const names = ids.map((id) => (ar ? MENU[id].ar : MENU[id].en)).join(ar ? " و" : " and ");
      const upsellId = MENU[ids[0]]?.upsell;
      const upsell = upsellId ? MENU[upsellId] : null;
      const upsellText = upsell ? (ar ? ` هل ترغب بإضافة ${upsell.ar}؟` : ` Would you like to add ${upsell.en}?`) : "";
      return ar
        ? `تم. أضفت ${names} إلى طلب الاستلام وكررت الطلب للتأكيد قبل إرساله للفريق.${upsellText}`
        : `Got it. I added ${names} to the pickup order and would repeat it back before sending it to your team.${upsellText}`;
    }
    return ar
      ? "أستطيع أخذ طلب استلام، الرد على أسئلة المنيو، تسجيل حجز، أو تجهيز طلب كاترينغ. اكتب طلباً مثل: لاتيهين وكرواسان."
      : "I can take a pickup order, answer menu questions, capture a reservation, or prepare a catering lead. Try asking for two lattes and a croissant.";
  }

  function send(text: string) {
    const clean = text.trim();
    if (!clean) return;
    const ar = isArabic(clean) || lang === "ar";
    const ids = findMenuItems(clean);
    const qty = quantityFrom(clean);
    setMessages((prev) => [...prev, { role: "user", content: clean, arabic: ar }]);
    if (ids.length > 0) addToOrder(ids, qty);
    setInput("");

    window.setTimeout(() => {
      const reply = buildReply(clean, ids, ar);
      setMessages((prev) => [...prev, { role: "assistant", content: reply, arabic: ar }]);
      speak(reply, ar ? "ar-SA" : "en-US");
    }, 350);
  }

  function speak(text: string, voiceLang: string) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = voiceLang;
    utter.rate = 0.98;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find((voice) => voice.lang.startsWith(voiceLang.split("-")[0]));
    if (preferred) utter.voice = preferred;
    window.speechSynthesis.speak(utter);
  }

  function toggleMic() {
    if (isRecording) {
      try { recognitionRef.current?.stop(); } catch {}
      setIsRecording(false);
      return;
    }
    const SpeechRecognition: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: lang === "ar" ? "إدخال الصوت غير مدعوم في هذا المتصفح. جرّب Chrome أو Edge." : "Voice input is not supported in this browser. Try Chrome or Edge.", arabic: lang === "ar" },
      ]);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = lang === "ar" ? "ar-SA" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsRecording(false);
      send(transcript);
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    try { recognition.start(); } catch { setIsRecording(false); }
    recognitionRef.current = recognition;
  }

  function removeFromOrder(id: string) {
    setOrder((prev) => prev.filter((item) => item.id !== id));
  }

  function changeQty(id: string, delta: number) {
    setOrder((prev) =>
      prev.flatMap((item) => {
        if (item.id !== id) return [item];
        const qty = item.qty + delta;
        return qty <= 0 ? [] : [{ ...item, qty }];
      }),
    );
  }

  function confirmOrder() {
    if (order.length === 0) {
      setMessages((prev) => [...prev, { role: "assistant", content: T[lang].empty, arabic: lang === "ar" }]);
      return;
    }
    setOrderNumber("KF-" + Math.floor(1000 + Math.random() * 9000));
    setModal("success");
  }

  function clearOrder() {
    setOrder([]);
    setMessages([{ role: "assistant", content: T[lang].greeting, arabic: lang === "ar" }]);
  }

  return (
    <section className="py-20 sm:py-24 bg-background" id="zara-demo">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-heading mb-3">Live Demo</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">{T[lang].title}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{T[lang].subtitle}</p>
        </div>

        <div className="mx-auto w-full max-w-[900px]">
          <div className="flex justify-end mb-3">
            <div className="inline-flex bg-card border border-border rounded-[10px] p-[3px] gap-[2px]">
              {(["en", "ar"] as Lang[]).map((language) => (
                <button
                  key={language}
                  onClick={() => setLang(language)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-[7px] transition ${
                    lang === language ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {language === "en" ? "EN" : "عربي"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-4">
            <div className="bg-card border border-border rounded-[8px] overflow-hidden">
              <div className="flex items-center gap-4 p-6 border-b border-border bg-primary/5">
                <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl">Z</div>
                <div>
                  <div className="text-xl font-bold tracking-tight">Zara</div>
                  <div className="text-sm text-muted-foreground">Restaurant phone agent · Arabic + English</div>
                </div>
              </div>

              <div ref={convRef} className="p-5 min-h-[300px] max-h-[380px] overflow-y-auto flex flex-col gap-3.5 border-b border-border">
                {messages.map((message, index) => (
                  <div key={`${message.content}-${index}`} className={`flex gap-2.5 max-w-[92%] ${message.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}>
                    <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${message.role === "user" ? "bg-muted" : "bg-primary text-primary-foreground"}`}>
                      {message.role === "user" ? "U" : "Z"}
                    </div>
                    <div
                      dir={message.arabic ? "rtl" : "ltr"}
                      className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed border whitespace-pre-wrap ${
                        message.role === "assistant"
                          ? "bg-primary/5 border-primary/20 rounded-tl-[4px]"
                          : "bg-muted border-border rounded-tr-[4px]"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 flex flex-col gap-3.5">
                <div className="flex flex-wrap gap-2">
                  {T[lang].chips.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => send(chip)}
                      className="px-3 py-1.5 rounded-full border border-border bg-muted text-xs hover:border-primary hover:text-primary hover:bg-primary/10 transition"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2.5 items-end">
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        send(input);
                      }
                    }}
                    rows={1}
                    placeholder={T[lang].placeholder}
                    dir={lang === "ar" ? "rtl" : "ltr"}
                    className="flex-1 bg-muted border border-border rounded-xl px-4 py-3 text-sm resize-none outline-none focus:border-primary/50 min-h-[46px] max-h-[120px]"
                  />
                  <button
                    onClick={() => send(input)}
                    disabled={!input.trim()}
                    className="w-[46px] h-[46px] rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition shrink-0 flex items-center justify-center"
                    title="Send"
                  >
                    <Send size={18} />
                  </button>
                </div>

                <button
                  onClick={toggleMic}
                  className={`w-full py-3.5 rounded-xl border-[1.5px] text-sm font-medium flex items-center justify-center gap-2.5 transition ${
                    isRecording
                      ? "border-amber-500 text-amber-500 bg-amber-500/10"
                      : "border-border bg-muted hover:border-primary/50"
                  }`}
                >
                  <Mic size={18} />
                  {isRecording ? T[lang].listening : T[lang].mic}
                </button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-[8px] p-5 flex flex-col">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">{T[lang].orderTitle}</div>
                  <div className="text-xs text-muted-foreground mt-1">Counter handoff preview</div>
                </div>
                <button onClick={clearOrder} className="h-9 w-9 rounded-md border border-border bg-muted hover:border-destructive hover:text-destructive transition flex items-center justify-center" title="Clear">
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex-1 space-y-2 min-h-[240px]">
                {order.length === 0 ? (
                  <div className="h-full rounded-[8px] border border-dashed border-border bg-muted/40 p-5 text-sm text-muted-foreground flex items-center justify-center text-center leading-relaxed">
                    {T[lang].empty}
                  </div>
                ) : (
                  order.map((item) => (
                    <div key={item.id + item.mod} className="flex items-center justify-between gap-3 p-3 bg-muted border border-border rounded-[8px]">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-lg">{item.emoji}</span>
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate">{lang === "ar" ? item.ar : item.en}</div>
                          <div className="text-xs text-muted-foreground">{CURRENCY} {item.price.toFixed(3)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => changeQty(item.id, -1)} className="h-7 w-7 rounded-md border border-border bg-background hover:border-primary hover:text-primary transition flex items-center justify-center"><Minus size={13} /></button>
                        <span className="w-5 text-center text-sm">{item.qty}</span>
                        <button onClick={() => changeQty(item.id, 1)} className="h-7 w-7 rounded-md border border-border bg-background hover:border-primary hover:text-primary transition flex items-center justify-center"><Plus size={13} /></button>
                        <button onClick={() => removeFromOrder(item.id)} className="h-7 w-7 rounded-md text-muted-foreground hover:text-destructive transition flex items-center justify-center"><X size={14} /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">{T[lang].totalLabel}</span>
                  <span className="text-2xl font-bold text-primary">{CURRENCY} {total.toFixed(3)}</span>
                </div>
                <button
                  onClick={confirmOrder}
                  className="w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={18} />
                  {T[lang].confirm}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal === "success" && (
        <div
          onClick={(event) => { if (event.target === event.currentTarget) setModal("none"); }}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in"
        >
          <div className="bg-card border border-primary/25 rounded-[8px] p-8 w-full max-w-[420px] text-center">
            <CheckCircle2 size={52} className="mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">{lang === "ar" ? "تم تجهيز ملخص الطلب" : "Order summary ready"}</h3>
            <p className="text-sm text-muted-foreground mb-6">
              {lang === "ar" ? "في المنتج الحقيقي، يرسل كانسو فلو هذا الملخص للفريق عبر القناة التي تختارها." : "In production, Kanso Flow sends this summary to your team through your chosen handoff channel."}
            </p>
            <div className="bg-primary/10 border border-primary/30 rounded-[8px] py-3 px-5 mb-6">
              <div className="text-[11px] text-muted-foreground mb-1 uppercase tracking-wider">{lang === "ar" ? "رقم الطلب" : "Order Number"}</div>
              <div className="text-2xl font-extrabold text-primary">{orderNumber}</div>
            </div>
            <button onClick={() => setModal("none")} className="w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition">
              {lang === "ar" ? "إغلاق" : "Close"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
