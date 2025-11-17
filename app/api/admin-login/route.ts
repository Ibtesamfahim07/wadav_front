// // app/api/admin-login/route.ts
// import { NextResponse } from 'next/server';

// /**
//  * POST /api/admin-login
//  *
//  * In a static export there is **no server**, so we simply forward the request
//  * to the real backend[](http://localhost:5000) that is running separately.
//  */
// export async function POST(request: Request) {
//   const body = await request.json();

//   // ---- Change this URL when you deploy ----
//   const backendUrl ='http://localhost:5000';

//   const res = await fetch(`${backendUrl}/admin-login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body),
//   });

//   const data = await res.json();
//   return NextResponse.json(data, { status: res.status });
// }

// /* --------------------------------------------------------------
//    IMPORTANT: Tell Next.js this route must **never** be statically
//    rendered – it is a pure client-side proxy.
//    -------------------------------------------------------------- */
// export const dynamic = 'force-dynamic';
// export const runtime = 'edge';   // works with static export