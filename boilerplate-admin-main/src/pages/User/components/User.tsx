
import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MoreHorizontal, Edit, Trash2, Plus, User, Mail, Phone, Lock, ChevronUp, ChevronDown, EyeOff, Eye, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { FilterDropdown } from '@/components/FilterDropdown';
import { formatDate } from '@/shared/utils/helper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  role: z.enum(['Admin', 'User', 'Manager']),
  status: z.enum(['Active', 'Inactive']),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof formSchema>;

// const mockUsers: UserData[] = [{
//   id: 1,
//   name: 'John Doe',
//   email: 'john.doe@example.com',
//   phone: '123-456-7890',
//   role: 'Admin',
//   status: 'Active',
//   avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
//   tokensUsed: 1200000
// }, {
//   id: 2,
//   name: 'Jane Smith',
//   email: 'jane.smith@example.com',
//   phone: '987-654-3210',
//   role: 'User',
//   status: 'Inactive',
//   avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
//   tokensUsed: 850000
// }, {
//   id: 3,
//   name: 'Alice Johnson',
//   email: 'alice.johnson@example.com',
//   phone: '555-123-4567',
//   role: 'Manager',
//   status: 'Active',
//   avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=random',
//   tokensUsed: 2500000
// }, {
//   id: 4,
//   name: 'Bob Williams',
//   email: 'bob.williams@example.com',
//   phone: '111-222-3333',
//   role: 'User',
//   status: 'Active',
//   avatar: 'https://ui-avatars.com/api/?name=Bob+Williams&background=random',
//   tokensUsed: 650000
// }, {
//   id: 5,
//   name: 'Charlie Brown',
//   email: 'charlie.brown@example.com',
//   phone: '444-555-6666',
//   role: 'User',
//   status: 'Inactive',
//   avatar: 'https://ui-avatars.com/api/?name=Charlie+Brown&background=random',
//   tokensUsed: 21000
// }, {
//   id: 6,
//   name: 'Diana Miller',
//   email: 'diana.miller@example.com',
//   phone: '777-888-9999',
//   role: 'Admin',
//   status: 'Active',
//   avatar: 'https://ui-avatars.com/api/?name=Diana+Miller&background=random',
//   tokensUsed: 5000000
// }, {
//   id: 7,
//   name: 'Ethan Davis',
//   email: 'ethan.davis@example.com',
//   phone: '333-444-5555',
//   role: 'Manager',
//   status: 'Inactive',
//   avatar: 'https://ui-avatars.com/api/?name=Ethan+Davis&background=random',
//   tokensUsed: 180000
// }, {
//   id: 8,
//   name: 'Fiona Wilson',
//   email: 'fiona.wilson@example.com',
//   phone: '666-777-8888',
//   role: 'User',
//   status: 'Active',
//   avatar: 'https://ui-avatars.com/api/?name=Fiona+Wilson&background=random',
//   tokensUsed: 3200000
// }, {
//   id: 9,
//   name: 'George Taylor',
//   email: 'george.taylor@example.com',
//   phone: '222-333-4444',
//   role: 'User',
//   status: 'Active',
//   avatar: 'https://ui-avatars.com/api/?name=George+Taylor&background=random',
//   tokensUsed: 95000
// }, {
//   id: 10,
//   name: 'Hannah Moore',
//   email: 'hannah.moore@example.com',
//   phone: '888-999-0000',
//   role: 'Admin',
//   status: 'Inactive',
//   avatar: 'https://ui-avatars.com/api/?name=Hannah+Moore&background=random',
//   tokensUsed: 750000
// }];

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'User' | 'Manager';
  status: 'Active' | 'Inactive';
  avatar: string;
  // tokensUsed: number;
}

// const formatTokens = (tokens: number): string => {
//   if (tokens >= 1000000) {
//     return `${(tokens / 1000000).toFixed(1)}M`;
//   } else if (tokens >= 1000) {
//     return `${(tokens / 1000).toFixed(0)}K`;
//   }
//   return tokens.toString();
// };

