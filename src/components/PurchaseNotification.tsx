import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";

interface NotificationData {
  name: string;
  city: string;
  plan: string;
  time: string;
}

const FIRST_NAMES = [
  "Mariana", "Ana Clara", "Pedro", "João Pedro", "Carla", "Beatriz", "Gabriela", 
  "Felipe", "Lucas", "Matheus", "Thiago", "Camila", "Juliana", "Patricia", "Amanda",
  "Roberto", "Aline", "Daiane", "Sofia", "Manuela", "Guilherme", "Rodrigo"
];

const LAST_NAMES = [
  "Silva", "Santos", "Souza", "Oliveira", "Pereira", "Lima", "Carvalho", "Ferreira",
  "Rodrigues", "Almeida", "Nascimento", "Costa", "Araújo", "Cardoso", "Ribeiro"
];

const CITIES = [
  "São Paulo - SP", "Rio de Janeiro - RJ", "Belo Horizonte - MG", "Curitiba - PR",
  "Porto Alegre - RS", "Salvador - BA", "Brasília - DF", "Fortaleza - CE", "Recife - PE",
  "Goiânia - GO", "Campinas - SP", "Florianópolis - SC", "Vitória - ES", "Natal - RN",
  "Manaus - AM", "Ribeirão Preto - SP", "Niterói - RJ", "Caxias do Sul - RS"
];

const PLANS = [
  { text: "o Plano Completo 🔥", highlight: true },
  { text: "o Plano Completo 🔥", highlight: true },
  { text: "o Plano Completo 🔥", highlight: true },
  { text: "o Plano Básico 👍", highlight: false }
];

const TIMES = [
  "há 12 segundos", "há 45 segundos", "há 1 minuto", "há 2 minutos", "há 3 minutos", 
  "acabou de comprar", "há pouco"
];

export function PurchaseNotification() {
  const [notification, setNotification] = useState<NotificationData | null>(null);

  useEffect(() => {
    const showNotification = () => {
      const randomFirstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
      const randomLastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
      const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
      const randomPlan = PLANS[Math.floor(Math.random() * PLANS.length)].text;
      const randomTime = TIMES[Math.floor(Math.random() * TIMES.length)];

      setNotification({
        name: `${randomFirstName} ${randomLastName.charAt(0)}.`,
        city: randomCity,
        plan: randomPlan,
        time: randomTime
      });

      // Hide after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    };

    // Initial delay before first toast
    const initialDelay = setTimeout(() => {
      showNotification();
    }, 4000);

    // Dynamic recursive interval for social proof
    const triggerNext = () => {
      // Choose random interval between 12 and 18 seconds
      const nextTime = 12000 + Math.random() * 6000;
      return setTimeout(() => {
        showNotification();
        intervalId = triggerNext();
      }, nextTime);
    };

    let intervalId = triggerNext();

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(intervalId);
    };
  }, []);

  return (
    <div className="fixed bottom-28 sm:bottom-32 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 z-[9999] pointer-events-none w-[calc(100vw-32px)] xs:max-w-[290px] sm:w-auto sm:max-w-[290px]">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white/95 backdrop-blur-sm shadow-lg border border-stone-100 rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 pointer-events-auto"
          >
            {/* Pulsing Avatar Placeholder */}
            <div className="relative shrink-0 w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-600 font-black text-xs">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse fill-emerald-600/20" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-white animate-ping" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-white" />
            </div>

            {/* Content Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-[11px] text-black leading-tight">
                <strong className="font-extrabold text-black">{notification.name}</strong> ({notification.city}) comprou {notification.plan}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[8px] font-bold text-slate-400 font-mono tracking-wider uppercase">
                  {notification.time}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
