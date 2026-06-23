import { useEffect, useRef, useState } from "react";

type Lang = "en" | "ar";
type Role = "user" | "assistant";

type MenuItem = {
  emoji: string;
  price: number;
  en: string;
  ar: string;
  cat: "drinks" | "food" | "extra";
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
  cappuccino: { emoji: "☕", price: 1.2, en: "Cappuccino", ar: "كابتشينو", cat: "drinks", upsell: "croissant" },
  latte: { emoji: "🥛", price: 1.3, en: "Latte", ar: "لاتيه", cat: "drinks", upsell: "vanilla-syrup" },
  espresso: { emoji: "⚡", price: 0.8, en: "Espresso", ar: "إسبريسو", cat: "drinks", upsell: "croissant" },
  americano: { emoji: "☕", price: 0.9, en: "Americano", ar: "أمريكانو", cat: "drinks", upsell: "muffin" },
  "matcha-latte": { emoji: "🍵", price: 1.5, en: "Matcha Latte", ar: "لاتيه ماتشا", cat: "drinks", upsell: "croissant" },
  "orange-juice": { emoji: "🍊", price: 1.1, en: "Fresh Orange Juice", ar: "عصير برتقال طازج", cat: "drinks", upsell: "croissant" },
  "mineral-water": { emoji: "💧", price: 0.3, en: "Mineral Water", ar: "مياه معدنية", cat: "drinks", upsell: "lemon-mint" },
  "lemon-mint": { emoji: "🍋", price: 1.0, en: "Lemon Mint", ar: "ليمون نعناع", cat: "drinks", upsell: "cheesecake" },
  croissant: { emoji: "🥐", price: 0.7, en: "Butter Croissant", ar: "كرواسان بالزبدة", cat: "food", upsell: "cappuccino" },
  muffin: { emoji: "🧁", price: 0.8, en: "Blueberry Muffin", ar: "مافن توت أزرق", cat: "food", upsell: "latte" },
  cheesecake: { emoji: "🍰", price: 1.5, en: "New York Cheesecake", ar: "تشيزكيك نيويورك", cat: "food", upsell: "latte" },
  "club-sandwich": { emoji: "🥪", price: 2.2, en: "Club Sandwich", ar: "كلوب ساندويتش", cat: "food", upsell: "orange-juice" },
  "caesar-salad": { emoji: "🥗", price: 2.0, en: "Caesar Salad", ar: "سلطة سيزر", cat: "food", upsell: "lemon-mint" },
  pasta: { emoji: "🍝", price: 2.8, en: "Pasta Arrabiata", ar: "باستا أرابياتا", cat: "food", upsell: "mineral-water" },
  shakshuka: { emoji: "🍳", price: 2.5, en: "Shakshuka", ar: "شكشوكة", cat: "food", upsell: "orange-juice" },
  "vanilla-syrup": { emoji: "🍯", price: 0.2, en: "Vanilla Syrup", ar: "شراب الفانيليا", cat: "extra", upsell: null },
  "oat-milk": { emoji: "🌾", price: 0.3, en: "Oat Milk Upgrade", ar: "ترقية لحليب الشوفان", cat: "extra", upsell: null },
};

