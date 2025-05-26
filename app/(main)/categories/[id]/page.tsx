import CategoryClient from "@/components/shared/CategoryClient";


type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  return <CategoryClient id={params.id} />;
}
