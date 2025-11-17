// app/admin/blog-authors/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

export default function BlogAuthorsPage() {
  const {
    blogAuthors,
    fetchBlogAuthors,
    createBlogAuthor,
    updateBlogAuthor,
    deleteBlogAuthor,
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    bio: '',
    socialTwitter: '',
    socialLinkedin: '',
    socialFacebook: '',
    socialInstagram: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchBlogAuthors();
  }, []);

  const filteredAuthors = blogAuthors.filter(a =>
    a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (author: any) => {
    setEditingAuthor(author);
    setFormData({
      fullName: author.fullName,
      email: author.email || '',
      bio: author.bio || '',
      socialTwitter: author.socialTwitter || '',
      socialLinkedin: author.socialLinkedin || '',
      socialFacebook: author.socialFacebook || '',
      socialInstagram: author.socialInstagram || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this author?')) {
      try {
        await deleteBlogAuthor(id);
        toast({ title: 'Author deleted successfully' });
      } catch (error: any) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      if (formData.email) formDataToSend.append('email', formData.email);
      if (formData.bio) formDataToSend.append('bio', formData.bio);
      if (formData.socialTwitter) formDataToSend.append('socialTwitter', formData.socialTwitter);
      if (formData.socialLinkedin) formDataToSend.append('socialLinkedin', formData.socialLinkedin);
      if (formData.socialFacebook) formDataToSend.append('socialFacebook', formData.socialFacebook);
      if (formData.socialInstagram) formDataToSend.append('socialInstagram', formData.socialInstagram);
      
      if (imageFile) {
        formDataToSend.append('profile_pic', imageFile);
      }

      if (editingAuthor) {
        await updateBlogAuthor(editingAuthor.authorId, formDataToSend);
        toast({ title: 'Author updated successfully' });
      } else {
        await createBlogAuthor(formDataToSend);
        toast({ title: 'Author added successfully' });
      }

      setIsDialogOpen(false);
      setEditingAuthor(null);
      resetForm();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      bio: '',
      socialTwitter: '',
      socialLinkedin: '',
      socialFacebook: '',
      socialInstagram: '',
    });
    setImageFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Manage Blog Authors</h2>
          <p className="text-muted-foreground">Add, edit, or delete blog authors</p>
        </div>
        <Button onClick={() => {
          setEditingAuthor(null);
          resetForm();
          setIsDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Author
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search authors..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Posts</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAuthors.length > 0 ? (
              filteredAuthors.map((author) => (
                <TableRow key={author.authorId}>
                  <TableCell className="font-medium">{author.fullName}</TableCell>
                  <TableCell>{author.email || 'N/A'}</TableCell>
                  <TableCell>{author._count?.posts || 0}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(author)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(author.authorId)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No authors found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingAuthor ? 'Edit Author' : 'Add New Author'}</DialogTitle>
            <DialogDescription>
              {editingAuthor ? 'Update author details' : 'Create a new blog author'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="profilePic">Profile Picture</Label>
                <Input
                  id="profilePic"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="twitter">Twitter Handle</Label>
                  <Input
                    id="twitter"
                    placeholder="@username"
                    value={formData.socialTwitter}
                    onChange={(e) => setFormData({ ...formData, socialTwitter: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    placeholder="username"
                    value={formData.socialLinkedin}
                    onChange={(e) => setFormData({ ...formData, socialLinkedin: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    placeholder="username"
                    value={formData.socialFacebook}
                    onChange={(e) => setFormData({ ...formData, socialFacebook: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="@username"
                    value={formData.socialInstagram}
                    onChange={(e) => setFormData({ ...formData, socialInstagram: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : editingAuthor ? 'Update' : 'Add'} Author
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}