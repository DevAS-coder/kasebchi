import translations from "@/lib/translations";

export default function PartEven({ title, value }: { title: string, value: any }) {
  let displayValue: string | undefined;

  if (typeof value === "boolean") {
    displayValue = value ? "انجام شده" : "انجام نشده";
  } else if (Array.isArray(value)) {
    displayValue = value
      .map((item) => translations[item as keyof typeof translations] || item)
      .join("، ");
  } else {
    displayValue = value;
  }

    return (
        <div className="flex flex-col border-b-2 p-5 border-gray-300 gap-2">
            <span>{title}:</span>
            <span>{displayValue}</span>
        </div>
    )
}
