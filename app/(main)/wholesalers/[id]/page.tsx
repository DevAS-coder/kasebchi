"use client"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Award, 
  ShoppingBag, 
  TrendingUp,
  Star, 
  Users,
  Calendar,
  CheckCircle
} from "lucide-react";
import { useWholesalers } from "@/hooks/useWholesalers";
import { Skeleton } from "@/components/ui/skeleton";

const WholesalerDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
  const id = '1'
  const { wholesaler, isLoading } = useWholesalers(id);

//   useEffect(() => {
//     if (error) {
//       console.error(error);
//       navigate('/not-found');
//     }
//   }, [error, navigate]);

  if (isLoading) {
    return (
      <div className="bg-gray-50 dark:bg-coffee-dark-bg min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-64 w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!wholesaler) {
    return <div className="text-center py-10">عمده‌فروش یافت نشد</div>;
  }

  const { 
    name, 
    image, 
    logo, 
    country, 
    location, 
    coffeeTypes, 
    description, 
    establishedYear,
    joinDate,
    isAuthorized, 
    contactInfo, 
    socialMedia, 
    certifications, 
    stats 
  } = wholesaler;

  return (
    <div className="bg-gray-50 dark:bg-coffee-dark-bg min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          asChild
          className="mb-4 pl-0 hover:bg-transparent dark:text-gray-400"
        >
          {/* <Link to="/wholesalers" className="flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" />
            بازگشت به لیست عمده‌فروشان
          </Link> */}
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="md:order-1">
            <div className="relative rounded-lg overflow-hidden shadow-md">
              <img
                src={image}
                alt={name}
                className="w-full h-64 object-cover object-center"
              />
              <div className="absolute top-4 left-4">
                {isAuthorized && (
                  <Badge className="bg-green-500 text-white flex items-center gap-1 shadow-lg animate-fade-in">
                    <CheckCircle className="h-3 w-3" />
                    احراز هویت شده
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div>
            <h1 className="text-3xl font-bold text-primary dark:text-white mb-4">{name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={logo}
                alt={`${name} Logo`}
                className="w-12 h-12 rounded-full shadow-md"
              />
              <div className="text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {location}, {country}
                </div>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-400 mb-6">{description}</p>

            {/* Badges for Coffee Types */}
            <div className="flex flex-wrap gap-2 mb-6">
              {coffeeTypes.map((type, index) => (
                <Badge key={index} variant="secondary">{type}</Badge>
              ))}
            </div>

            {/* Contact Information */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-primary dark:text-white mb-3">اطلاعات تماس</h2>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                <MapPin className="w-4 h-4" />
                {contactInfo.address}
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                <Phone className="w-4 h-4" />
                {contactInfo.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-primary">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                <Globe className="w-4 h-4" />
                <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  {contactInfo.website}
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h2 className="text-xl font-semibold text-primary dark:text-white mb-3">شبکه‌های اجتماعی</h2>
              <div className="flex gap-4">
                <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  اینستاگرام
                </a>
                <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  توییتر
                </a>
                <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  فیسبوک
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">بررسی اجمالی</TabsTrigger>
              <TabsTrigger value="details">جزئیات</TabsTrigger>
              <TabsTrigger value="certifications">گواهینامه‌ها</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">
                {description}
              </p>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                    <Calendar className="w-4 h-4" />
                    تاریخ عضویت: {joinDate || 'نامشخص'}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                    <Award className="w-4 h-4" />
                    سال تأسیس: {establishedYear}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                    <ShoppingBag className="w-4 h-4" />
                    تعداد محصولات: {stats.products}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                    <TrendingUp className="w-4 h-4" />
                    صادرات سالانه: {stats.yearlyExport}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                    <Star className="w-4 h-4" />
                    امتیاز: {stats.rating}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                    <Users className="w-4 h-4" />
                    مشتریان: {stats.clients}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="certifications" className="mt-4">
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default WholesalerDetail;

