# Step-by-Step Guide: How User Management is Done & How to Create Course Management

## 📁 How User Management is Structured

### File Structure:
```
src/pages/User/
├── index.tsx              → Exports UserRoutes
└── components/
    └── User.tsx          → Main User component with all functionality
```

---

## 🎯 Step-by-Step: Creating Course Management

### **Step 1: Create Course Folder Structure**

Create these files:
```
src/pages/Course/
├── index.tsx              → (Create this)
└── components/
    └── Course.tsx         → (Create this)
```

---

### **Step 2: Create Route Export File**

**File:** `/src/pages/Course/index.tsx`

```typescript
import Course from './components/Course';

export const CourseRoutes = [{
    path: 'courses',
    element: <Course />
}]
```

---

### **Step 3: Export Course Routes from Main Index**

**File:** `/src/pages/index.tsx`

Add import and export:
```typescript
import { CourseRoutes } from './Course';  // Add this import

export {
  AuthRoutes,
  AdminRoutes,
  FAQRoutes,
  StaticPagesRoutes,
  UserRoutes,
  CourseRoutes,  // Add this export
}
```

---

### **Step 4: Add Route Constant**

**File:** `/src/shared/utils/routes.ts`

Add course route:
```typescript
export const ROUTES = {
    // Auth
    login: '/login',

    // Admin
    profile: '/profile',
    changePassword: '/change-password',

    // User
    userList: '/users',

    // FAQs
    faqList: '/faqs',

    // Static Pages
    staticPages: '/static-pages',

    // Course
    courseList: '/courses',  // Add this
}
```

---

### **Step 5: Register Routes in Router**

**File:** `/src/shared/routes/index.tsx`

Add import and add to PRIVATE_ROUTES:
```typescript
import { AuthRoutes } from '@/pages';
import { AdminRoutes, FAQRoutes, StaticPagesRoutes, UserRoutes, CourseRoutes } from '@/pages';  // Add CourseRoutes

export const PUBLIC_ROUTES = [
  ...AuthRoutes,
];

export const PRIVATE_ROUTES = [
  ...AdminRoutes,
  ...FAQRoutes,
  ...StaticPagesRoutes,
  ...UserRoutes,
  ...CourseRoutes,  // Add this
];
```

---

### **Step 6: Add to Sidebar Navigation**

**File:** `/src/components/DashboardLayout.tsx`

1. **Import icon** (at the top with other imports):
```typescript
import { BookOpen } from 'lucide-react';  // Add this import
```

2. **Add to sidebarItems array** (around line 13-25):
```typescript
const sidebarItems = [{
  id: ROUTES.userList,
  label: 'User Management',
  icon: Users
}, {
  id: ROUTES.staticPages,
  label: 'Pages Management',
  icon: FileText
}, {
  id: ROUTES.faqList,
  label: 'FAQ Management',
  icon: HelpCircle
}, {
  id: ROUTES.courseList,  // Add this
  label: 'Course Management',  // Add this
  icon: BookOpen  // Add this
}];
```

3. **Add header title** (around line 200-213):
```typescript
<h1 className="text-2xl font-medium text-gray-900">
  {currentPage === ROUTES.userList && 'User Management'}
  {currentPage === ROUTES.staticPages && 'Pages Management'}
  {currentPage === ROUTES.faqList && 'FAQ Management'}
  {currentPage === ROUTES.courseList && 'Course Management'}  // Add this
  {currentPage === ROUTES.profile && 'Profile Settings'}
  {currentPage === ROUTES.changePassword && 'Change Password'}
</h1>
<p className="text-sm font-light text-gray-600 mt-1">
  {currentPage === ROUTES.userList && 'Manage system users and their permissions'}
  {currentPage === ROUTES.staticPages && 'Edit and organize your website pages'}
  {currentPage === ROUTES.faqList && 'Maintain frequently asked questions'}
  {currentPage === ROUTES.courseList && 'Manage courses and their content'}  // Add this
  {currentPage === ROUTES.profile && 'Update your personal information'}
  {currentPage === ROUTES.changePassword && 'Secure your account with a new password'}
</p>
```

---

### **Step 7: Create Main Course Component**

**File:** `/src/pages/Course/components/Course.tsx`

