import type { Locale } from "@toolsdevs/shared";
import { cn } from "@/lib/cn";
import { useI18n } from "./useI18n";

const OPTIONS: { value: Locale; label: string; name: string }[] = [
  { value: "es", label: "ES", name: "Español" },
  { value: "en", label: "EN", name: "English" },
];

export default function LocaleToggle({ className }: { className?: string }) {
  const { locale, setLocale, content } = useI18n();
  const activeIndex = OPTIONS.findIndex((o) => o.value === locale);

  return (
    <div
      role="group"
      aria-label={content.ui.languageLabel}
      className={cn(
        "relative inline-flex items-center rounded-full p-1",
        "bg-surface border-2 border-brand-teal/35",
        className,
      )}
    >
      {/* Píldora deslizante — CSS puro, más confiable que FM en este contexto */}
      <div
        aria-hidden
        className="absolute top-1 bottom-1 w-[42px] rounded-full bg-brand-teal"
        style={{
          left: 4,
          transform: `translateX(${activeIndex * 42}px)`,
          transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />

      {OPTIONS.map((option) => {
        const active = option.value === locale;
        return (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-pressed={active}
            aria-label={option.name}
            onClick={() => setLocale(option.value)}
            className={cn(
              "relative z-10 w-[42px] rounded-full py-1.5 text-xs font-bold tracking-wide transition-colors duration-200",
              active ? "text-navy-950" : "text-fg hover:text-brand-teal-text",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
