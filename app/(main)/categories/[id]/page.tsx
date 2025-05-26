import CategoryClient from "@/components/shared/CategoryClient";

export default function Page({ params }: { params: { id: string } }) {
  return <CategoryClient id={params.id} />;
}
