import { Label } from "@/components/ui/label";

export function InputField({
  label,
  value,
  onChange,
  type = "number",
  min = 0,
  max,
  step = 1,
  unit = "",
  className = "",
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium">
        {label}{" "}
        {unit && <span className="text-muted-foreground">({unit})</span>}
      </Label>
      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(type === "number" ? Number(e.target.value) : e.target.value)
        }
        min={min}
        max={max}
        step={step}
        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
}
