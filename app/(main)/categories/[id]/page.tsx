import CategoryClient from "@/components/shared/CategoryClient";

export default async function Page({ params }: { params: { id: Promise<string> } }) {
  const id = await params.id;
  return <CategoryClient id={id} />;
}
