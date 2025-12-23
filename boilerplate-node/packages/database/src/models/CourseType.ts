import { Model } from 'objection';

class CourseType extends Model {
  id!: number;
  name!: string;
  description!: string | null;
  created_at!: string;
  updated_at!: string | null;

  static get tableName() {
    return 'course_types';
  }
}

export default CourseType;