const UserManagement = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'role' | 'status' | 'tokensUsed' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 8;
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'User',
    status: 'Active',
    password: ''
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: 'User',
      status: 'Active',
      password: '',
    },
  });

  // Initialize listing with mock users so pagination & search work out of the box
  // useEffect(() => {
  //   setUsers(mockUsers);
  // }, []);

  useEffect(() => {
    // Replace with your actual API URL and add auth headers if needed
    fetch('http://localhost:4040/api/admin/user', {
      headers: {
        Authorization: 'Bearer YOUR_ADMIN_JWT_TOKEN'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.result) {
          const mappedUsers = data.data.result.map((apiUser: any) => ({
            id: apiUser.id,
            name: apiUser.full_name,
            email: apiUser.email,
            phone: apiUser.phone_number || '',
            role: apiUser.role === "1" ? "Admin" : apiUser.role === "2" ? "User" : "Manager",
            status: apiUser.status === "1" ? "Active" : "Inactive",
            avatar: apiUser.avtar || `https://ui-avatars.com/api/?name=${encodeURIComponent(apiUser.full_name)}`,
            // tokensUsed: 0 // Not provided by backend
          }));
          setUsers(mappedUsers);
        }
      });
  }, []);

  const statusFilterOptions = [{
    value: 'all',
    label: 'All Status'
  }, {
    value: 'Active',
    label: 'Active'
  }, {
    value: 'Inactive',
    label: 'Inactive'
  }];
  const roleFilterOptions = [{
    value: 'all',
    label: 'All Roles'
  }, {
    value: 'Admin',
    label: 'Admin'
  }, {
    value: 'User',
    label: 'User'
  }, {
    value: 'Manager',
    label: 'Manager'
  }];
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filterStatus !== 'all') count++;
    if (filterRole !== 'all') count++;
    return count;
  }, [filterStatus, filterRole]);
  const handleSort = (column: 'name' | 'email' | 'role' | 'status' | 'tokensUsed') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };
  const filteredUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const searchRegex = new RegExp(searchTerm, 'i');
      const statusMatch = filterStatus === 'all' || user.status === filterStatus;
      const roleMatch = filterRole === 'all' || user.role === filterRole;
      const matchesSearch = searchRegex.test(user.name) || searchRegex.test(user.email);
      return matchesSearch && statusMatch && roleMatch;
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
  }, [users, searchTerm, filterStatus, filterRole, sortBy, sortOrder]);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, itemsPerPage]);
  const totalPages = useMemo(() => {
    return Math.ceil(filteredUsers.length / itemsPerPage);
  }, [filteredUsers, itemsPerPage]);

  const onSubmit = (data: FormData) => {
    const newUser: UserData = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      status: data.status,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`,
    };
    setUsers([...users, newUser]);
    setIsAddDialogOpen(false);
    form.reset();
    toast({
      title: "User added",
      description: "New user has been successfully added."
    });
  };

  const handleEditUser = () => {
    if (!selectedUser) return;
    const updatedUsers = users.map(user => user.id === selectedUser.id ? {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role as 'Admin' | 'User' | 'Manager',
      status: formData.status as 'Active' | 'Inactive'
    } : user);
    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    setSelectedUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'User',
      status: 'Active',
      password: ''
    });
    toast({
      title: "User updated",
      description: "User information has been successfully updated."
    });
  };
  const handleDeleteUser = () => {
    if (!selectedUser) return;
    const updatedUsers = users.filter(user => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
    toast({
      title: "User deleted",
      description: "User has been successfully deleted."
    });
  };
  const openEditDialog = (user: UserData) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      password: ''
    });
    setIsEditDialogOpen(true);
  };
  const openDeleteDialog = (user: UserData) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };
  const [showAddPassword, setShowAddPassword] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const getRoleBadgeVariant = (role: string) => {
    // Use the same blue gradient for all roles to distinguish from status colors
    return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30';
  };
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-gradient-to-r from-green-500/20 to-lime-500/20 text-green-400 border-green-500/30';
      case 'Inactive':
        return 'bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-400 border-gray-500/30';
    }
  };
  const getUserInitials = (name: string) => {
    return name.split(' ').map(part => part.charAt(0)).join('').toUpperCase().slice(0, 2);
  };
  const SortableHeader = ({
    column,
    children
  }: {
    column: 'name' | 'email' | 'role' | 'status' | 'tokensUsed';
    children: React.ReactNode;
  }) => <button onClick={() => handleSort(column)} className="flex items-center space-x-1 hover:text-gray-900 transition-colors">
      <span>{children}</span>
      {sortBy === column && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
    </button>;
  return <div className="min-h-screen">
      <div className="mx-auto px-4 sm:px-6 max-w-[1400px] lg:px-0 py-2">
        
        {/* Header Section - Outside the table */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.1
      }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl text-gray-900 font-medium">Users</h1>
            <p className="text-gray-600 mt-1 font-light text-base">Manage your team members and their access</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 font-normal">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </motion.div>

        {/* Search and Filters - Outside the table */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.15
      }} className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Search users..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20" />
          </div>
          
          <FilterDropdown statusValue={filterStatus} onStatusChange={setFilterStatus} statusOptions={statusFilterOptions} roleValue={filterRole} onRoleChange={setFilterRole} roleOptions={roleFilterOptions} activeFiltersCount={activeFiltersCount} />
        </motion.div>

        {/* Users Table - Starting from column headers */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          
          {/* Table Content - Starting directly from headers */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-gray-200">
                  <TableHead className="text-gray-700 font-normal py-3">
                    <SortableHeader column="name">User</SortableHeader>
                  </TableHead>
                  <TableHead className="text-gray-700 font-normal">
                    <SortableHeader column="email">Contact</SortableHeader>
                  </TableHead>
                  <TableHead className="text-gray-700 font-normal">
                    <SortableHeader column="role">Role</SortableHeader>
                  </TableHead>
                  <TableHead className="text-gray-700 font-normal">
                    <SortableHeader column="status">Status</SortableHeader>
                  </TableHead>
                  {/* Removed Tokens Used column */}
                  <TableHead className="text-gray-700 font-normal text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user, index) => <TableRow key={user.id} className="border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <TableCell className="py-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-blue-100 text-blue-700 font-normal text-sm">
                            {getUserInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-gray-900 text-sm font-normal">{user.name}</p>
                          <p className="text-xs text-gray-500 font-normal">ID: {user.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-gray-900 text-sm font-normal">{user.email}</p>
                        <p className="text-xs text-gray-500 font-normal">{user.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 font-normal text-xs">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'} className={user.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200 font-normal text-xs' : 'bg-gray-100 text-gray-700 border-gray-200 font-normal text-xs'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    {/* Removed Tokens Used cell */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4 text-gray-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border-gray-200">
                          <DropdownMenuItem onClick={() => openEditDialog(user)} className="hover:bg-gray-50 text-gray-700 cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openDeleteDialog(user)} className="hover:bg-red-50 text-red-600 focus:text-red-600 cursor-pointer">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/30">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 font-light">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
                </p>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100 text-gray-700 cursor-pointer'} />
                    </PaginationItem>
                    {Array.from({
                  length: Math.min(5, totalPages)
                }, (_, i) => {
                  const pageNumber = i + 1;
                  return <PaginationItem key={pageNumber}>
                          <PaginationLink onClick={() => setCurrentPage(pageNumber)} isActive={currentPage === pageNumber} className={currentPage === pageNumber ? 'bg-blue-600 text-white hover:bg-blue-700' : 'hover:bg-gray-100 text-gray-700 cursor-pointer'}>
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>;
                })}
                    <PaginationItem>
                      <PaginationNext onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100 text-gray-700 cursor-pointer'} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>}
        </motion.div>

        {/* Add User Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-lg" onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle className="text-xl font-medium text-gray-900">Add New User</DialogTitle>
              <DialogDescription className="text-base text-gray-600 font-light">
                Create a new user account with the information below.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-gray-900">Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
                            <Input 
                              placeholder="Enter full name" 
                              className="pl-11 h-12 text-base text-gray-900 placeholder:text-gray-500 border-gray-300 focus:border-primary/50 focus:ring-primary/25" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-sm text-red-600" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-gray-900">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
                            <Input 
                              type="email" 
                              placeholder="Enter email address" 
                              className="pl-11 h-12 text-base text-gray-900 placeholder:text-gray-500 border-gray-300 focus:border-primary/50 focus:ring-primary/25" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-sm text-red-600" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-gray-900">Phone</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
                            <Input 
                              placeholder="Enter phone number" 
                              className="pl-11 h-12 text-base text-gray-900 placeholder:text-gray-500 border-gray-300 focus:border-primary/50 focus:ring-primary/25" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-sm text-red-600" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-gray-900">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
                            <Input 
                              type={showAddPassword ? 'text' : 'password'} 
                              placeholder="Enter password" 
                              className="pl-11 pr-11 h-12 text-base text-gray-900 placeholder:text-gray-500 border-gray-300 focus:border-primary/50 focus:ring-primary/25" 
                              {...field} 
                            />
                            <button 
                              type="button" 
                              onClick={() => setShowAddPassword(!showAddPassword)} 
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors z-10"
                            >
                              {showAddPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-sm text-red-600" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium text-gray-900">Role</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 text-base border-gray-300 focus:border-primary/50 focus:ring-primary/25">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-gray-200">
                              <SelectItem value="User">User</SelectItem>
                              <SelectItem value="Admin">Admin</SelectItem>
                              <SelectItem value="Manager">Manager</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-sm text-red-600" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium text-gray-900">Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 text-base border-gray-300 focus:border-primary/50 focus:ring-primary/25">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-gray-200">
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-sm text-red-600" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <DialogFooter className="pt-6 space-x-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddDialogOpen(false)} 
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 text-base px-6 py-2.5"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90 text-white text-base px-6 py-2.5"
                  >
                    Add User
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-gray-900 font-normal">Edit User</DialogTitle>
              <DialogDescription className="text-gray-600 font-light">
                Update user information below.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-sm font-normal text-gray-900">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                  <Input id="edit-name" placeholder="Enter full name" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} className="pl-10 h-12 text-gray-900 placeholder:text-gray-500 border-gray-300 focus:border-primary/50 focus:ring-primary/25" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email" className="text-sm font-normal text-gray-900">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                  <Input id="edit-email" type="email" placeholder="Enter email address" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} className="pl-10 h-12 text-gray-900 placeholder:text-gray-500 border-gray-300 focus:border-primary/50 focus:ring-primary/25" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone" className="text-sm font-normal text-gray-900">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                  <Input id="edit-phone" placeholder="Enter phone number" value={formData.phone} onChange={e => setFormData({
                  ...formData,
                  phone: e.target.value
                })} className="pl-10 h-12 text-gray-900 placeholder:text-gray-500 border-gray-300 focus:border-primary/50 focus:ring-primary/25" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-password" className="text-sm font-normal text-gray-900">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                  <Input id="edit-password" type={showEditPassword ? 'text' : 'password'} placeholder="Enter password" value={formData.password} onChange={e => setFormData({
                  ...formData,
                  password: e.target.value
                })} className="pl-10 pr-10 h-12 text-gray-900 placeholder:text-gray-500 border-gray-300 focus:border-primary/50 focus:ring-primary/25" />
                  <button type="button" onClick={() => setShowEditPassword(!showEditPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors z-10">
                    {showEditPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role" className="text-sm font-normal text-gray-900">Role</Label>
                  <Select value={formData.role} onValueChange={value => setFormData({
                  ...formData,
                  role: value
                })}>
                    <SelectTrigger className="h-12 border-gray-300 focus:border-primary/50 focus:ring-primary/25">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status" className="text-sm font-normal text-gray-900">Status</Label>
                  <Select value={formData.status} onValueChange={value => setFormData({
                  ...formData,
                  status: value
                })}>
                    <SelectTrigger className="h-12 border-gray-300 focus:border-primary/50 focus:ring-primary/25">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Cancel
              </Button>
              <Button onClick={handleEditUser} className="bg-primary hover:bg-primary/90 text-white">
                Update User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete User Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent className="bg-white border-gray-200 text-gray-900">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-900 font-normal">Delete User</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 font-light">
                Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>;
};
export default UserManagement;
