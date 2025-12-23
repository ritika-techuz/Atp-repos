import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';
import User from './User';

class Message extends BaseModel {
    static get tableName() {
        return 'messages';
    }

    sender!: User;
    receiver!: User;
    sender_id!: number;
    receiver_id!: number;
    room_id!: string;
    message!: string;
    attachment_url?: string;
    status!: number; // 1 -> sent, 2 -> delivered, 3 -> read
    read_at?: Date;

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {
            sender: {
                modelClass: User,
                relation: Model.BelongsToOneRelation,
                join: { from: 'messages.sender_id', to: 'users.id' }
            },
            receiver: {
                modelClass: User,
                relation: Model.BelongsToOneRelation,
                join: { from: 'messages.receiver_id', to: 'users.id' }
            }
        };
    };
}

export default Message;
