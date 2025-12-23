export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await courseService.deleteCourse(Number(id));
    if (result) {
      res.json({ success: true, message: 'Course deleted' });
    } else {
      res.status(404).json({ success: false, message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete course', error });
  }
};
export const createCourse = async (req: Request, res: Response) => {
  try {
    const result = await courseService.createCourse(req.body);
    res.status(201).json({ success: true, data: { result } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create course', error });
  }
};
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await courseService.getAllCategories();
    res.json({ success: true, data: { result } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories', error });
  }
};
import { Request, Response } from 'express';
import * as courseService from './course.service';

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const result = await courseService.getAllCourses();
    res.json({ success: true, data: { result } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch courses', error });
  }
};

export const getAllCourseTypes = async (req: Request, res: Response) => {
  try {
    const result = await courseService.getAllCourseTypes();
    res.json({ success: true, data: { result } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch course types', error });
  }
};