const T = {
  en: {
    greeting:
      "Hi there! 👋 I'm Zara, your AI waiter. What can I get you today? Try the coffee, ask for the menu, or tap a chip below.",
    waiterSub: "I take orders, suggest add-ons, and send them straight to the kitchen.",
    orderTitle: "Current Order",
    totalLabel: "Total",
    btnConfirm: "Place Order",
    btnClear: "Clear",
    micLabel: "Tap to speak",
    micRecording: "Listening… tap to stop",
    placeholder: "Type your order…",
    chips: ["☕ Coffee", "🥐 Croissant", "🥗 Salad", "🥪 Sandwich", "🍵 Matcha", "🍰 Cake"],
    chipKeys: ["cappuccino", "croissant", "caesar-salad", "club-sandwich", "matcha-latte", "cheesecake"],
    quickOrder: (en: string) => `I'd like a ${en}`,
  },
  ar: {
    greeting:
      "أهلاً وسهلاً! 👋 أنا زارا، النادل الذكي. ماذا يمكنني أن أحضر لك اليوم؟ جرّب القهوة أو اسأل عن قائمة الطعام.",
    waiterSub: "آخذ الطلب، أقترح الإضافات، وأرسله مباشرة للمطبخ.",
    orderTitle: "الطلب الحالي",
    totalLabel: "الإجمالي",
    btnConfirm: "تأكيد الطلب",
    btnClear: "مسح",
    micLabel: "اضغط للتحدث",
    micRecording: "جاري الاستماع… اضغط للإيقاف",
    placeholder: "اكتب طلبك…",
    chips: ["☕ قهوة", "🥐 كرواسان", "🥗 سلطة", "🥪 ساندويتش", "🍵 ماتشا", "🍰 كيك"],
    chipKeys: ["cappuccino", "croissant", "caesar-salad", "club-sandwich", "matcha-latte", "cheesecake"],
    quickOrder: (ar: string) => `أريد ${ar}`,
  },
} as const;

function buildSystemPrompt(lang: Lang) {
  const menuList = Object.entries(MENU)
    .map(([id, m]) => `- ${id}: ${m.en} / ${m.ar} — ${CURRENCY} ${m.price.toFixed(3)}`)
    .join("\n");

  return `You are Zara, a warm, friendly, professional AI waiter for a premium café.
You speak both Arabic and English fluently and switch based on the customer's language.
Current language preference: ${lang === "ar" ? "Arabic (respond in Arabic)" : "English (respond in English)"}.

MENU (use ONLY these items, use their exact ID when placing):
${menuList}

RULES:
1. Be conversational, warm, and human — never robotic.
2. When a customer orders an item on the menu, acknowledge warmly and ALWAYS append an ORDER_UPDATE directive at the END of your message in this exact format:
   [ORDER_UPDATE:{"items":[{"id":"item-id","qty":1,"mod":"optional"}]}]
3. After taking an order, you MAY suggest ONE upsell that pairs well. Keep it short.
4. If asked about the menu, list items conversationally by category.
5. Never add items not on the menu.
6. To remove an item, output [REMOVE_ITEM:{"id":"item-id"}]
7. To confirm/place the order, output [CONFIRM_ORDER] at the end.
8. Keep responses SHORT — 2 to 4 sentences max. This is a voice interface.
9. Currency is OMR. Format prices as X.XXX.`;
}

const isArabic = (s: string) => /[\u0600-\u06FF]/.test(s);

