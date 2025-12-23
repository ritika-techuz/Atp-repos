
import { Router } from 'express';
import * as courseController from './course.controller';
import { updateCourse } from './updateCourse.controller';

const router: Router = Router();

router.get('/', courseController.getAllCourses);
router.get('/types', courseController.getAllCourseTypes);
router.get('/categories', courseController.getAllCategories);

router.post('/', courseController.createCourse);

router.put('/:id', updateCourse);
router.delete('/:id', courseController.deleteCourse);

export default router;
