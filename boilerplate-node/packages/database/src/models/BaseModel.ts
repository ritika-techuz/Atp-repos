import { Model } from 'objection';

export class BaseModel extends Model {
    id!: number;
    created_at!: Date;
    updated_at!: Date;
    deleted_at?: Date;
}
