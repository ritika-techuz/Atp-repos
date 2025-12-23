import { Model } from 'objection';

export class Course extends Model {
  id!: number;
  title!: string;
  slug!: string;
  course_type!: number;
  cover_image!: string;
  category_id!: number;
  introduction!: string | null;
  content!: string;
  duration!: string;
  total_amount!: number;
  deposit_amount!: number;
  created_at!: string;
  updated_at!: string | null;
  about_course!: string | null;
  course_feature!: string | null;
  is_deleted!: boolean;
  deleted_at!: string | null;

  static get tableName() {
    return 'courses';
  }
}
