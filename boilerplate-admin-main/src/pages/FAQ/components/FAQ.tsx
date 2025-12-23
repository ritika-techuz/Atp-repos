import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreHorizontal, Edit, Trash2, Plus, HelpCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const mockFAQs: FAQData[] = [
  {
    id: 1,
    question: 'How do I reset my password?',
    answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page and following the instructions sent to your email.',
    category: 'Account',
    status: 'Published',
    lastUpdated: '2023-01-01'
  },
  {
    id: 2,
    question: 'How do I change my email address?',
    answer: 'To change your email address, go to your profile settings and update the email field. You will need to verify the new email address.',
    category: 'Account',
    status: 'Published',
    lastUpdated: '2023-02-15'
  },
  {
    id: 3,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers. For enterprise customers, we also offer invoice billing.',
    category: 'Billing',
    status: 'Published',
    lastUpdated: '2023-03-20'
  },
  {
    id: 4,
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.',
    category: 'Billing',
    status: 'Draft',
    lastUpdated: '2023-04-01'
  },
  {
    id: 5,
    question: 'Is there a mobile app available?',
    answer: 'Yes, we have mobile apps available for both iOS and Android. You can download them from the App Store or Google Play Store.',
    category: 'General',
    status: 'Published',
    lastUpdated: '2023-05-05'
  },
  {
    id: 6,
    question: 'How do I contact customer support?',
    answer: 'You can contact our customer support team via email at support@example.com or through the live chat feature in your dashboard.',
    category: 'General',
    status: 'Published',
    lastUpdated: '2023-06-10'
  },
  {
    id: 7,
    question: 'What are your business hours?',
    answer: 'Our customer support is available Monday through Friday, 9 AM to 6 PM EST. For urgent issues, please use the emergency contact form.',
    category: 'General',
    status: 'Draft',
    lastUpdated: '2023-07-15'
  },
  {
    id: 8,
    question: 'How do I upgrade my plan?',
    answer: 'You can upgrade your plan at any time from your account settings. The changes will take effect immediately and you will be prorated for the difference.',
    category: 'Billing',
    status: 'Published',
    lastUpdated: '2023-08-20'
  }
];

interface FAQData {
  id: number;
  question: string;
  answer: string;
  category: 'Account' | 'Billing' | 'General' | 'Technical';
  status: 'Published' | 'Draft';
  lastUpdated: string;
}

