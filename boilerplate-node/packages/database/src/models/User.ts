
import { RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';


class User extends BaseModel {
    static get tableName() {
        return 'users';
    }

    full_name!: string | null;
    email!: string;
    password!: string | null;
    role!: '1' | '2'; // 1-> admin, 2-> user
    avtar!: string | null;
    status!: '0' | '1'; // 0-> email not verified, 1-> verified
    has_seen_welcome!: boolean;
    phone_number!: string | null;
    social_data!: object | null;

    declare created_at: Date;
    declare updated_at: Date;
    declare deleted_at?: Date;

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {};
    };
}

export default User;
