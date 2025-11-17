// // IMPORTANT: This file MUST be located at: app/api/user-login/route.ts
// // NOT app/api/user-login/route.tsx
// // NOT app/api/userlogin/route.ts
// // EXACTLY: app/api/user-login/route.ts

// import { NextRequest, NextResponse } from 'next/server';

// export const dynamic = 'force-dynamic';
// export const runtime = 'nodejs';

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// export async function POST(request: NextRequest) {
//   console.log('===== USER LOGIN ROUTE CALLED =====');
//   console.log('Backend URL:', BACKEND_URL);
  
//   try {
//     const body = await request.json();
//     console.log('Received login request for user:', body.name);
    
//     // Forward to Express backend
//     console.log('Forwarding to backend:', `${BACKEND_URL}/api/user/login`);
    
//     const backendResponse = await fetch(`${BACKEND_URL}/api/user/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     });

//     console.log('Backend response status:', backendResponse.status);
    
//     const data = await backendResponse.json();
//     console.log('Backend response data:', data);

//     if (!backendResponse.ok) {
//       console.log('Backend returned error:', data);
//       return NextResponse.json(
//         { error: data.message || data.error || 'Login failed' },
//         { status: backendResponse.status }
//       );
//     }

//     console.log('Login successful, returning data');
//     return NextResponse.json(data, { status: 200 });
    
//   } catch (error: any) {
//     console.error('===== ERROR IN USER LOGIN ROUTE =====');
//     console.error('Error details:', error);
//     console.error('Error message:', error.message);
//     console.error('Error stack:', error.stack);
    
//     return NextResponse.json(
//       { 
//         error: 'Cannot connect to backend server',
//         details: error.message,
//         backendUrl: BACKEND_URL
//       },
//       { status: 500 }
//     );
//   }
// }

// // Add a GET method to test if the route exists
// export async function GET(request: NextRequest) {
//   return NextResponse.json({ 
//     message: 'User login route is working!',
//     backendUrl: BACKEND_URL,
//     timestamp: new Date().toISOString()
//   });
// }