const SESSION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/voice-waiter-chat`;

export default function VoiceWaiter() {
  const [lang, setLang] = useState<Lang>("en");
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<{ role: Role; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [upsell, setUpsell] = useState<{ id: string; item: MenuItem } | null>(null);
  const [modal, setModal] = useState<"none" | "confirm" | "success">("none");
  const [orderNumber, setOrderNumber] = useState("");

  const upsellShownRef = useRef<Set<string>>(new Set());
  const recognitionRef = useRef<any>(null);
  const convRef = useRef<HTMLDivElement>(null);

  // Greeting on mount + when language changes (replace greeting)
  useEffect(() => {
    setMessages([{ role: "assistant", content: T[lang].greeting, arabic: lang === "ar" }]);
    setHistory([]);
  }, [lang]);

  // Autoscroll
  useEffect(() => {
    if (convRef.current) convRef.current.scrollTop = convRef.current.scrollHeight;
  }, [messages, isThinking]);

  const total = order.reduce((s, o) => s + o.price * o.qty, 0);

  function addToOrder(items: { id: string; qty: number; mod?: string }[]) {
    setOrder((prev) => {
      const next = [...prev];
      items.forEach(({ id, qty, mod }) => {
        const m = MENU[id];
        if (!m) return;
        const existing = next.find((o) => o.id === id && o.mod === (mod || ""));
        if (existing) existing.qty += qty;
        else next.push({ id, qty, mod: mod || "", emoji: m.emoji, price: m.price, en: m.en, ar: m.ar });
      });
      return next;
    });
    const first = items[0]?.id;
    if (first) tryUpsell(first);
  }

  function tryUpsell(orderedId: string) {
    const item = MENU[orderedId];
    if (!item?.upsell) return;
    const upsellId = item.upsell;
    if (upsellShownRef.current.has(upsellId)) return;
    if (order.find((o) => o.id === upsellId)) return;
    const upsellItem = MENU[upsellId];
    if (!upsellItem) return;
    upsellShownRef.current.add(upsellId);
    setUpsell({ id: upsellId, item: upsellItem });
    setTimeout(() => setUpsell((u) => (u?.id === upsellId ? null : u)), 8000);
  }

  function removeFromOrder(id: string) {
    setOrder((p) => p.filter((o) => o.id !== id));
  }
  function changeQty(id: string, delta: number) {
    setOrder((p) =>
      p.flatMap((o) => {
        if (o.id !== id) return [o];
        const q = o.qty + delta;
        return q <= 0 ? [] : [{ ...o, qty: q }];
      }),
    );
  }
  function clearOrder() {
    setOrder([]);
    upsellShownRef.current = new Set();
    setUpsell(null);
  }

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || isThinking) return;
    const ar = isArabic(clean) || lang === "ar";
    setMessages((m) => [...m, { role: "user", content: clean, arabic: ar }]);
    const newHistory = [...history, { role: "user" as Role, content: clean }];
    setHistory(newHistory);
    setInput("");
    setIsThinking(true);

    try {
      const res = await fetch(SESSION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newHistory, system: buildSystemPrompt(lang) }),
      });
      if (!res.ok) {
        if (res.status === 429) throw new Error("Rate limit reached. Please try again shortly.");
        if (res.status === 402) throw new Error("AI credits exhausted. Please top up in workspace billing.");
        throw new Error(`Server error (${res.status})`);
      }
      const data = await res.json();
      const raw: string = data.text || "";

      const orderMatch = raw.match(/\[ORDER_UPDATE:({[\s\S]*?})\]/);
      const removeMatch = raw.match(/\[REMOVE_ITEM:({[\s\S]*?})\]/);
      const confirmMatch = raw.includes("[CONFIRM_ORDER]");
      const cleanText = raw
        .replace(/\[ORDER_UPDATE:[\s\S]*?\]/g, "")
        .replace(/\[REMOVE_ITEM:[\s\S]*?\]/g, "")
        .replace(/\[CONFIRM_ORDER\]/g, "")
        .trim();

      if (orderMatch) {
        try {
          const parsed = JSON.parse(orderMatch[1]);
          if (parsed.items) addToOrder(parsed.items);
        } catch {}
      }
      if (removeMatch) {
        try {
          const parsed = JSON.parse(removeMatch[1]);
          if (parsed.id) removeFromOrder(parsed.id);
        } catch {}
      }
      if (confirmMatch) setModal("confirm");

      const replyArabic = isArabic(cleanText);
      setMessages((m) => [...m, { role: "assistant", content: cleanText, arabic: replyArabic }]);
      setHistory((h) => [...h, { role: "assistant", content: cleanText }]);
      speak(cleanText, replyArabic ? "ar-SA" : "en-US");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setMessages((m) => [...m, { role: "assistant", content: msg, arabic: false }]);
    } finally {
      setIsThinking(false);
    }
  }

  function speak(text: string, voiceLang: string) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/[#*_`[\]()>]/g, "").trim();
    if (!clean) return;
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = voiceLang;
    utter.rate = 0.98;
    utter.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find((v) => v.lang.startsWith(voiceLang.split("-")[0]));
    if (preferred) utter.voice = preferred;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
  }

  function toggleMic() {
    if (isRecording) {
      try { recognitionRef.current?.stop(); } catch {}
      setIsRecording(false);
      return;
    }
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Voice input isn't supported in this browser. Try Chrome or Edge.", arabic: false },
      ]);
      return;
    }
    const rec = new SR();
    rec.lang = lang === "ar" ? "ar-SA" : "en-US";
    rec.continuous = false;
    rec.interimResults = false;
    rec.onstart = () => setIsRecording(true);
    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setIsRecording(false);
      send(transcript);
    };
    rec.onerror = () => setIsRecording(false);
    rec.onend = () => setIsRecording(false);
    try { rec.start(); } catch { setIsRecording(false); }
    recognitionRef.current = rec;
  }

  function quickOrder(id: string) {
    const m = MENU[id];
    if (!m) return;
    send(lang === "ar" ? T.ar.quickOrder(m.ar) : T.en.quickOrder(m.en));
  }

  function confirmAndSend() {
    const num = "KF-" + Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(num);
    setModal("success");
    setHistory([]);
  }

  function newOrder() {
    setOrder([]);
    upsellShownRef.current = new Set();
    setUpsell(null);
    setModal("none");
    setMessages([{ role: "assistant", content: T[lang].greeting, arabic: lang === "ar" }]);
    setHistory([]);
  }

  const orbState = isThinking ? "thinking" : isSpeaking ? "speaking" : isRecording ? "listening" : "idle";

  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-heading mb-3">Live Voice Demo</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">Meet Zara — the voice agent that takes orders.</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Speak or type. Watch the order, upsells, and POS hand-off happen in real time.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[780px]">
          {/* Lang toggle */}
          <div className="flex justify-end mb-3">
            <div className="inline-flex bg-card border border-border rounded-[10px] p-[3px] gap-[2px]">
              {(["en", "ar"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-[7px] transition ${
                    lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l === "en" ? "EN" : "عربي"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-[20px] overflow-hidden">
            {/* Hero / orb */}
            <div className="flex items-center gap-5 p-7 border-b border-border bg-gradient-to-br from-card via-card to-primary/5">
              <div className="relative shrink-0">
                <div
                  className={`w-[72px] h-[72px] rounded-full flex items-center justify-center text-3xl relative z-10 transition-shadow ${
                    orbState === "speaking" ? "animate-pulse shadow-[0_0_32px_8px_hsl(var(--primary)/0.3)]" :
                    orbState === "listening" ? "shadow-[0_0_0_12px_hsl(var(--primary)/0.2),0_0_0_24px_hsl(var(--primary)/0.08)]" :
                    orbState === "thinking" ? "animate-pulse shadow-[0_0_24px_4px_hsl(var(--primary)/0.25)]" : ""
                  }`}
                  style={{ background: "radial-gradient(circle at 38% 38%, #00ff88, #00D66F 55%, #009e52)" }}
                >
                  🤖
                </div>
                <div className={`absolute bottom-[3px] end-[3px] w-3.5 h-3.5 rounded-full border-2 border-card ${
                  orbState === "idle" ? "bg-primary" : orbState === "listening" ? "bg-amber-500" : "bg-primary"
                }`} />
              </div>
              <div className="flex-1">
                <div className="text-xl font-bold tracking-tight mb-1">
                  Meet <span className="text-primary">Zara</span> — Your AI Waiter
                </div>
                <div className="text-sm text-muted-foreground">{T[lang].waiterSub}</div>
                <div className="text-[11px] text-primary/60 mt-1.5 font-medium tracking-wider uppercase">Powered by Kanso Flow</div>
              </div>
              {/* waveform */}
              <div className="hidden sm:flex items-center gap-[3px] h-8">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-[3px] rounded bg-primary ${orbState === "speaking" ? "animate-[wave_1.1s_ease-in-out_infinite]" : ""}`}
                    style={{ height: 6, animationDelay: `${(i % 4) * 0.07}s` }}
                  />
                ))}
              </div>
            </div>

            {/* Conversation */}
            <div ref={convRef} className="p-6 min-h-[260px] max-h-[340px] overflow-y-auto flex flex-col gap-3.5 border-b border-border">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2.5 max-w-[90%] ${m.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}>
                  <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-sm shrink-0 mt-0.5 ${m.role === "user" ? "bg-muted" : "bg-primary"}`}>
                    {m.role === "user" ? "🧑" : "🤖"}
                  </div>
                  <div
                    dir={m.arabic ? "rtl" : "ltr"}
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed border whitespace-pre-wrap ${
                      m.role === "assistant"
                        ? "bg-primary/5 border-primary/20 rounded-tl-[4px]"
                        : "bg-muted border-border rounded-tr-[4px]"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex gap-2.5 items-center">
                  <div className="w-[30px] h-[30px] rounded-full bg-primary flex items-center justify-center text-sm">🤖</div>
                  <div className="bg-primary/5 border border-primary/20 rounded-2xl rounded-tl-[4px] px-4 py-3 flex gap-1.5">
                    {[0, 0.15, 0.3].map((d, i) => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${d}s` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order panel */}
            {order.length > 0 && (
              <div className="px-7 py-5 border-b border-border">
                <div className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground mb-3.5 font-semibold">{T[lang].orderTitle}</div>
                <div className="flex flex-col gap-2">
                  {order.map((o) => (
                    <div key={o.id + o.mod} className="flex items-center justify-between p-2.5 bg-muted border border-border rounded-[10px]">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{o.emoji}</span>
                        <div>
                          <div className="text-sm font-medium">{lang === "ar" ? o.ar : o.en}</div>
                          {o.mod && <div className="text-xs text-muted-foreground">{o.mod}</div>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <button onClick={() => changeQty(o.id, -1)} className="w-[22px] h-[22px] rounded-md border border-border bg-background hover:border-primary hover:text-primary transition">−</button>
                          <span>{o.qty}</span>
                          <button onClick={() => changeQty(o.id, 1)} className="w-[22px] h-[22px] rounded-md border border-border bg-background hover:border-primary hover:text-primary transition">+</button>
                        </div>
                        <div className="text-sm font-semibold text-primary min-w-[52px] text-end">
                          {CURRENCY} {(o.price * o.qty).toFixed(3)}
                        </div>
                        <button onClick={() => removeFromOrder(o.id)} className="text-muted-foreground hover:text-destructive transition" title="Remove">✕</button>
                      </div>
                    </div>
                  ))}
                </div>

                {upsell && (
                  <div className="mt-3 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] border border-primary/25 bg-primary/10">
                    <span className="text-lg">✨</span>
                    <span className="flex-1 text-sm">
                      {lang === "ar" ? "يجمع رائع مع " : "Pairs perfectly with "}
                      <strong className="text-primary">{lang === "ar" ? upsell.item.ar : upsell.item.en}</strong>
                      {` — ${CURRENCY} ${upsell.item.price.toFixed(3)}`}
                    </span>
                    <button
                      onClick={() => { addToOrder([{ id: upsell.id, qty: 1 }]); setUpsell(null); }}
                      className="bg-primary text-primary-foreground rounded-md px-2.5 py-1 text-xs font-semibold"
                    >
                      + Add
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between mt-3.5 pt-3.5 border-t border-border">
                  <span className="text-sm text-muted-foreground">{T[lang].totalLabel}</span>
                  <span className="text-lg font-bold text-primary">{CURRENCY} {total.toFixed(3)}</span>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="p-7 flex flex-col gap-3.5">
              <div className="flex flex-wrap gap-2">
                {T[lang].chips.map((label, i) => (
                  <button
                    key={label}
                    onClick={() => quickOrder(T[lang].chipKeys[i])}
                    className="px-3 py-1.5 rounded-full border border-border bg-muted text-xs hover:border-primary hover:text-primary hover:bg-primary/10 transition"
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex gap-2.5 items-end">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
                  }}
                  rows={1}
                  placeholder={T[lang].placeholder}
                  dir={lang === "ar" ? "rtl" : "ltr"}
                  className="flex-1 bg-muted border border-border rounded-xl px-4 py-3 text-sm resize-none outline-none focus:border-primary/50 min-h-[46px] max-h-[120px]"
                />
                <button
                  onClick={() => send(input)}
                  disabled={isThinking || !input.trim()}
                  className="w-[46px] h-[46px] rounded-xl bg-primary text-primary-foreground text-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition shrink-0"
                  title="Send"
                >
                  ➤
                </button>
              </div>

              <button
                onClick={toggleMic}
                className={`w-full py-3.5 rounded-2xl border-[1.5px] text-sm font-medium flex items-center justify-center gap-2.5 transition ${
                  isRecording
                    ? "border-amber-500 text-amber-500 bg-amber-500/10"
                    : "border-border bg-muted hover:border-primary/50"
                }`}
              >
                <span className="text-lg">{isRecording ? "⏹️" : "🎙️"}</span>
                {isRecording ? T[lang].micRecording : T[lang].micLabel}
              </button>

              <div className="flex gap-2.5 flex-wrap">
                <button
                  onClick={() => {
                    if (order.length === 0) {
                      setMessages((m) => [...m, { role: "assistant", content: lang === "ar" ? "لا يوجد طلب حالياً." : "Your order is empty!", arabic: lang === "ar" }]);
                      return;
                    }
                    setModal("confirm");
                  }}
                  className="flex-1 min-w-[130px] px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  ✅ {T[lang].btnConfirm}
                </button>
                <button
                  onClick={clearOrder}
                  className="flex-1 min-w-[130px] px-4 py-3 rounded-xl border border-destructive/30 bg-muted text-sm font-medium hover:border-destructive hover:text-destructive hover:bg-destructive/10 transition flex items-center justify-center gap-2"
                >
                  🗑️ {T[lang].btnClear}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 text-center text-xs text-muted-foreground/40">
            Voice AI demo · <span className="text-primary/50 font-medium">Kanso Flow</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal !== "none" && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setModal("none"); }}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in"
        >
          <div className="bg-card border border-primary/25 rounded-[20px] p-8 w-full max-w-[420px]">
            {modal === "confirm" ? (
              <>
                <div className="w-[60px] h-[60px] bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center text-2xl mb-5">📋</div>
                <h3 className="text-xl font-bold mb-2">{lang === "ar" ? "تأكيد الطلب" : "Confirm Order"}</h3>
                <p className="text-sm text-muted-foreground mb-6">{lang === "ar" ? "سيتم إرسال طلبك إلى نقطة البيع." : "Your order will be sent to the POS system."}</p>
                <div className="flex flex-col gap-2 mb-5">
                  {order.map((o) => (
                    <div key={o.id} className="flex justify-between text-sm py-2 border-b border-border">
                      <span>{o.emoji} {lang === "ar" ? o.ar : o.en} ×{o.qty}</span>
                      <span>{CURRENCY} {(o.price * o.qty).toFixed(3)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-base font-bold mb-6">
                  <span>{lang === "ar" ? "الإجمالي" : "Total"}</span>
                  <span className="text-primary">{CURRENCY} {total.toFixed(3)}</span>
                </div>
                <div className="flex gap-2.5">
                  <button onClick={() => setModal("none")} className="flex-1 px-4 py-3 rounded-xl border border-border bg-muted text-sm font-medium hover:border-primary hover:text-primary transition">
                    {lang === "ar" ? "تعديل" : "Edit"}
                  </button>
                  <button onClick={confirmAndSend} className="flex-1 px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition">
                    {lang === "ar" ? "تأكيد وإرسال ✓" : "Confirm & Send ✓"}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2">{lang === "ar" ? "تم إرسال الطلب!" : "Order Sent!"}</h3>
                <p className="text-sm text-muted-foreground mb-6">{lang === "ar" ? "تم إرسال طلبك بنجاح إلى المطبخ." : "Your order has been sent to the kitchen."}</p>
                <div className="bg-primary/10 border border-primary/30 rounded-[10px] py-3 px-5 mb-6">
                  <div className="text-[11px] text-muted-foreground mb-1 uppercase tracking-wider">{lang === "ar" ? "رقم الطلب" : "Order Number"}</div>
                  <div className="text-2xl font-extrabold text-primary">{orderNumber}</div>
                </div>
                <button onClick={newOrder} className="w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition">
                  {lang === "ar" ? "طلب جديد" : "Start New Order"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}