const FAQManagement = () => {
  const [faqs, setFaqs] = useState<FAQData[]>(mockFAQs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'question' | 'status' | 'lastUpdated' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 8;
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    status: 'Draft'
  });

  const handleSort = (column: 'question' | 'status' | 'lastUpdated') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const filteredFAQs = useMemo(() => {
    let filtered = faqs.filter(faq => {
      const searchRegex = new RegExp(searchTerm, 'i');
      const statusMatch = filterStatus === 'all' || faq.status === filterStatus;
      return (searchRegex.test(faq.question) || searchRegex.test(faq.answer)) && statusMatch;
    });

    if (sortBy) {
      filtered.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        if (sortOrder === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }
    return filtered;
  }, [faqs, searchTerm, filterStatus, sortBy, sortOrder]);

  const paginatedFAQs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredFAQs.slice(startIndex, endIndex);
  }, [filteredFAQs, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredFAQs.length / itemsPerPage);
  }, [filteredFAQs, itemsPerPage]);

  const handleAddFAQ = () => {
    const newFAQ: FAQData = {
      id: Date.now(),
      question: formData.question,
      answer: formData.answer,
      category: 'General',
      status: formData.status as 'Published' | 'Draft',
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setFaqs([...faqs, newFAQ]);
    setIsAddDialogOpen(false);
    setFormData({
      question: '',
      answer: '',
      status: 'Draft'
    });
    toast({
      title: "FAQ added",
      description: "New FAQ has been successfully added."
    });
  };

  const handleEditFAQ = () => {
    if (!selectedFAQ) return;
    const updatedFAQs = faqs.map(faq => 
      faq.id === selectedFAQ.id ? {
        ...faq,
        question: formData.question,
        answer: formData.answer,
        status: formData.status as 'Published' | 'Draft',
        lastUpdated: new Date().toISOString().split('T')[0]
      } : faq
    );
    setFaqs(updatedFAQs);
    setIsEditDialogOpen(false);
    setSelectedFAQ(null);
    setFormData({
      question: '',
      answer: '',
      status: 'Draft'
    });
    toast({
      title: "FAQ updated",
      description: "FAQ has been successfully updated."
    });
  };

  const handleDeleteFAQ = () => {
    if (!selectedFAQ) return;
    const updatedFAQs = faqs.filter(faq => faq.id !== selectedFAQ.id);
    setFaqs(updatedFAQs);
    setIsDeleteDialogOpen(false);
    setSelectedFAQ(null);
    toast({
      title: "FAQ deleted",
      description: "FAQ has been successfully deleted."
    });
  };

  const openEditDialog = (faq: FAQData) => {
    setSelectedFAQ(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      status: faq.status
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (faq: FAQData) => {
    setSelectedFAQ(faq);
    setIsDeleteDialogOpen(true);
  };

  const openAddDialog = () => {
    setFormData({
      question: '',
      answer: '',
      status: 'Draft'
    });
    setIsAddDialogOpen(true);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-700 border-green-200 font-normal text-xs';
      case 'Draft':
        return 'bg-gray-100 text-gray-700 border-gray-200 font-normal text-xs';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 font-normal text-xs';
    }
  };

  const SortableHeader = ({ column, children }: { column: 'question' | 'status' | 'lastUpdated'; children: React.ReactNode }) => (
    <button 
      onClick={() => handleSort(column)} 
      className="flex items-center space-x-1 hover:text-foreground transition-colors text-foreground"
    >
      <span>{children}</span>
      {sortBy === column && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-normal text-foreground">FAQ Management</h2>
          <p className="text-muted-foreground font-light">Manage frequently asked questions</p>
        </div>
        <Button onClick={openAddDialog} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add FAQ
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
          <Input
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* FAQs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card rounded-xl border shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-foreground font-medium">
                  <SortableHeader column="question">Question</SortableHeader>
                </TableHead>
                <TableHead className="text-foreground font-medium">
                  <SortableHeader column="status">Status</SortableHeader>
                </TableHead>
                <TableHead className="text-foreground font-medium">
                  <SortableHeader column="lastUpdated">Last Updated</SortableHeader>
                </TableHead>
                <TableHead className="text-foreground font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedFAQs.map((faq) => (
                <TableRow key={faq.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                        <HelpCircle className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="max-w-xs">
                        <p className="font-medium text-foreground truncate">{faq.question}</p>
                        <p className="text-sm text-muted-foreground">ID: {faq.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getStatusBadgeVariant(faq.status)}`}>
                      {faq.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{faq.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => openEditDialog(faq)}
                          className="cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(faq)}
                          className="cursor-pointer text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t p-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNumber)}
                        isActive={currentPage === pageNumber}
                        className="cursor-pointer"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </motion.div>

      {/* Add FAQ Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New FAQ</DialogTitle>
            <DialogDescription>
              Create a new frequently asked question with the information below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="add-question" className="text-sm font-medium">Question</Label>
              <Input
                id="add-question"
                placeholder="Enter the question"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-answer" className="text-sm font-medium">Answer</Label>
              <Textarea
                id="add-answer"
                placeholder="Enter the answer"
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                className="min-h-[120px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-status" className="text-sm font-medium">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFAQ}>
              Add FAQ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit FAQ Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit FAQ</DialogTitle>
            <DialogDescription>
              Update FAQ information below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-question" className="text-sm font-medium">Question</Label>
              <Input
                id="edit-question"
                placeholder="Enter the question"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-answer" className="text-sm font-medium">Answer</Label>
              <Textarea
                id="edit-answer"
                placeholder="Enter the answer"
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                className="min-h-[120px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status" className="text-sm font-medium">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditFAQ}>
              Update FAQ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete FAQ Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete FAQ</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this FAQ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteFAQ} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FAQManagement;
