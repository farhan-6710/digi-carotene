import { ComboBox } from "@/shared/ui/ComboBox";

type GrowthAccountComboBoxProps = {
  id?: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
};

export function GrowthAccountComboBox({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = "Select account",
}: GrowthAccountComboBoxProps) {
  return (
    <label className="block w-full max-w-sm text-xs font-semibold text-muted-foreground">
      {label}
      <div className="mt-2">
        <ComboBox
          id={id}
          value={value}
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          listTitle={label}
          emptyMessage="No accounts available."
          noMatchMessage="No matching accounts found."
          mode="value"
        />
      </div>
    </label>
  );
}
