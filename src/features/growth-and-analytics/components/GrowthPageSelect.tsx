import { formFieldClassName } from "@/shared/constants/formStyles";

type Option = { value: string; label: string };

type GrowthPageSelectProps = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export function GrowthPageSelect({
  label,
  value,
  options,
  onChange,
}: GrowthPageSelectProps) {
  return (
    <label className="block min-w-[220px] text-xs font-semibold text-muted-foreground">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={formFieldClassName}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
