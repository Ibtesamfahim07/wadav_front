// app/admin/blog-posts/page.tsx (COMPLETE UPDATED FILE)
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { parseMarkdownContent, contentToMarkdown, parseStoredContent } from '@/lib/markdownParser';

export default function BlogPostsPage() {
  const {
    blogPosts,
    blogAuthors,
    blogCategories,
    blogTags,
    fetchBlogPosts,
    fetchBlogAuthors,
    fetchBlogCategories,
    fetchBlogTags,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const API_BASE = 'http://https://wadavback1-6iy0oc8nt-totutoti727-5984s-projects.vercel.app//api';

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    authorId: '',
    categoryId: '',
    status: 'draft' as 'draft' | 'published' | 'scheduled',
    isFeatured: false,
    metaTitle: '',
    metaDescription: '',
    publishDate: '',
    selectedCategories: [] as number[],
    selectedTags: [] as number[],
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch data on mount
  useEffect(() => {
    fetchBlogPosts();
    fetchBlogAuthors();
    fetchBlogCategories();
    fetchBlogTags();
  }, []);

  const filteredPosts = Array.isArray(blogPosts)
  ? blogPosts.filter(p =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author?.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];
  const handleEdit = (post: any) => {
    setEditingPost(post);
    
    // Convert stored content back to markdown for editing
    let markdownContent = post.content;
    try {
      if (typeof post.content === 'string' && post.content.startsWith('[{')) {
        const blocks = parseStoredContent(post.content);
        markdownContent = contentToMarkdown(blocks);
      }
    } catch (e) {
      console.error('Error converting content:', e);
      markdownContent = post.content;
    }

    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: markdownContent,
      authorId: post.authorId.toString(),
      categoryId: post.categoryId?.toString() || '',
      status: post.status,
      isFeatured: post.isFeatured,
      metaTitle: post.metaTitle || '',
      metaDescription: post.metaDescription || '',
      publishDate: post.publishDate || '',
      selectedCategories: post.categories?.map((c: any) => c.categoryId) || [],
      selectedTags: post.tags?.map((t: any) => t.tagId) || [],
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlogPost(id);
        toast({ title: 'Blog post deleted successfully' });
      } catch (error: any) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- VALIDATE REQUIRED FIELDS ---
    if (!formData.title.trim()) {
      toast({ title: 'Error', description: 'Title is required', variant: 'destructive' });
      return;
    }
    if (!formData.slug.trim()) {
      toast({ title: 'Error', description: 'Slug is required', variant: 'destructive' });
      return;
    }
    if (!formData.content.trim()) {
      toast({ title: 'Error', description: 'Content is required', variant: 'destructive' });
      return;
    }
    if (!formData.authorId) {
      toast({ title: 'Error', description: 'Please select an author', variant: 'destructive' });
      return;
    }

    setLoading(true);

    try {
      // Parse markdown to structured blocks
      const { blocks } = parseMarkdownContent(formData.content);
      const contentJSON = JSON.stringify(blocks);

      const formDataToSend = new FormData();

      // --- REQUIRED ---
      formDataToSend.append('title', formData.title.trim());
      formDataToSend.append('slug', formData.slug.trim());
      formDataToSend.append('content', contentJSON);
      formDataToSend.append('authorId', formData.authorId);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('isFeatured', String(formData.isFeatured));

      // --- OPTIONAL ---
      if (formData.excerpt?.trim()) formDataToSend.append('excerpt', formData.excerpt.trim());
      if (formData.categoryId) formDataToSend.append('categoryId', formData.categoryId);
      if (formData.metaTitle?.trim()) formDataToSend.append('metaTitle', formData.metaTitle.trim());
      if (formData.metaDescription?.trim()) formDataToSend.append('metaDescription', formData.metaDescription.trim());

      // --- PUBLISH DATE: Only for 'scheduled', auto-now for 'published' ---
      if (formData.status === 'published') {
        const now = new Date().toISOString().slice(0, 16);
        formDataToSend.append('publishDate', now);
      } else if (formData.status === 'scheduled' && formData.publishDate) {
        formDataToSend.append('publishDate', formData.publishDate);
      }

      // --- CATEGORIES & TAGS ---
      if (formData.selectedCategories.length > 0) {
        formDataToSend.append('categories', JSON.stringify(formData.selectedCategories));
      }
      if (formData.selectedTags.length > 0) {
        formDataToSend.append('tags', JSON.stringify(formData.selectedTags));
      }

      // --- IMAGE ---
      if (imageFile) {
        formDataToSend.append('featured_image', imageFile);
      }

      // --- SEND ---
      const url = editingPost
        ? `${API_BASE}/admin/blog/posts-simple/${editingPost.postId}`
        : `${API_BASE}/admin/blog/posts-simple`;

      const res = await fetch(url, {
        method: editingPost ? 'PUT' : 'POST',
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to save post');
      }

      toast({ title: editingPost ? 'Post updated!' : 'Post created!' });
      setIsDialogOpen(false);
      setEditingPost(null);
      resetForm();
      await fetchBlogPosts();
    } catch (error: any) {
      console.error('Submit error:', error);
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      authorId: '',
      categoryId: '',
      status: 'draft',
      isFeatured: false,
      metaTitle: '',
      metaDescription: '',
      publishDate: '',
      selectedCategories: [],
      selectedTags: [],
    });
    setImageFile(null);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (title: string) => {
    const slug = generateSlug(title);
    setFormData({ ...formData, title, slug });
  };

  const toggleCategory = (categoryId: number) => {
    setFormData(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter(id => id !== categoryId)
        : [...prev.selectedCategories, categoryId]
    }));
  };

  const toggleTag = (tagId: number) => {
    setFormData(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tagId)
        ? prev.selectedTags.filter(id => id !== tagId)
        : [...prev.selectedTags, tagId]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Manage Blog Posts</h2>
          <p className="text-muted-foreground">Add, edit, or delete blog posts</p>
        </div>
        <Button onClick={() => {
          setEditingPost(null);
          resetForm();
          setIsDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Blog Post
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search blog posts..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <TableRow key={post.postId}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author?.fullName || 'Unknown'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      post.status === 'published' ? 'bg-green-100 text-green-800' :
                      post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {post.status}
                    </span>
                  </TableCell>
                  <TableCell>{post.isFeatured ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{post.views}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(post)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(post.postId)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No blog posts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}</DialogTitle>
            <DialogDescription>
              {editingPost ? 'Update blog post details' : 'Create a new blog post'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="authorId">Author *</Label>
                  <Select value={formData.authorId} onValueChange={(val) => setFormData({ ...formData, authorId: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      {blogAuthors.map(author => (
                        <SelectItem key={author.authorId} value={author.authorId.toString()}>
                          {author.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="categoryId">Primary Category</Label>
                  <Select value={formData.categoryId} onValueChange={(val) => setFormData({ ...formData, categoryId: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {blogCategories.map(cat => (
                        <SelectItem key={cat.categoryId} value={cat.categoryId.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Additional Categories</Label>
                <div className="border rounded p-3 max-h-32 overflow-y-auto">
                  {blogCategories.map(cat => (
                    <div key={cat.categoryId} className="flex items-center space-x-2 py-1">
                      <Checkbox
                        checked={formData.selectedCategories.includes(cat.categoryId)}
                        onCheckedChange={() => toggleCategory(cat.categoryId)}
                      />
                      <Label className="cursor-pointer">{cat.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Tags</Label>
                <div className="border rounded p-3 max-h-32 overflow-y-auto">
                  {blogTags.map(tag => (
                    <div key={tag.tagId} className="flex items-center space-x-2 py-1">
                      <Checkbox
                        checked={formData.selectedTags.includes(tag.tagId)}
                        onCheckedChange={() => toggleTag(tag.tagId)}
                      />
                      <Label className="cursor-pointer">{tag.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="featuredImage">Featured Image</Label>
                <Input
                  id="featuredImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content">
                  Content * (Markdown Format)
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={15}
                  placeholder={`# Main Heading

## Sub-heading

This is a paragraph with **bold text** and *italic text*.

### Section Heading

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

> This is a blockquote

[Link text](https://example.com)

![Image alt text](https://example.com/image.jpg)`}
                  required
                  className="font-mono text-sm"
                />
                <div className="text-xs text-muted-foreground space-y-1 mt-2">
                  <p><strong>Markdown Guide:</strong></p>
                  <p>✓ # Heading | ## Sub-heading | ### Section</p>
                  <p>✓ **bold** | *italic* | ***bold-italic***</p>
                  <p>✓ [link text](url) | ![alt](image-url)</p>
                  <p>✓ - bullet point | 1. numbered item</p>
                  <p>✓ &gt; blockquote</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={formData.status} onValueChange={(val: any) => setFormData({ ...formData, status: val })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="publishDate">Publish Date</Label>
                  <Input
                    id="publishDate"
                    type="datetime-local"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-2 pt-8">
                  <Checkbox
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked as boolean })}
                  />
                  <Label>Featured Post</Label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Input
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : editingPost ? 'Update' : 'Add'} Post
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}