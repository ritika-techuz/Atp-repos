import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Search, MoreHorizontal, Edit, Trash2, Plus, FileText, Calendar, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/shared/utils/helper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
interface PageData {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: 'Published' | 'Draft';
  type: 'About Us' | 'Company' | 'Terms & Conditions' | 'Privacy Policy';
  lastModified: string;
  author: string;
}
const mockPages: PageData[] = [{
  id: 1,
  title: 'About Us',
  slug: 'about-us',
  content: '<h1>About Our Company</h1><p>We are a leading technology company focused on innovation and excellence. Our mission is to provide cutting-edge solutions that empower businesses worldwide.</p><p>Founded in 2020, we have grown from a small startup to a global organization with offices in multiple countries.</p>',
  status: 'Published',
  type: 'About Us',
  lastModified: '2024-01-15',
  author: 'John Doe'
}, {
  id: 2,
  title: 'Company Information',
  slug: 'company-info',
  content: '<h1>Company Overview</h1><p>Our company values transparency, innovation, and customer satisfaction. We believe in building long-term relationships with our clients and partners.</p><ul><li>Innovation-driven approach</li><li>Customer-centric solutions</li><li>Global presence</li></ul>',
  status: 'Published',
  type: 'Company',
  lastModified: '2024-01-10',
  author: 'Jane Smith'
}, {
  id: 3,
  title: 'Terms and Conditions',
  slug: 'terms-conditions',
  content: '<h1>Terms and Conditions</h1><p>By using our services, you agree to comply with these terms and conditions. Please read them carefully before proceeding.</p><h2>Usage Guidelines</h2><p>Users must follow our community guidelines and respect intellectual property rights.</p>',
  status: 'Draft',
  type: 'Terms & Conditions',
  lastModified: '2024-01-12',
  author: 'Alice Johnson'
}];
const PagesManagement = () => {
  const [pages, setPages] = useState<PageData[]>(mockPages);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    status: 'Draft',
    type: 'About Us'
  });
  const statusFilterOptions = [{
    value: 'all',
    label: 'All Status'
  }, {
    value: 'Published',
    label: 'Published'
  }, {
    value: 'Draft',
    label: 'Draft'
  }];
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filterStatus !== 'all') count++;
    return count;
  }, [filterStatus]);
  const filteredPages = useMemo(() => {
    return pages.filter(page => {
      const searchRegex = new RegExp(searchTerm, 'i');
      const statusMatch = filterStatus === 'all' || page.status === filterStatus;
      return (searchRegex.test(page.title) || searchRegex.test(page.content)) && statusMatch;
    });
  }, [pages, searchTerm, filterStatus]);
  const handleAddPage = () => {
    const newPage: PageData = {
      id: Date.now(),
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      status: formData.status as 'Published' | 'Draft',
      type: formData.type as 'About Us' | 'Company' | 'Terms & Conditions' | 'Privacy Policy',
      lastModified: new Date().toISOString().split('T')[0],
      author: 'Current User'
    };
    setPages([...pages, newPage]);
    setIsAddDialogOpen(false);
    setFormData({
      title: '',
      slug: '',
      content: '',
      status: 'Draft',
      type: 'About Us'
    });
    toast({
      title: "Page added",
      description: "New page has been successfully created."
    });
  };
  const handleEditPage = () => {
    if (!selectedPage) return;
    const updatedPages = pages.map(page => page.id === selectedPage.id ? {
      ...page,
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      status: formData.status as 'Published' | 'Draft',
      type: formData.type as 'About Us' | 'Company' | 'Terms & Conditions' | 'Privacy Policy',
      lastModified: new Date().toISOString().split('T')[0]
    } : page);
    setPages(updatedPages);
    setIsEditDialogOpen(false);
    setSelectedPage(null);
    setFormData({
      title: '',
      slug: '',
      content: '',
      status: 'Draft',
      type: 'About Us'
    });
    toast({
      title: "Page updated",
      description: "Page has been successfully updated."
    });
  };
  const handleDeletePage = () => {
    if (!selectedPage) return;
    const updatedPages = pages.filter(page => page.id !== selectedPage.id);
    setPages(updatedPages);
    setIsDeleteDialogOpen(false);
    setSelectedPage(null);
    toast({
      title: "Page deleted",
      description: "Page has been successfully deleted."
    });
  };
  const openEditDialog = (page: PageData) => {
    setSelectedPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      status: page.status,
      type: page.type
    });
    setIsEditDialogOpen(true);
  };
  const openDeleteDialog = (page: PageData) => {
    setSelectedPage(page);
    setIsDeleteDialogOpen(true);
  };
  const openPreviewDialog = (page: PageData) => {
    setSelectedPage(page);
    setIsPreviewDialogOpen(true);
  };
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-gradient-to-r from-green-500/20 to-lime-500/20 text-green-400 border-green-500/30';
      case 'Draft':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-400 border-gray-500/30';
    }
  };
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };
  return <div className="space-y-6">
    {/* Header */}
    <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-3xl font-normal text-foreground">Pages Management</h2>
        <p className="text-gray-600 font-light">Manage your website pages and content</p>
      </div>
      <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
        <Plus className="w-4 h-4 mr-2" />
        Add Page
      </Button>
    </motion.div>

    {/* Filters */}
    <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 0.1
    }} className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
        <Input placeholder="Search pages..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
      </div>
      <Select value={filterStatus} onValueChange={setFilterStatus}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="Draft">Draft</SelectItem>
          <SelectItem value="Published">Published</SelectItem>
        </SelectContent>
      </Select>
    </motion.div>

    {/* Pages Grid */}
    <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 0.2
    }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPages.map(page => <Card key={page.id} className="hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-foreground text-lg font-normal truncate">{page.title}</CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openEditDialog(page)} className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openDeleteDialog(page)} className="cursor-pointer text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm line-clamp-3 mb-4 text-gray-600">
            {stripHtml(page.content)}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(page.lastModified)}
            </div>
            <Button variant="ghost" size="sm" onClick={() => openPreviewDialog(page)} className="text-primary hover:text-primary/80 p-1 h-auto">
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
          </div>
        </CardContent>
      </Card>)}
    </motion.div>

    {filteredPages.length === 0 && <div className="text-center py-12">
      <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-normal text-foreground mb-2">No pages found</h3>
      <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
    </div>}

    {/* Add Page Dialog */}
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Page</DialogTitle>
          <DialogDescription>
            Create a new page with the information below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="add-title" className="text-sm font-normal">Page Title</Label>
              <Input id="add-title" placeholder="Enter page title" value={formData.title} onChange={e => setFormData({
                ...formData,
                title: e.target.value
              })} className="h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-slug" className="text-sm font-normal">URL Slug</Label>
              <Input id="add-slug" placeholder="enter-url-slug" value={formData.slug} onChange={e => setFormData({
                ...formData,
                slug: e.target.value
              })} className="h-12" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="add-content" className="text-sm font-normal">Content</Label>
            <div contentEditable suppressContentEditableWarning={true} onInput={e => setFormData({
              ...formData,
              content: e.currentTarget.innerHTML
            })} className="border border-input rounded-md min-h-[300px] p-4 overflow-y-auto focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" style={{
              whiteSpace: 'pre-wrap'
            }} dangerouslySetInnerHTML={{
              __html: formData.content
            }} />
            <p className="text-xs text-muted-foreground">Rich text editor - you can format text, add headings, lists, etc.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="add-type" className="text-sm font-normal">Page Type</Label>
              <Select value={formData.type} onValueChange={value => setFormData({
                ...formData,
                type: value
              })}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="About Us">About Us</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>
                  <SelectItem value="Terms & Conditions">Terms & Conditions</SelectItem>
                  <SelectItem value="Privacy Policy">Privacy Policy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-status" className="text-sm font-normal">Status</Label>
              <Select value={formData.status} onValueChange={value => setFormData({
                ...formData,
                status: value
              })}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddPage}>
            Add Page
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Edit Page Dialog */}
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Page</DialogTitle>
          <DialogDescription>
            Update page information below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title" className="text-sm font-normal">Page Title</Label>
              <Input id="edit-title" placeholder="Enter page title" value={formData.title} onChange={e => setFormData({
                ...formData,
                title: e.target.value
              })} className="h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-slug" className="text-sm font-normal">URL Slug</Label>
              <Input id="edit-slug" placeholder="enter-url-slug" value={formData.slug} onChange={e => setFormData({
                ...formData,
                slug: e.target.value
              })} className="h-12" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-content" className="text-sm font-normal">Content</Label>
            <div contentEditable suppressContentEditableWarning={true} onInput={e => setFormData({
              ...formData,
              content: e.currentTarget.innerHTML
            })} className="border border-input rounded-md min-h-[300px] p-4 overflow-y-auto focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" style={{
              whiteSpace: 'pre-wrap'
            }} dangerouslySetInnerHTML={{
              __html: formData.content
            }} />
            <p className="text-xs text-muted-foreground">Rich text editor - you can format text, add headings, lists, etc.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-status" className="text-sm font-normal">Status</Label>
              <Select value={formData.status} onValueChange={value => setFormData({
                ...formData,
                status: value
              })}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleEditPage}>
            Update Page
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Preview Dialog */}
    <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{selectedPage?.title} - Preview</DialogTitle>
          <DialogDescription>
            Preview of how the page content will appear
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border border-input rounded-md p-6 min-h-[400px] overflow-y-auto">
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{
              __html: selectedPage?.content || ''
            }} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Delete Page Dialog */}
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Page</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{selectedPage?.title}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeletePage} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>;
};
export default PagesManagement;