import translations from "@/lib/translations";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PartOfProfile({ title, value }: { title: string, value: any }) {
  let displayValue: string | undefined;
  let src: string | undefined;
  let isBoolean = typeof value === "boolean";

  console.log(value);

  if (isBoolean) {
    displayValue = value ? "انجام شده" : "انجام نشده";
  } else if (Array.isArray(value)) {
    displayValue = value
      .map((item) => translations[item as keyof typeof translations] || item)
      .join("، ");
  } else if (value.includes('jpg') || value.includes('png') || value.includes('jpeg')) {
    displayValue = 'image'
  } else {
    displayValue = value;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100/50 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-gray-700 tracking-wide">{title}</div>
        {isBoolean && (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1 
              ${value 
                ? 'bg-green-50 text-green-600 border border-green-200' 
                : 'bg-red-50 text-red-600 border border-red-200'
              }`}
          >
            {value 
              ? <Check className="w-3.5 h-3.5" /> 
              : <X className="w-3.5 h-3.5" />
            }
            <span>{displayValue}</span>
          </motion.div>
        )}
      </div>
      {!isBoolean && (
        <div className="text-base text-gray-800 break-words leading-relaxed">
          {displayValue === 'image' ? (
            <div className="relative overflow-hidden rounded-lg">
              <Image 
                src={value} 
                alt="logo" 
                width={100} 
                height={100}
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ) : (
            <span className="font-medium">{displayValue}</span>
          )}
        </div>
      )}
    </motion.div>
  );
}
