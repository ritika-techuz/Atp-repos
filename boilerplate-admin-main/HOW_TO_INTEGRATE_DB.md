# Guide: How to Integrate Database with User Management

This guide explains **WHERE** and **HOW** to change the code to fetch data from the database instead of using static mock data.

---

## 📍 **STEP 1: Add API Endpoints**

### **File:** `src/shared/services/reqUrl.service.ts`

**What to add:**
```typescript
// User
export const usersURL = 'admin/users';
export const userByIdURL = (id: number | string) => `admin/users/${id}`;
```

**Where:** Add these lines after the existing `loginURL` export.

**Note:** Replace `'admin/users'` with your actual backend API endpoint.

---

## 📍 **STEP 2: Import Required Dependencies**

### **File:** `src/pages/User/components/User.tsx`

**What to change:**

1. **Line 2:** Change this:
   ```typescript
   import React, { useState, useMemo } from 'react';
   ```
   To:
   ```typescript
   import React, { useState, useMemo, useEffect } from 'react';
   ```
   **Why:** Need `useEffect` to fetch data when component loads.

2. **After line 22:** Add these imports:
   ```typescript
   import { httpServices } from '@/shared/services/http.service';
   import { usersURL, userByIdURL } from '@/shared/services/reqUrl.service';
   ```
   **Why:** Need HTTP service to make API calls and URL constants.

---

## 📍 **STEP 3: Add Loading State**

### **File:** `src/pages/User/components/User.tsx`

**Where:** Inside the `UserManagement` component, after line 159 (after `itemsPerPage`)

**What to add:**
```typescript
const [loading, setLoading] = useState(false);
const [totalCount, setTotalCount] = useState(0);
```

**Why:** 
- `loading` - to show loading spinner while fetching
- `totalCount` - to track total users from API (for pagination)

---

## 📍 **STEP 4: Replace Mock Data Initialization**

### **File:** `src/pages/User/components/User.tsx`

**Line 148:** Change this:
```typescript
const [users, setUsers] = useState<UserData[]>(mockUsers);
```

**To:**
```typescript
const [users, setUsers] = useState<UserData[]>([]);
```

**Why:** Start with empty array, data will come from API.

**Note:** You can remove or comment out the `mockUsers` array (lines 35-125) once API is working.

---

## 📍 **STEP 5: Create Fetch Function**

### **File:** `src/pages/User/components/User.tsx`

**Where:** Add this function **BEFORE** the `filteredUsers` useMemo (before line 221)

**What to add:**
```typescript
// Fetch users from API
const fetchUsers = async () => {
  try {
    setLoading(true);
    const params: any = {
      page: currentPage,
      limit: itemsPerPage,
    };
    
    // Add search params if search term exists
    if (searchTerm) {
      params.search = searchTerm; // Backend should search both name and email
    }
    
    // Add filter params
    if (filterStatus !== 'all') {
      params.status = filterStatus;
    }
    if (filterRole !== 'all') {
      params.role = filterRole;
    }
    
    // Add sort params (if backend supports it)
    if (sortBy) {
      params.sortBy = sortBy;
      params.sortOrder = sortOrder;
    }

    const response = await httpServices.getData(usersURL, params);
    
    // Adjust based on your API response structure:
    // Option 1: { data: [...], total: number }
    // Option 2: { users: [...], total: number }
    // Option 3: { results: [...], count: number }
    // Option 4: Just an array [...]
    
    if (response?.data) {
      setUsers(response.data);
      setTotalCount(response.total || response.count || 0);
    } else if (response?.users) {
      setUsers(response.users);
      setTotalCount(response.total || response.count || 0);
    } else if (Array.isArray(response)) {
      setUsers(response);
      setTotalCount(response.length);
    } else {
      setUsers([]);
      setTotalCount(0);
    }
  } catch (error: any) {
    console.error('Error fetching users:', error);
    toast({
      title: "Error",
      description: error?.message || "Failed to fetch users",
      variant: "destructive"
    });
    setUsers([]);
    setTotalCount(0);
  } finally {
    setLoading(false);
  }
};

// Call fetchUsers when filters/search/pagination changes
useEffect(() => {
  fetchUsers();
}, [currentPage, searchTerm, filterStatus, filterRole, sortBy, sortOrder]);
```

**Important Notes:**
- Adjust the response handling (`response?.data`, `response?.users`, etc.) based on **your actual API response structure**
- If your backend doesn't support filtering/sorting, remove those params and do it client-side (keep existing `filteredUsers` logic)

---

## 📍 **STEP 6: Fix Email Search (Optional)**

### **File:** `src/pages/User/components/User.tsx`

**Line 226:** Change this:
```typescript
return searchRegex.test(user.name) && statusMatch && roleMatch;
```

**To:**
```typescript
return (searchRegex.test(user.name) || searchRegex.test(user.email)) && statusMatch && roleMatch;
```

**Why:** Currently only searches by name. This adds email search too.

**Note:** Only needed if you're doing **client-side filtering**. If backend handles search, skip this.

---

## 📍 **STEP 7: Update Create User Function**

