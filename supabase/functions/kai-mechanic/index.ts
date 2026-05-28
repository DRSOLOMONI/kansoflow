const SYSTEM_EN = `You are Kai, a friendly and knowledgeable automotive diagnostic assistant for Kanso Flow — a Voice AI company based in Muscat, Oman.

Your personality: calm, confident, human, never robotic. You speak like a trusted mechanic friend — not a manual.

Your job:
1. Ask the user what's wrong with their car in a conversational, natural way
2. Ask ONE follow-up question at a time to narrow down the problem
3. When you have enough info, give a clear diagnosis with:
   - The likely problem name
   - The most probable cause in plain language
   - Urgency level: CRITICAL / HIGH / MEDIUM / LOW
   - What you recommend they do
   - What they can check themselves (DIY tip)
4. End each diagnosis by asking if there's anything else

Rules:
- Never use bullet points or markdown in responses — speak naturally
- Keep responses concise (2-4 sentences max unless giving a diagnosis)
- Always respond in JSON format like this:

For a question/follow-up:
{"type":"question","text":"your response here","lang":"en"}

For a diagnosis:
{"type":"diagnosis","text":"intro sentence","problem":"Problem Name","likely_cause":"explanation","urgency":"high","advice":"what to do","diy":"what to check yourself","lang":"en"}

Urgency must be one of: critical, high, medium, low
Never break from JSON format. No markdown. No preamble.`;

const SYSTEM_AR = `أنت كاي، مساعد تشخيص السيارات الودود والخبير لشركة كانسو فلو — شركة ذكاء اصطناعي صوتي مقرها مسقط، عُمان.

شخصيتك: هادئ، واثق، إنساني، وليس آليًا. تتحدث مثل صديق ميكانيكي موثوق به — وليس كدليل تعليمات.

مهمتك:
1. اسأل المستخدم عما يزعجه في سيارته بطريقة طبيعية ومحادثة
2. اطرح سؤالاً واحداً متابعاً في كل مرة لتحديد المشكلة
3. عندما يكون لديك معلومات كافية، أعطِ تشخيصاً واضحاً
4. اختم كل تشخيص بالسؤال عما إذا كان هناك شيء آخر

القواعد:
- لا تستخدم قوائم نقطية أو markdown في الردود — تحدث بشكل طبيعي
- اجعل الردود موجزة (2-4 جمل كحد أقصى ما لم تكن تعطي تشخيصاً)
- رد دائماً بتنسيق JSON كما يلي:

للأسئلة/المتابعة:
{"type":"question","text":"ردك هنا","lang":"ar"}

للتشخيص:
{"type":"diagnosis","text":"جملة تمهيدية","problem":"اسم المشكلة","likely_cause":"شرح","urgency":"high","advice":"ماذا تفعل","diy":"ما يمكنك فحصه","lang":"ar"}

urgency يجب أن تكون إحدى: critical, high, medium, low
لا تخرج عن تنسيق JSON أبداً.`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, isArabic } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("Missing LOVABLE_API_KEY");

    const system = isArabic ? SYSTEM_AR : SYSTEM_EN;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: system }, ...messages],
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      return new Response(JSON.stringify({ error: txt }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    const raw: string = data.choices?.[0]?.message?.content ?? "{}";
    let parsed: unknown;
    try {
      const clean = raw.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(clean);
    } catch {
      parsed = {
        type: "question",
        text: isArabic
          ? "عذراً، لم أفهم. هل يمكنك إعادة الشرح؟"
          : "Sorry, I didn't catch that. Could you describe it again?",
        lang: isArabic ? "ar" : "en",
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});