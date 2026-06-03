import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, PhoneOff, Loader2 } from "lucide-react";

type RealtimeSession = {
  model?: string;
  client_secret?: { value?: string };
};

type ToolCallEvent = {
  name: string;
  call_id: string;
  arguments?: string;
};

type LogEntry = { role: string; text: string };

const systemPrompt = `
You are the Kanso Flow voice assistant for usekansoflow.com.
Kanso Flow helps businesses deploy human-sounding AI voice agents for inbound calls, lead qualification, appointment booking, and customer follow-up.

You answer website demo calls in natural English. If the visitor speaks Arabic, respond in clear Arabic.
Keep every spoken turn short: 1 to 3 sentences. Ask one question at a time.
Sound warm, direct, and useful, like a founder-led automation consultant.

You can explain:
- Voice AI agents can answer missed calls 24/7.
- Agents can qualify leads, capture customer details, and book appointments.
- Agents can connect to calendars, CRMs, SMS, WhatsApp, and internal workflows.
- A website voice demo is cheaper than launching full telephony first.
- Production can later add phone numbers, SIP, recordings, analytics, and human handoff.

For demo booking, collect name, email or phone, business name, industry, monthly call volume, main use case, and preferred time.
Before creating a booking, repeat the details and ask the visitor to confirm.
Do not guarantee exact ROI, pricing, or integration timelines.
`;

const tools = [
  {
    type: "function",
    name: "CHECK_AVAILABILITY",
    description: "Check open demo slots for a Kanso Flow voice AI consultation.",
    parameters: {
      type: "object",
      properties: {
        preferred_date: { type: "string" },
        preferred_time: { type: "string" },
        use_case: { type: "string" },
      },
    },
  },
  {
    type: "function",
    name: "CONFIRM_BOOKING",
    description: "Create a demo booking after the visitor verbally confirms.",
    parameters: {
      type: "object",
      properties: {
        customer_name: { type: "string" },
        contact: { type: "string" },
        business_name: { type: "string" },
        industry: { type: "string" },
        monthly_call_volume: { type: "string" },
        appointment_datetime: { type: "string" },
        use_case: { type: "string" },
      },
      required: ["customer_name", "contact", "appointment_datetime"],
    },
  },
  {
    type: "function",
    name: "GET_PRICE_ESTIMATE",
    description: "Return demo pricing guidance for a Kanso Flow voice AI project.",
    parameters: {
      type: "object",
      properties: {
        use_case: { type: "string" },
        monthly_call_volume: { type: "string" },
        channels: { type: "string" },
      },
    },
  },
  {
    type: "function",
    name: "UPDATE_CRM",
    description: "Save a concise demo call summary.",
    parameters: {
      type: "object",
      properties: {
        customer_name: { type: "string" },
        contact: { type: "string" },
        business_name: { type: "string" },
        industry: { type: "string" },
        summary: { type: "string" },
        next_action: { type: "string" },
      },
      required: ["summary"],
    },
  },
];

