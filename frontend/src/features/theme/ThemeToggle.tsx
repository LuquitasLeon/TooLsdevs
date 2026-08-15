import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { useContent } from "@/features/i18n/useI18n";
import { useTheme } from "./useTheme";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { ui } = useContent();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? ui.switchToLight : ui.switchToDark}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-line/15 bg-surface text-fg transition-colors hover:border-brand-teal/25 hover:text-brand-teal-text",
        className,
      )}
    >
      {isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  );
}
