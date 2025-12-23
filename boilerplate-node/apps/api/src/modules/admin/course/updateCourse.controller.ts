import { Request, Response } from 'express';
import * as courseService from './course.service';

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await courseService.updateCourse(Number(id), req.body);
    if (result) {
      res.json({ success: true, message: 'Course updated', data: { result } });
    } else {
      res.status(404).json({ success: false, message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update course', error });
  }
};
