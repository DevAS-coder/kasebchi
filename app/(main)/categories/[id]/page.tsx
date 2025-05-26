// app/categories/[id]/page.tsx

type Props = {
  params: {
    id: string;
  };
};

export default function CategoryPage({ params }: Props) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Category ID: {params.id}</h1>
    </div>
  );
}
