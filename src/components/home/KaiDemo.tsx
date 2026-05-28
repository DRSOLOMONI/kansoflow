import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Mic, Square, Send, Wrench, Volume2, VolumeX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

type Urgency = "critical" | "high" | "medium" | "low";

interface Diagnosis {
  problem: string;
  likely_cause: string;
  urgency: Urgency;
  advice: string;
  diy: string;
}

interface ChatMessage {
  id: number;
  role: "user" | "agent";
  text: string;
  diagnosis?: Diagnosis;
}

const detectArabic = (t: string) => /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(t);

const URGENCY_STYLE: Record<Urgency, { className: string; en: string; ar: string }> = {
  critical: { className: "bg-red-500/15 text-red-400 border-red-500/40", en: "Urgent — Stop Driving", ar: "عاجل — أوقف السيارة" },
  high: { className: "bg-orange-500/15 text-orange-400 border-orange-500/40", en: "See a Mechanic Soon", ar: "راجع ميكانيكي قريباً" },
  medium: { className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/40", en: "Monitor & Schedule Service", ar: "راقب وحدد موعداً" },
  low: { className: "bg-primary/15 text-primary border-primary/40", en: "Likely Not a Problem", ar: "على الأرجح ليست مشكلة" },
};

function speak(text: string, lang: "en" | "ar", onStart: () => void, onEnd: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onEnd();
    return;
  }
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = lang === "ar" ? "ar-SA" : "en-US";
  utt.rate = 0.95;
  utt.pitch = 1.05;
  utt.onstart = onStart;
  utt.onend = onEnd;
  utt.onerror = onEnd;
  window.speechSynthesis.speak(utt);
}

function VoiceWave({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-[2px] h-4">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="w-[2px] rounded-sm bg-primary"
          style={{
            height: active ? `${6 + ((i * 3) % 10)}px` : "3px",
            animation: active ? `wave ${0.4 + i * 0.1}s ease-in-out infinite alternate` : "none",
          }}
        />
      ))}
    </div>
  );
}