const SESSION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/openai-realtime-session`;

export default function KansoVoiceAgent() {
  const [status, setStatus] = useState("Ready");
  const [isLive, setIsLive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const handledToolCallsRef = useRef(new Set<string>());

  async function startCall() {
    setIsConnecting(true);
    setStatus("Connecting…");

    try {
      const sessionResponse = await fetch(SESSION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      });
      const session = (await sessionResponse.json()) as RealtimeSession;

      if (!sessionResponse.ok) {
        throw new Error("Could not create voice session.");
      }

      const ephemeralKey = session.client_secret?.value;
      const model = session.model || "gpt-4o-realtime-preview-2024-12-17";
      if (!ephemeralKey) throw new Error("Voice session did not return a client secret.");

      const peerConnection = new RTCPeerConnection();
      peerConnectionRef.current = peerConnection;

      const dataChannel = peerConnection.createDataChannel("oai-events");
      dataChannelRef.current = dataChannel;
      dataChannel.addEventListener("open", configureSession);
      dataChannel.addEventListener("message", handleRealtimeEvent);

      peerConnection.ontrack = (event) => {
        if (audioRef.current) audioRef.current.srcObject = event.streams[0];
      };

      const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStreamRef.current = localStream;
      localStream.getTracks().forEach((t) => peerConnection.addTrack(t, localStream));

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      const sdpResponse = await fetch(
        `https://api.openai.com/v1/realtime?model=${encodeURIComponent(model)}`,
        {
          method: "POST",
          body: offer.sdp,
          headers: {
            Authorization: `Bearer ${ephemeralKey}`,
            "Content-Type": "application/sdp",
          },
        },
      );
      if (!sdpResponse.ok) throw new Error(await sdpResponse.text());

      await peerConnection.setRemoteDescription({
        type: "answer",
        sdp: await sdpResponse.text(),
      });

      setIsLive(true);
      setIsConnecting(false);
      setStatus("Live");
      addLog("System", "Connected. Say hello to the Kanso Flow voice agent.");
    } catch (error) {
      addLog("Error", error instanceof Error ? error.message : "Unknown error.");
      stopCall();
      setStatus("Error");
      setIsConnecting(false);
    }
  }

  function configureSession() {
    sendEvent({
      type: "session.update",
      session: {
        instructions: systemPrompt,
        tools,
        tool_choice: "auto",
      },
    });

    sendEvent({
      type: "response.create",
      response: {
        instructions:
          "Greet the visitor briefly and ask what kind of voice AI agent they want to build.",
      },
    });
  }

  function handleRealtimeEvent(message: MessageEvent) {
    const event = JSON.parse(message.data);
    if (event.type === "conversation.item.input_audio_transcription.completed") {
      addLog("You", event.transcript);
    }
    if (event.type === "response.audio_transcript.done") {
      addLog("Agent", event.transcript);
    }
    if (event.type === "response.function_call_arguments.done") {
      handleToolCall(event);
    }
    if (event.type === "response.done") {
      const functionCalls =
        event.response?.output?.filter(
          (item: ToolCallEvent & { type: string }) => item.type === "function_call",
        ) || [];
      functionCalls.forEach(handleToolCall);
    }
    if (event.type === "error") {
      addLog("Error", event.error?.message || "Unknown Realtime error.");
    }
  }

  function handleToolCall(event: ToolCallEvent) {
    if (handledToolCallsRef.current.has(event.call_id)) return;
    handledToolCallsRef.current.add(event.call_id);
    const args = JSON.parse(event.arguments || "{}");
    const output = runDemoTool(event.name, args);
    addLog(`Tool: ${event.name}`, JSON.stringify(output));
    sendEvent({
      type: "conversation.item.create",
      item: {
        type: "function_call_output",
        call_id: event.call_id,
        output: JSON.stringify(output),
      },
    });
    sendEvent({ type: "response.create" });
  }

  function runDemoTool(name: string, args: Record<string, unknown>) {
    if (name === "CHECK_AVAILABILITY") {
      return {
        available: true,
        slots: ["tomorrow at 10:00 AM", "tomorrow at 2:30 PM", "Thursday at 11:00 AM"],
        note: `Demo slots for ${args.use_case || "voice AI consultation"}`,
      };
    }
    if (name === "CONFIRM_BOOKING") {
      return {
        booking_id: `KANSO-${Math.floor(Math.random() * 9000) + 1000}`,
        status: "confirmed",
        ...args,
      };
    }
    if (name === "GET_PRICE_ESTIMATE") {
      return {
        currency: "USD",
        estimate_range:
          "Demo guidance only: website voice demos can stay low-cost; production phone agents depend on minutes, tools, channels, and integrations.",
        caveat: "Final pricing should be confirmed after scoping call volume and integrations.",
      };
    }
    if (name === "UPDATE_CRM") {
      return { status: "saved", saved_at: new Date().toISOString(), ...args };
    }
    return { status: "unknown_tool" };
  }

  function sendEvent(event: unknown) {
    const dataChannel = dataChannelRef.current;
    if (dataChannel?.readyState === "open") {
      dataChannel.send(JSON.stringify(event));
    }
  }

  function stopCall() {
    dataChannelRef.current?.close();
    peerConnectionRef.current?.close();
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    dataChannelRef.current = null;
    peerConnectionRef.current = null;
    localStreamRef.current = null;
    setIsLive(false);
    setStatus("Ready");
  }

  function addLog(role: string, text: string) {
    if (!text) return;
    setLog((current) => [...current.slice(-8), { role, text }]);
  }

  return (
    <section className="py-24 section-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-heading mb-3">
            Live Voice Demo
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Talk to a live Kanso Flow voice agent.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Click start, ask anything — qualifying leads, booking demos, or how a voice agent
            would work for your business.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto rounded-3xl border border-primary/20 bg-card p-6 sm:p-8 green-glow-sm overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />

          <div className="relative">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isLive
                      ? "bg-primary shadow-[0_0_16px_hsl(var(--primary))] animate-pulse"
                      : "bg-muted-foreground"
                  }`}
                />
                {status}
              </div>
              <span className="text-xs font-mono tracking-wider text-muted-foreground">
                OPENAI REALTIME · KANSO FLOW
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={startCall}
                disabled={isLive || isConnecting}
                className="inline-flex flex-1 min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-heading font-bold text-primary-foreground transition green-glow hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isConnecting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Mic size={18} />
                )}
                {isConnecting ? "Connecting…" : "Start voice chat"}
              </button>
              <button
                type="button"
                onClick={stopCall}
                disabled={!isLive}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background/40 px-6 font-heading font-bold text-foreground transition hover:bg-background/60 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <PhoneOff size={18} />
                End call
              </button>
            </div>

            <audio ref={audioRef} autoPlay />

            <div className="mt-8 max-h-72 overflow-auto rounded-2xl border border-border bg-background/40 p-4">
              <div className="mb-3 text-xs font-mono tracking-wider text-muted-foreground">
                LIVE CALL LOG
              </div>
              <div className="space-y-3">
                {log.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    The transcript will appear here once the call starts.
                  </p>
                ) : (
                  log.map((entry, index) => (
                    <div key={`${entry.role}-${index}`} className="text-sm leading-6">
                      <div className="font-semibold text-primary">{entry.role}</div>
                      <div className="text-foreground/90">{entry.text}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}