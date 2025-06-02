import translations from "@/lib/translations";
import { Check, X } from "lucide-react";

export default function PartOfProfile({ title, value }: { title: string, value: any }) {
  let displayValue: string | undefined;
  let isBoolean = typeof value === "boolean";

  if (isBoolean) {
    displayValue = value ? "انجام شده" : "انجام نشده";
  } else if (Array.isArray(value)) {
    displayValue = value
      .map((item) => translations[item as keyof typeof translations] || item)
      .join("، ");
  } else {
    displayValue = value;
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-gray-600">{title}</div>
        {isBoolean && (
          <div className={`flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5 ${value ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {value ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
            {displayValue}
          </div>
        )}
      </div>
      {!isBoolean && (
        <div className="text-base text-gray-900 break-words">
          {displayValue || <span className="text-gray-400">-</span>}
        </div>
      )}
    </div>
  );
}
