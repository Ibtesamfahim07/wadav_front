// app/user/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/components/user/usercontext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://https://wadavback1-6iy0oc8nt-totutoti727-5984s-projects.vercel.app/';

export default function UserLogin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, isLoading: isCheckingAuth, login } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!isCheckingAuth && user) {
      router.replace('/user/dashboard');
    }
  }, [user, isCheckingAuth, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      });

      const resData = await response.json();

      if (response.ok) {
        const backendData = resData.data; // { token, userId }

        const userData = {
          id: backendData.userId,
          name: name,
        };

        localStorage.setItem('user_session', JSON.stringify(userData));
        if (backendData.token) {
          console.log('Saving backend token:', backendData.token);
          localStorage.setItem('userToken', backendData.token);
        }

        window.dispatchEvent(new Event('user_session_updated'));
        toast({ title: 'Welcome!', description: 'Logged in.' });

        setTimeout(() => {
          setIsLoading(false);
          router.replace('/user/dashboard');
        }, 100);
      } else {
        // Backend returned an error
        let errorMessage = 'Invalid username or password';

        if (response.status === 401) {
          errorMessage = 'Invalid username or password. Please try again.';
        } else if (response.status === 404) {
          errorMessage = 'User not found. Please check your username.';
        } else if (response.status === 400) {
          errorMessage = resData.error || resData.message || 'Please enter valid credentials.';
        } else {
          errorMessage = resData.error || resData.message || 'Login failed. Please try again.';
        }

        setError(errorMessage);
        toast({
          title: 'Login Failed',
          description: errorMessage,
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Backend login error:', error);

      // Backend not available - try local auth as fallback
      try {
        const success = await login(name, password); // ← FIXED: Added await

        if (success) {
          toast({
            title: 'Welcome!',
            description: 'Logged in with local credentials.',
          });

          setTimeout(() => {
            setIsLoading(false);
            router.replace('/user/dashboard');
          }, 100);
        } else {
          const errorMessage = 'Cannot connect to server and invalid local credentials.';
          setError(errorMessage);
          toast({
            title: 'Login Failed',
            description: errorMessage,
            variant: 'destructive',
          });
          setIsLoading(false);
        }
      } catch (loginError) {
        console.error('Local login error:', loginError);
        const errorMessage = 'Login failed. Please try again.';
        setError(errorMessage);
        toast({
          title: 'Login Failed',
          description: errorMessage,
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    }
  };

  // Show loading while checking auth status
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't show login form if already logged in
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>User Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                required
                disabled={isLoading}
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login as User'
              )}
            </Button>

            <div className="text-sm text-muted-foreground text-center mt-4">
              <p>Demo credentials (fallback):</p>
              <p className="font-mono text-xs mt-1">john / 123 | jane / 123 | mike / 123</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}