export default function KaiDemo() {
  const { lang } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [history, setHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [isArabic, setIsArabic] = useState(lang === "ar");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [muted, setMuted] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setVoiceSupported(!!SR && !!window.speechSynthesis);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addAgent = useCallback(
    (text: string, msgLang: "en" | "ar", diagnosis?: Diagnosis) => {
      setMessages((prev) => [...prev, { id: Date.now() + Math.random(), role: "agent", text, diagnosis }]);
      if (!muted) speak(text, msgLang, () => setIsSpeaking(true), () => setIsSpeaking(false));
    },
    [muted]
  );

  const start = () => {
    setStarted(true);
    setIsTyping(true);
    const greeting = isArabic
      ? "مرحباً، أنا كاي من كانسو فلو. ما الذي يحدث مع سيارتك اليوم؟"
      : "Hey, I'm Kai from Kanso Flow. What's going on with your car today?";
    setTimeout(() => {
      setIsTyping(false);
      setHistory([{ role: "assistant", content: greeting }]);
      addAgent(greeting, isArabic ? "ar" : "en");
    }, 600);
  };

  const send = async (override?: string) => {
    const text = (override ?? input).trim();
    if (!text || isTyping) return;
    setInput("");

    const userAr = detectArabic(text);
    if (userAr !== isArabic) setIsArabic(userAr);

    setMessages((p) => [...p, { id: Date.now(), role: "user", text }]);
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);

    const newHistory = [...history, { role: "user" as const, content: text }];
    setHistory(newHistory);
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke("kai-mechanic", {
        body: { messages: newHistory, isArabic: userAr },
      });
      setIsTyping(false);
      if (error) throw error;

      const replyText = data?.text ?? "";
      const replyLang: "en" | "ar" = data?.lang === "ar" ? "ar" : "en";
      setHistory((p) => [...p, { role: "assistant", content: replyText }]);

      if (data?.type === "diagnosis") {
        addAgent(replyText, replyLang, {
          problem: data.problem,
          likely_cause: data.likely_cause,
          urgency: (data.urgency as Urgency) || "medium",
          advice: data.advice,
          diy: data.diy,
        });
      } else {
        addAgent(replyText, replyLang);
      }
    } catch {
      setIsTyping(false);
      const err = userAr ? "عذراً، حدث خطأ. حاول مرة أخرى." : "Sorry, something went wrong. Please try again.";
      setMessages((p) => [...p, { id: Date.now(), role: "agent", text: err }]);
    }
  };

  const toggleMic = () => {
    if (!voiceSupported) return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    const r = new SR();
    recognitionRef.current = r;
    r.continuous = false;
    r.interimResults = true;
    r.lang = isArabic ? "ar-SA" : "en-US";
    r.onstart = () => setListening(true);
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    r.onresult = (e: any) => {
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
      }
      if (final) {
        setInput(final);
        setListening(false);
        send(final);
      }
    };
    r.start();
  };

  const examplePrompts = isArabic
    ? ["السيارة تصدر صوت طقطقة عند الفرامل", "المحرك يهتز عند التوقف", "ضوء الفحص مضاء"]
    : ["Clicking noise when I brake", "Engine shakes at idle", "Check engine light is on"];

  return (
    <section className="py-24 section-gradient">
      <style>{`@keyframes wave { from { height: 3px } to { height: 14px } }`}</style>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-heading mb-4">
              {isArabic ? "تجربة مباشرة" : "Live Demo"}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              {isArabic
                ? "قابل كاي — وكيل ذكاء اصطناعي صوتي لتشخيص السيارات"
                : "Meet Kai — a voice AI agent diagnosing car problems"}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
              {isArabic
                ? "صف ما يحدث مع سيارتك. كاي يطرح الأسئلة الصحيحة ويعطيك تشخيصاً صادقاً مع مستوى الإلحاح وما يمكنك فحصه بنفسك — بالعربية أو الإنجليزية."
                : "Describe what's happening with your car. Kai asks the right questions, then gives an honest diagnosis with urgency level and DIY checks — in English or Arabic."}
            </p>
            <ul className="space-y-3 text-muted-foreground">
              {(isArabic
                ? ["محادثة طبيعية متعددة الأدوار", "إدخال صوتي وقراءة بصوت عالٍ", "تشخيص فوري مع مستوى الإلحاح"]
                : ["Natural multi-turn conversation", "Voice input + speaks back to you", "Instant diagnosis with urgency tier"]
              ).map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: chat widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-primary/20 bg-card overflow-hidden green-glow-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />

            {/* header */}
            <div className="relative flex items-center gap-3 p-4 border-b border-border bg-background/40">
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/40 flex items-center justify-center">
                <Wrench className="text-primary" size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-heading font-bold text-foreground text-sm">
                  {isArabic ? "كاي — تشخيص السيارات" : "Kai — Auto Diagnostic"}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary text-[10px] font-mono tracking-wider">
                    {isArabic ? "متصل · كانسو فلو" : "ONLINE · KANSO FLOW"}
                  </span>
                  {isSpeaking && <VoiceWave active />}
                </div>
              </div>
              <button
                onClick={() => setIsArabic((v) => !v)}
                className="px-2 py-1 rounded-md border border-primary/30 bg-primary/10 text-primary text-[10px] font-mono font-bold hover:bg-primary/20 transition"
              >
                {isArabic ? "AR" : "EN"}
              </button>
              <button
                onClick={() => {
                  setMuted((m) => !m);
                  window.speechSynthesis?.cancel();
                  setIsSpeaking(false);
                }}
                className="p-1.5 rounded-md border border-border text-muted-foreground hover:text-primary transition"
                aria-label="mute"
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>

            {/* body */}
            <div className="relative h-[460px] overflow-y-auto p-4 flex flex-col">
              {!started ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-5">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <span className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
                    <div className="w-14 h-14 rounded-full bg-primary/15 border-2 border-primary/50 flex items-center justify-center">
                      <Wrench className="text-primary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-foreground font-heading font-bold text-xl mb-2">
                      {isArabic ? "هل سيارتك تعاني من مشكلة؟" : "Car acting up?"}
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      {isArabic
                        ? "تحدث مع كاي — صف ما يحدث واحصل على تشخيص في ثوانٍ."
                        : "Talk to Kai — describe what's happening and get a diagnosis in seconds."}
                    </p>
                  </div>
                  <button
                    onClick={start}
                    className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-sm green-glow hover:opacity-90 transition"
                  >
                    {isArabic ? "ابدأ التشخيص" : "Start Diagnosis"}
                  </button>
                  <div className="flex flex-wrap gap-2 justify-center max-w-sm">
                    {examplePrompts.map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setStarted(true);
                          setHistory([]);
                          send(p);
                        }}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((m) => {
                    const isUser = m.role === "user";
                    const msgAr = detectArabic(m.text);
                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col mb-3 ${isUser ? "items-end" : "items-start"}`}
                      >
                        {!isUser && (
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[11px] font-bold">
                              K
                            </div>
                            <span className="text-primary text-[10px] font-mono tracking-wider">KAI</span>
                          </div>
                        )}
                        <div
                          className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
                            isUser
                              ? "bg-primary/15 border border-primary/30 text-foreground rounded-[18px_18px_4px_18px]"
                              : "bg-background/60 border border-border text-foreground/90 rounded-[4px_18px_18px_18px]"
                          }`}
                          dir={msgAr ? "rtl" : "ltr"}
                        >
                          {m.text}
                        </div>
                        {m.diagnosis && (
                          <DiagnosisCard d={m.diagnosis} isArabic={msgAr || isArabic} />
                        )}
                      </div>
                    );
                  })}
                  {isTyping && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[11px] font-bold">
                        K
                      </div>
                      <div className="bg-background/60 border border-border rounded-[4px_18px_18px_18px] px-3 py-2 flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-primary"
                            style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </>
              )}
            </div>

            {/* input */}
            {started && (
              <div className="relative p-3 border-t border-border bg-background/40">
                <div className="flex items-end gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 focus-within:border-primary/50 transition">
                  <textarea
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    placeholder={isArabic ? "صف ما يحدث مع سيارتك..." : "Describe what's happening with your car…"}
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex-1 bg-transparent text-foreground text-sm leading-relaxed resize-none focus:outline-none placeholder:text-muted-foreground max-h-20"
                  />
                  {voiceSupported && (
                    <button
                      onClick={toggleMic}
                      disabled={isTyping}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                        listening
                          ? "bg-red-500 text-white"
                          : "bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary/40"
                      }`}
                      aria-label="mic"
                    >
                      {listening ? <Square size={14} /> : <Mic size={14} />}
                    </button>
                  )}
                  <button
                    onClick={() => send()}
                    disabled={!input.trim() || isTyping}
                    className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition"
                    aria-label="send"
                  >
                    <Send size={14} />
                  </button>
                </div>
                <div className="text-center text-[10px] font-mono text-muted-foreground mt-2 tracking-wider">
                  KANSO FLOW · VOICE AI · {isArabic ? "عربي / English" : "English / عربي"}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DiagnosisCard({ d, isArabic }: { d: Diagnosis; isArabic: boolean }) {
  const u = URGENCY_STYLE[d.urgency] || URGENCY_STYLE.medium;
  const rows = isArabic
    ? [
        { label: "السبب المحتمل", text: d.likely_cause },
        { label: "توصية كاي", text: d.advice },
        { label: "ما يمكنك فحصه", text: d.diy },
      ]
    : [
        { label: "Likely Cause", text: d.likely_cause },
        { label: "What Kai Recommends", text: d.advice },
        { label: "What You Can Check", text: d.diy },
      ];
  return (
    <div
      className="w-full max-w-[90%] mt-2 rounded-2xl border border-primary/20 bg-background/70 p-4"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold tracking-wider uppercase mb-3 ${u.className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {isArabic ? u.ar : u.en}
      </span>
      <div className="text-foreground font-heading font-bold text-base mb-3">{d.problem}</div>
      {rows.map((r) => (
        <div key={r.label} className="mb-2.5 last:mb-0">
          <div className="text-primary text-[10px] font-mono tracking-wider uppercase mb-1">{r.label}</div>
          <div className="text-muted-foreground text-xs leading-relaxed">{r.text}</div>
        </div>
      ))}
    </div>
  );
}