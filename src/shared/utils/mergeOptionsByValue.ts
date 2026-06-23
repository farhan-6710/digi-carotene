export type LabelledOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

export function mergeOptionsByValue(
  ...groups: LabelledOption[][]
): LabelledOption[] {
  const map = new Map<string, LabelledOption>();

  for (const group of groups) {
    for (const option of group) {
      if (option.value) {
        map.set(option.value, option);
      }
    }
  }

  return [...map.values()];
}
