import { Model } from 'objection';

export class Category extends Model {
  id!: number;
  name!: string;
  created_at!: string;
  updated_at!: string | null;
  is_deleted!: boolean;
  deleted_at!: string | null;

  static get tableName() {
    return 'categories';
  }
}
