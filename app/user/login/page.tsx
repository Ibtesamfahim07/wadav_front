// app/user/login/page.tsx
'use client';

import { useState } from 'react';
import { useUser } from '@/components/user/usercontext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function UserLogin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(name, password)) {
      toast({ title: 'Welcome!' });
      router.push('/user/dashboard');
    } else {
      toast({ title: 'Invalid login', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>User Login</CardTitle>
          <CardDescription>
            Use: <code className="bg-muted px-1">john</code> / <code className="bg-muted px-1">123</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Username" value={name} onChange={e => setName(e.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <Button type="submit" className="w-full">Login as User</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}