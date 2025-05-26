import { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "تماس با ما | کاسب‌چی",
  description: "با ما در تماس باشید. از طریق فرم تماس، تلفن، ایمیل یا شبکه‌های اجتماعی می‌توانید با کارشناسان ما ارتباط برقرار کنید.",
  openGraph: {
    title: "تماس با ما | کاسب‌چی",
    description: "با ما در تماس باشید. از طریق فرم تماس، تلفن، ایمیل یا شبکه‌های اجتماعی می‌توانید با کارشناسان ما ارتباط برقرار کنید.",
    type: "website",
  },
};

export const dynamic = 'force-static';

export default function ContactPage() {
  return <ContactContent />;
}