### **File:** `src/pages/User/components/User.tsx`

**Line 254:** Replace the `onSubmit` function with:

```typescript
const onSubmit = async (data: FormData) => {
  try {
    setLoading(true);
    const response = await httpServices.postData(usersURL, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      status: data.status,
      password: data.password, // Only if backend needs it
    });
    
    // After successful creation, refresh the list
    await fetchUsers();
    
    setIsAddDialogOpen(false);
    form.reset();
    toast({
      title: "User added",
      description: "New user has been successfully added."
    });
  } catch (error: any) {
    toast({
      title: "Error",
      description: error?.message || "Failed to create user",
      variant: "destructive"
    });
  } finally {
    setLoading(false);
  }
};
```

**Important:** Adjust the payload object fields to match **your backend API requirements**.

---

## 📍 **STEP 8: Update Edit User Function**

### **File:** `src/pages/User/components/User.tsx`

**Line 274:** Replace the `handleEditUser` function with:

```typescript
const handleEditUser = async () => {
  if (!selectedUser) return;
  
  try {
    setLoading(true);
    await httpServices.putData(userByIdURL(selectedUser.id), {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      status: formData.status,
      password: formData.password || undefined, // Only send if changed
    });
    
    // After successful update, refresh the list
    await fetchUsers();
    
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
  } catch (error: any) {
    toast({
      title: "Error",
      description: error?.message || "Failed to update user",
      variant: "destructive"
    });
  } finally {
    setLoading(false);
  }
};
```

**Note:** Use `putData` or `patchData` based on your backend API. Also adjust fields to match your API.

---

## 📍 **STEP 9: Update Delete User Function**

### **File:** `src/pages/User/components/User.tsx`

**Line 300:** Replace the `handleDeleteUser` function with:

```typescript
const handleDeleteUser = async () => {
  if (!selectedUser) return;
  
  try {
    setLoading(true);
    await httpServices.deleteData(userByIdURL(selectedUser.id));
    
    // After successful deletion, refresh the list
    await fetchUsers();
    
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
    toast({
      title: "User deleted",
      description: "User has been successfully deleted."
    });
  } catch (error: any) {
    toast({
      title: "Error",
      description: error?.message || "Failed to delete user",
      variant: "destructive"
    });
  } finally {
    setLoading(false);
  }
};
```

---

## 📍 **STEP 10: Add Loading Indicator (Optional but Recommended)**

### **File:** `src/pages/User/components/User.tsx`

**Where:** In the table rendering section, add loading state check.

**After line 434 (TableBody):** Add this before mapping users:

```typescript
{loading ? (
  <TableRow>
    <TableCell colSpan={6} className="text-center py-8">
      Loading users...
    </TableCell>
  </TableRow>
) : paginatedUsers.length === 0 ? (
  <TableRow>
    <TableCell colSpan={6} className="text-center py-8">
      No users found
    </TableCell>
  </TableRow>
) : (
  paginatedUsers.map((user, index) => (
    // ... existing user row code
  ))
)}
```

---

## 🔧 **Configuration Notes**

### **API Response Format**

Your backend API should return data in one of these formats:

**Option 1 (Recommended for pagination):**
```json
{
  "data": [...users...],
  "total": 100,
  "page": 1,
  "limit": 8
}
```

**Option 2:**
```json
{
  "users": [...users...],
  "total": 100
}
```

**Option 3:**
```json
{
  "results": [...users...],
  "count": 100
}
```

Adjust the `fetchUsers` function response handling to match your API.

### **Backend Query Parameters Expected**

If backend supports server-side filtering/pagination, it should accept:
- `page` - Current page number
- `limit` - Items per page
- `search` - Search term (searches name/email)
- `status` - Filter by status
- `role` - Filter by role
- `sortBy` - Column to sort by
- `sortOrder` - 'asc' or 'desc'

---

## ✅ **Checklist**

- [ ] Added API endpoints to `reqUrl.service.ts`
- [ ] Added `useEffect` import
- [ ] Added `httpServices` and URL imports
- [ ] Added loading and totalCount states
- [ ] Changed initial users state from `mockUsers` to `[]`
- [ ] Created `fetchUsers` function
- [ ] Added `useEffect` to call `fetchUsers`
- [ ] Updated `onSubmit` to use API
- [ ] Updated `handleEditUser` to use API
- [ ] Updated `handleDeleteUser` to use API
- [ ] Fixed email search (if client-side filtering)
- [ ] Added loading indicator in UI
- [ ] Tested with your actual backend API

---

## 🐛 **Troubleshooting**

1. **No data showing?**
   - Check browser console for errors
   - Verify API endpoint URL is correct
   - Check API response format matches your handling code
   - Verify authentication token is being sent

2. **Pagination not working?**
   - Check if backend supports pagination
   - Verify `totalCount` is being set correctly
   - Adjust `totalPages` calculation if needed

3. **Search/Filter not working?**
   - Check if backend supports these params
   - If not, keep client-side filtering logic

4. **401 Unauthorized errors?**
   - Check if token is in localStorage
   - Verify token format is correct
   - Check http.service.ts interceptor




