
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle } from "lucide-react";
import Link from "next/link";

interface WholesalerCardProps {
  id: string;
  name: string;
  image: string;
  logo: string;
  country: string;
  location: string;
  coffeeTypes: string[];
  isAuthorized?: boolean;
  joinDate?: string;
}

const WholesalerCard = ({ 
  id, 
  name, 
  image, 
  logo, 
  country, 
  location, 
  coffeeTypes, 
  isAuthorized = false, 
  joinDate 
}: WholesalerCardProps) => {
  return (
    <Link href={`/wholesalers/${id}`} className="block transition-all duration-300">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="h-32 overflow-hidden relative">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {isAuthorized && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-green-500 text-white flex items-center gap-1 shadow-lg animate-fade-in">
                <CheckCircle className="h-3 w-3" />
                احراز هویت شده
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-4 pt-12 relative">
          <div className="absolute -top-8 right-4 h-16 w-16 rounded-full bg-white p-1 shadow-md transition-transform duration-300 hover:scale-110 group-hover:shadow-lg">
            <img src={logo} alt={`${name} logo`} className="h-full w-full object-contain rounded-full" />
          </div>
          
          <div className="absolute bottom-28 left-0 p-3 flex items-center gap-2 z-90">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-white" />
              <span className="text-white text-sm">{country}، {location}</span>
            </div>
          </div>

          <h3 className="font-bold text-lg mb-2 text-primary dark:text-white">{name}</h3>
          
          {joinDate && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              تاریخ عضویت: {joinDate}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 mt-3">
            {coffeeTypes.map((type, index) => (
              <span 
                key={index} 
                className="bg-accent/20 text-primary dark:bg-slate-300 dark:text-slate-900 text-xs py-1 px-2 rounded-full transition-colors duration-200 hover:bg-accent/40"
              >
                {type}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default WholesalerCard;
