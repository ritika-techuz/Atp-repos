import { Course, CourseType, Category } from '@repo/db';

export const updateCourse = async (id: number, data: any) => {
  // Update course by ID
  const course = await Course.query().findById(id);
  if (!course) return null;
  await Course.query().patch(data).where('id', id);
  return await Course.query().findById(id);
};
export const deleteCourse = async (id: number) => {
  // Soft delete: set is_deleted = true, deleted_at = now
  const course = await Course.query().findById(id);
  if (!course) return null;
  // Format date as 'YYYY-MM-DD HH:mm:ss' for MySQL
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const formattedDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  await Course.query().patch({ is_deleted: true, deleted_at: formattedDate }).where('id', id);
  return true;
};
export const createCourse = async (data: any) => {
  // Insert new course into DB
  return await Course.query().insert(data);
};
// Service for course and course types

export const getAllCategories = async () => {
  // Fetch all categories from DB
  return await Category.query();
};
export const getAllCourses = async () => {
  // Fetch only courses that are not deleted
  return await Course.query().where(builder => {
    builder.where('is_deleted', false).orWhereNull('is_deleted');
  });
};

export const getAllCourseTypes = async () => {
  // Fetch all course types from DB
  return await CourseType.query();
};
