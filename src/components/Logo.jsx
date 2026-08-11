const LOGO_SRC = "/logopng.png";

export default function Logo({ className = "h-9 w-9", withWordmark = true, wordmarkClassName = "" }) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={LOGO_SRC}
        alt={withWordmark ? "" : "ToolsDevs"}
        className={`shrink-0 object-contain ${className}`}
      />
      {withWordmark && (
        <span className={`font-display font-bold tracking-tight text-white ${wordmarkClassName}`}>
          TOOLS<span className="text-gradient">DEVS</span>
        </span>
      )}
    </div>
  );
}
