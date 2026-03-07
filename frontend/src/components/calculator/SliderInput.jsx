import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export function SliderInput({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = "",
  className = "",
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      <Label className="text-sm font-medium flex justify-between">
        <span>{label}</span>
        <span className="text-primary font-semibold">
          {value} {unit}
        </span>
      </Label>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          {min} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
      </div>
    </div>
  );
}