This is where you'll build the complete Course management component. Follow the pattern from `User.tsx`:

#### **Structure Overview (based on User.tsx):**

1. **Imports** (similar to User.tsx):
   - React hooks (useState, useMemo)
   - UI components (Table, Button, Input, Dialog, etc.)
   - Icons from lucide-react
   - Formik for forms (you requested this)
   - httpServices for API calls
   - Toast for notifications

2. **TypeScript Interfaces**:
   ```typescript
   interface CourseData {
     id: number;
     courseTitle: string;
     coverImage: string;
     content: string;
     aboutCourse: string;
     courseIntroduction: string;
     courseFeatures: string;
     duration: string;
     totalAmount: number;
     depositAmount: number;
     category: string;
     courseType: string;
   }
   ```

3. **State Management** (similar to User.tsx):
   ```typescript
   const [courses, setCourses] = useState<CourseData[]>([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [filterCourseType, setFilterCourseType] = useState<string>('all');
   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
   const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 8;
   ```

4. **Filter & Search Logic** (similar to User.tsx lines 221-244):
   - Filter courses by CourseType
   - Search by courseName (courseTitle)
   - Pagination logic

5. **Form with Formik**:
   - Create form with all required fields
   - Validation schema (you can use Yup with Formik)
   - Handle file upload for Cover Image
   - Rich text editor for Content field

6. **Table Structure** (similar to User.tsx lines 412-490):
   - Table headers
   - Map through paginated courses
   - Action buttons (Edit, Delete)

7. **Dialogs**:
   - Add Course Dialog (with Formik form)
   - Edit Course Dialog (with Formik form, pre-populated)
   - Delete Confirmation Dialog

---

### **Step 8: Add API Endpoints**

**File:** `/src/shared/services/reqUrl.service.ts`

Add course endpoints:
```typescript
// Course
export const getCoursesURL = 'admin/courses';
export const createCourseURL = 'admin/courses';
export const updateCourseURL = (id: number) => `admin/courses/${id}`;
export const deleteCourseURL = (id: number) => `admin/courses/${id}`;
```

---

### **Step 9: Install Required Packages** (if needed)

Check if you need to install:
```bash
npm install formik yup
```

For rich text editor, you might need:
```bash
npm install react-quill
# or
npm install @tinymce/tinymce-react
```

---

## 📋 Key Patterns from User Management to Replicate:

1. **Pagination**: Lines 245-252 in User.tsx
2. **Search Filtering**: Lines 221-227 in User.tsx (adapt for courseName)
3. **Filter Dropdown**: Lines 184-212 in User.tsx (adapt for CourseType)
4. **Table Rendering**: Lines 412-490 in User.tsx
5. **Dialog Forms**: Lines 522-694 in User.tsx (but use Formik instead of react-hook-form)
6. **Toast Notifications**: Uses `useToast()` hook
7. **API Integration**: Use `httpServices` from `http.service.ts`

---

## 🎨 Form Fields Required for Course:

Based on your requirements:
- Course Title (Input)
- Cover Image (File Upload)
- Content (Rich Text Editor)
- About Course (Textarea)
- Course Introduction (Textarea)
- Course Features (Textarea)
- Duration (Input - number or text)
- Total Amount (Number Input)
- Deposit Amount (Number Input)
- Category (Select Dropdown)
- Course Type (Select Dropdown)

---

## ✅ Checklist:

- [ ] Step 1: Create folder structure
- [ ] Step 2: Create Course/index.tsx
- [ ] Step 3: Export from pages/index.tsx
- [ ] Step 4: Add route constant
- [ ] Step 5: Register in routes
- [ ] Step 6: Add to sidebar & DashboardLayout
- [ ] Step 7: Build Course.tsx component
- [ ] Step 8: Add API endpoints
- [ ] Step 9: Install Formik & editor (if needed)
- [ ] Step 10: Test routing works
- [ ] Step 11: Implement list with pagination
- [ ] Step 12: Implement search by courseName
- [ ] Step 13: Implement filter by CourseType
- [ ] Step 14: Implement Create form with Formik
- [ ] Step 15: Implement Update form with Formik
- [ ] Step 16: Connect to API

---

**Start with Steps 1-6 first to get the routing working, then build the component in Step 7!**

