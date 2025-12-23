import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';
import User from './User';

class Notification extends BaseModel {
    static get tableName() {
        return 'notifications';
    }

    receiver_type!: number; // 1 -> Admin, 2 -> Sub Admin, 3 -> User
    receiver_id!: number;
    room_id!: string;
    title!: string;
    description!: string;
    redirection_type?: string;
    redirection_url?: string;
    type!: string;
    is_read!: number; // 1 -> Read, 2 -> Unread
    receiver!: User;

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {
            receiver: {
                modelClass: User,
                relation: Model.BelongsToOneRelation,
                join: { from: 'notifications.receiver_id', to: 'users.id' }
            }
        };
    };
}

export default Notification;
