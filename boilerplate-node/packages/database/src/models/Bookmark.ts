import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';
import User from './User';

class Bookmark extends BaseModel {
    static get tableName() {
        return 'bookmarks';
    }

    user_id!: number;
    target_id!: number;
    target_type!: string; // 1-> User, 2-> Blog

    user!: User;

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {
            user: {
                modelClass: User,
                relation: Model.BelongsToOneRelation,
                join: { from: 'bookmarks.user_id', to: 'users.id' }
            }
        };
    };
}

export default Bookmark;
