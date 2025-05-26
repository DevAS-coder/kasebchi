import CategoryClient from "@/components/shared/CategoryClient";

export default async function Page({ params }: { params: { id: string } }) {
  // انجام عملیات ناهمگام در اینجا
  return <CategoryClient id={params.id} />;
}
