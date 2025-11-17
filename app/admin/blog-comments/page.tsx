// app/admin/blog-comments/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trash2, CheckCircle, XCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

export default function BlogCommentsPage() {
  const {
    blogComments,
    fetchBlogComments,
    updateBlogComment,
    deleteBlogComment,
  } = useAdmin();

  const [search, setSearch] = useState('');
  const { toast } = useToast();

  useEffect(() => { fetchBlogComments(); }, []);

  const filtered = blogComments.filter(c =>
    c.commenterName.toLowerCase().includes(search.toLowerCase()) ||
    c.comment.toLowerCase().includes(search.toLowerCase())
  );

  const setStatus = async (id: number, status: 'approved' | 'rejected') => {
    try {
      await updateBlogComment(id, { status });
      toast({ title: `Comment ${status}` });
    } catch (e: any) { toast({ title: 'Error', description: e.message, variant: 'destructive' }); }
  };

  const del = async (id: number) => {
    if (!confirm('Delete comment?')) return;
    try {
      await deleteBlogComment(id);
      toast({ title: 'Deleted' });
    } catch (e: any) { toast({ title: 'Error', description: e.message, variant: 'destructive' }); }
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Blog Comments</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search…" className="pl-10" value={search} onChange={e=>setSearch(e.target.value)} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Post</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map(c => (
            <TableRow key={c.commentId}>
              <TableCell>{c.commenterName}</TableCell>
              <TableCell className="max-w-xs truncate">{c.comment}</TableCell>
              <TableCell>{c.post?.title ?? '—'}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs ${
                  c.status === 'approved' ? 'bg-green-100 text-green-800' :
                  c.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {c.status}
                </span>
              </TableCell>
              <TableCell className="text-right space-x-1">
                {c.status === 'pending' && (
                  <>
                    <Button size="sm" variant="ghost" onClick={()=>setStatus(c.commentId,'approved')}>
                      <CheckCircle className="h-4 w-4 text-green-600"/>
                    </Button>
                    <Button size="sm" variant="ghost" onClick={()=>setStatus(c.commentId,'rejected')}>
                      <XCircle className="h-4 w-4 text-red-600"/>
                    </Button>
                  </>
                )}
                <Button size="sm" variant="ghost" onClick={()=>del(c.commentId)}>
                  <Trash2 className="h-4 w-4 text-destructive"/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}