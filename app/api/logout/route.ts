// app/api/logout/route.ts (Next.js App Router)

export async function POST() {
  return new Response(JSON.stringify({ success: true }), {
    headers: {
      'Set-Cookie': `token=; Path=/; Expires=${new Date(0).toUTCString()}`
    }
  });
}
