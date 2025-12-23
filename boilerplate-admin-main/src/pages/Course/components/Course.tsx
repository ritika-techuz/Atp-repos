import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Editor from './Editor';
import Quill, { DeltaStatic } from 'quill';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Search, MoreHorizontal, Edit, Trash2, Plus, Image as ImageIcon, FileText, Tag, Calendar, DollarSign, Filter } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';

// Types
interface CourseData {
  id: number;
  title: string;
  cover_image?: string;
  content: string;
  about_course: string;
  introduction: string;
  course_feature: string;
  duration: string;
  total_amount: number;
  deposit_amount: number;
  category_id: number;
  course_type: string; // or number if you use IDs
  created_at: string;
  updated_at?: string | null;
}


const CourseManagement = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourseType, setFilterCourseType] = useState<'all' | CourseData['course_type']>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { toast } = useToast();

  const [categories, setCategories] = useState<any[]>([]);
  const [courseTypes, setCourseTypes] = useState<any[]>([]);

  // Fetch all courses
  const fetchCourses = () => {
    fetch('http://localhost:4040/api/admin/course', { headers: { Authorization: 'Bearer YOUR_ADMIN_JWT_TOKEN' } })
      .then(res => res.json())
      .then(data => setCourses(data.data?.result || []));
  };
  // Fetch categories
  const fetchCategories = () => {
    fetch('http://localhost:4040/api/admin/course/categories', { headers: { Authorization: 'Bearer YOUR_ADMIN_JWT_TOKEN' } })
      .then(res => res.json())
      .then(data => setCategories(data.data?.result || []));
  };
  // Fetch course types
  const fetchCourseTypes = () => {
    fetch('http://localhost:4040/api/admin/course/types', { headers: { Authorization: 'Bearer YOUR_ADMIN_JWT_TOKEN' } })
      .then(res => res.json())
      .then(data => setCourseTypes(data.data?.result || []));
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
    fetchCourseTypes();
  }, []);
  const validationSchema = Yup.object({
    title: Yup.string().required('Course Title is required'),
    coverImage: Yup.string().url('Must be a valid URL').notRequired(),
    content: Yup.object().required('Content is required'),
    about: Yup.string().required('About Course is required'),
    introduction: Yup.string().required('Course Introduction is required'),
    features: Yup.string().required('Course Features is required'),
    duration: Yup.string().required('Duration is required'),
    totalAmount: Yup.number().required('Total Amount is required').min(0),
    depositAmount: Yup.number().required('Deposit Amount is required').min(0),
    category: Yup.string().required('Category is required'),
    course_type: Yup.string().required('Course Type is required'),
  });

  const filteredCourses = useMemo(() => {
    const searchRegex = new RegExp(searchTerm, 'i');
    return courses.filter((c) => {
      const matchesSearch = searchRegex.test(c.title);
      const matchesType = filterCourseType === 'all' || String(c.course_type) === String(filterCourseType);
      return matchesSearch && matchesType;
    });
  }, [courses, searchTerm, filterCourseType]);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCourses.slice(startIndex, endIndex);
  }, [filteredCourses, currentPage]);

  const totalPages = useMemo(() => Math.ceil(filteredCourses.length / itemsPerPage), [filteredCourses.length]);

  // CRUD Handlers
  // onAddCourse removed: handled by Formik onSubmit

  const onOpenEdit = (course: CourseData) => {
    setSelectedCourse(course);
    setIsEditDialogOpen(true);
  };

  // Edit handled by Formik below

  const onOpenDelete = (course: CourseData) => {
    setSelectedCourse(course);
    setIsDeleteDialogOpen(true);
  };

  const onDeleteCourse = async () => {
    if (!selectedCourse) return;
    try {
      const response = await fetch(`http://localhost:4040/api/admin/course/${selectedCourse.id}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer YOUR_ADMIN_JWT_TOKEN' },
      });
      if (!response.ok) throw new Error('Failed to delete course');
      setCourses((prev) => prev.filter((c) => c.id !== selectedCourse.id));
      toast({ title: 'Course deleted', description: 'Course has been successfully deleted.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete course', variant: 'destructive' });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedCourse(null);
    }
  };

  // const courseTypeOptions: CourseData['courseType'][] = ['Online', 'Offline', 'Hybrid'];
  const categoryOptions: string[] = ['Development', 'Design', 'Data', 'Marketing', 'Business'];

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 sm:px-6 max-w-[1400px] lg:px-0 py-2">
        {/* Header + Create */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
        >
          <div>
            <h1 className="text-3xl text-gray-900 font-medium">Courses</h1>
            <p className="text-gray-600 mt-1 font-light text-base">Manage your courses and their details</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 font-normal">
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        </motion.div>

                {/* Edit Course Dialog with Formik */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-medium text-gray-900">Edit Course</DialogTitle>
                      <DialogDescription className="text-base text-gray-600 font-light">
                        Update the details and save changes.
                      </DialogDescription>
                    </DialogHeader>
                    {selectedCourse && (
                      <Formik
                        initialValues={{
                          title: selectedCourse.title || '',
                          coverImage: selectedCourse.cover_image || '',
                          content: (() => {
                            const QuillDelta = Quill.import('delta');
                            if (!selectedCourse.content) return new QuillDelta();
                            if (typeof selectedCourse.content === 'string') {
                              try {
                                return new QuillDelta(JSON.parse(selectedCourse.content));
                              } catch {
                                return new QuillDelta();
                              }
                            }
                            // If already Delta object
                            return new QuillDelta(selectedCourse.content);
                          })(),
                          about: selectedCourse.about_course || '',
                          introduction: selectedCourse.introduction || '',
                          features: selectedCourse.course_feature || '',
                          duration: selectedCourse.duration || '',
                          totalAmount: selectedCourse.total_amount || '',
                          depositAmount: selectedCourse.deposit_amount || '',
                          category: selectedCourse.category_id ? String(selectedCourse.category_id) : '',
                          course_type: selectedCourse.course_type ? String(selectedCourse.course_type) : '',
                        }}
                        validationSchema={validationSchema}
                        enableReinitialize
                        onSubmit={async (values, { setSubmitting }) => {
                          try {
                            const payload = {
                              title: values.title,
                              cover_image: values.coverImage,
                              content: JSON.stringify(values.content),
                              about_course: values.about,
                              introduction: values.introduction,
                              course_feature: values.features,
                              duration: values.duration,
                              total_amount: Number(values.totalAmount),
                              deposit_amount: Number(values.depositAmount),
                              category_id: Number(values.category),
                              course_type: Number(values.course_type),
                            };
                            const response = await fetch(`http://localhost:4040/api/admin/course/${selectedCourse.id}`, {
                              method: 'PUT',
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer YOUR_ADMIN_JWT_TOKEN',
                              },
                              body: JSON.stringify(payload),
                            });
                            if (!response.ok) throw new Error('Failed to update course');
                            toast({ title: 'Course updated', description: 'Course has been updated.' });
                            setIsEditDialogOpen(false);
                            fetchCourses();
                          } catch (error) {
                            toast({ title: 'Error', description: 'Failed to update course', variant: 'destructive' });
                          } finally {
                            setSubmitting(false);
                          }
                        }}
                      >
                        {({ isSubmitting, setFieldValue, values }) => (
                          <Form className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium">Course Title</label>
                              <Field name="title" type="text" className="w-full border rounded p-2" />
                              <ErrorMessage name="title" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium">Cover Image</label>
                              <Field name="coverImage" type="text" className="w-full border rounded p-2" />
                              <ErrorMessage name="coverImage" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium">Content</label>
                              <Editor
                                value={values.content}
                                onChange={val => setFieldValue('content', val)}
                              />
                              <ErrorMessage name="content" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium">About Course</label>
                              <Field name="about" as="textarea" className="w-full border rounded p-2" />
                              <ErrorMessage name="about" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium">Course Introduction</label>
                              <Field name="introduction" as="textarea" className="w-full border rounded p-2" />
                              <ErrorMessage name="introduction" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium">Course Features</label>
                              <Field name="features" as="textarea" className="w-full border rounded p-2" />
                              <ErrorMessage name="features" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium">Duration</label>
                              <Field name="duration" type="text" className="w-full border rounded p-2" />
                              <ErrorMessage name="duration" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div className="flex gap-4">
                              <div className="flex-1">
                                <label className="block text-sm font-medium">Total Amount</label>
                                <Field name="totalAmount" type="number" className="w-full border rounded p-2" />
                                <ErrorMessage name="totalAmount" component="div" className="text-red-500 text-xs" />
                              </div>
                              <div className="flex-1">
                                <label className="block text-sm font-medium">Deposit Amount</label>
                                <Field name="depositAmount" type="number" className="w-full border rounded p-2" />
                                <ErrorMessage name="depositAmount" component="div" className="text-red-500 text-xs" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium">Category</label>
                              <Field name="category" as="select" className="w-full border rounded p-2">
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                              </Field>
                              <ErrorMessage name="category" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium">Course Type</label>
                              <Field name="course_type" as="select" className="w-full border rounded p-2">
                                <option value="">Select Course Type</option>
                                {courseTypes.map(type => (
                                  <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                              </Field>
                              <ErrorMessage name="course_type" component="div" className="text-red-500 text-xs" />
                            </div>
                            <DialogFooter className="pt-4">
                              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-gray-300 text-gray-700 hover:bg-gray-50 text-base px-6 py-2.5">Cancel</Button>
                              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white text-base px-6 py-2.5" disabled={isSubmitting}>Save Changes</Button>
                            </DialogFooter>
                          </Form>
                        )}
                      </Formik>
                    )}
                  </DialogContent>
                </Dialog>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-medium text-gray-900">Add New Course</DialogTitle>
              <DialogDescription className="text-base text-gray-600 font-light">
                Fill in the details to create a new course.
              </DialogDescription>
            </DialogHeader>
            <Formik
              initialValues={{
                title: '',
                coverImage: '',
                content: new (Quill.import('delta'))(),
                about: '',
                introduction: '',
                features: '',
                duration: '',
                totalAmount: '',
                depositAmount: '',
                category: '',
                course_type: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  // Map frontend fields to backend/database fields
                  // Generate a slug from the title if not provided
                  const slug = values.title
                    ? values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                    : 'course-' + Date.now();
                  const payload = {
                    title: values.title,
                    slug,
                    cover_image: values.coverImage,
                    content: JSON.stringify(values.content),
                    about_course: values.about,
                    introduction: values.introduction,
                    course_feature: values.features,
                    duration: values.duration,
                    total_amount: Number(values.totalAmount),
                    deposit_amount: Number(values.depositAmount),
                    category_id: Number(values.category),
                    course_type: Number(values.course_type),
                  };
                  const response = await fetch('http://localhost:4040/api/admin/course', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: 'Bearer YOUR_ADMIN_JWT_TOKEN',
                    },
                    body: JSON.stringify(payload),
                  });
                  if (!response.ok) throw new Error('Failed to save course');
                  toast({ title: 'Course created', description: 'Course has been added.' });
                  resetForm();
                  setIsAddDialogOpen(false);
                  // Optionally, refresh course list here
                } catch (error) {
                  toast({ title: 'Error', description: 'Failed to save course', variant: 'destructive' });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Course Title</label>
                    <Field name="title" type="text" className="w-full border rounded p-2" />
                    <ErrorMessage name="title" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Cover Image</label>
                    <Field name="coverImage" type="text" className="w-full border rounded p-2" />
                    <ErrorMessage name="coverImage" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Content</label>
                    <Editor
                      value={values.content}
                      onChange={val => setFieldValue('content', val)}
                    />
                    <ErrorMessage name="content" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">About Course</label>
                    <Field name="about" as="textarea" className="w-full border rounded p-2" />
                    <ErrorMessage name="about" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Course Introduction</label>
                    <Field name="introduction" as="textarea" className="w-full border rounded p-2" />
                    <ErrorMessage name="introduction" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Course Features</label>
                    <Field name="features" as="textarea" className="w-full border rounded p-2" />
                    <ErrorMessage name="features" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Duration</label>
                    <Field name="duration" type="text" className="w-full border rounded p-2" />
                    <ErrorMessage name="duration" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium">Total Amount</label>
                      <Field name="totalAmount" type="number" className="w-full border rounded p-2" />
                      <ErrorMessage name="totalAmount" component="div" className="text-red-500 text-xs" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium">Deposit Amount</label>
                      <Field name="depositAmount" type="number" className="w-full border rounded p-2" />
                      <ErrorMessage name="depositAmount" component="div" className="text-red-500 text-xs" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Category</label>
                    <Field name="category" as="select" className="w-full border rounded p-2">
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="category" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Course Type</label>
                    <Field name="course_type" as="select" className="w-full border rounded p-2">
                      <option value="">Select Course Type</option>
                      {courseTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="course_type" component="div" className="text-red-500 text-xs" />
                  </div>
                  <DialogFooter className="pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-gray-300 text-gray-700 hover:bg-gray-50 text-base px-6 py-2.5">Cancel</Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-white text-base px-6 py-2.5" disabled={isSubmitting}>Add Course</Button>
                  </DialogFooter>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>

        {/* Search + Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by course name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <Select value={filterCourseType} onValueChange={(val) => setFilterCourseType(val as any)}>
              <SelectTrigger className="w-[180px] h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20">
                <SelectValue placeholder="Course Type" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="all">All Types</SelectItem>
                {courseTypes.map((type: any) => (
                  <SelectItem key={type.id} value={String(type.id)}>{type.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-gray-200">
                  <TableHead className="text-gray-700 font-normal py-3">Course Name</TableHead>
                  <TableHead className="text-gray-700 font-normal">Course Type</TableHead>
                  <TableHead className="text-gray-700 font-normal">Category</TableHead>
                  <TableHead className="text-gray-700 font-normal">Duration</TableHead>
                  <TableHead className="text-gray-700 font-normal">Price</TableHead>
                  <TableHead className="text-gray-700 font-normal text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCourses.map((course) => {
                  const typeName = courseTypes.find((type) => type.id === Number(course.course_type))?.name || course.course_type;
                  const categoryName = categories.find((cat) => cat.id === course.category_id)?.name || course.category_id;
                  return (
                    <TableRow key={course.id} className="border-gray-100 hover:bg-gray-50/50 transition-colors align-middle">
                      <TableCell className="py-3 align-middle">
                        <span className="text-gray-900 text-base font-medium leading-tight">{course.title}</span>
                      </TableCell>
                      <TableCell className="align-middle">
                        <span className="text-gray-700 text-sm">{typeName}</span>
                      </TableCell>
                      <TableCell className="align-middle">
                        <span className="text-gray-700 text-sm">{categoryName}</span>
                      </TableCell>
                      <TableCell className="text-gray-600 font-normal text-sm align-middle">{course.duration}</TableCell>
                      <TableCell className="text-gray-900 font-normal text-sm align-middle">${course.total_amount}</TableCell>
                      <TableCell className="text-right align-middle">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                              <MoreHorizontal className="h-4 w-4 text-gray-500" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white border-gray-200">
                            <DropdownMenuItem onClick={() => onOpenEdit(course)} className="hover:bg-gray-50 text-gray-700 cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onOpenDelete(course)} className="hover:bg-red-50 text-red-600 focus:text-red-600 cursor-pointer">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/30">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 font-light">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCourses.length)} of {filteredCourses.length} courses
                </p>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100 text-gray-700 cursor-pointer'}
                      />
                    </PaginationItem>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNumber = i + 1;
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            onClick={() => setCurrentPage(pageNumber)}
                            isActive={currentPage === pageNumber}
                            className={currentPage === pageNumber ? 'bg-blue-600 text-white hover:bg-blue-700' : 'hover:bg-gray-100 text-gray-700 cursor-pointer'}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100 text-gray-700 cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </motion.div>

        {/* Add Course Dialog is handled by Formik above. Removed duplicate uncontrolled form. */}

        {/* TODO: Refactor Edit Course Dialog to use Formik, similar to Add Course Dialog. Removed formData/setFormData usage. */}

        {/* Delete Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent className="bg-white border-gray-200 text-gray-900">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-900 font-normal">Delete Course</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 font-light">
                Are you sure you want to delete {selectedCourse?.title}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDeleteCourse} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default CourseManagement;