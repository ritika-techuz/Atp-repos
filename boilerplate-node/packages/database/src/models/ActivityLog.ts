import { RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';

class ActivityLog extends BaseModel {
    static get tableName() {
        return 'activity_logs';
    }

    user_id!: number;
    activity_id!: number;
    ip_address!: string;
    device_type!: number; // 1-> Mobile, 2-> Desktop, 3-> Tablet
    activity_type!: number; // 1-> Login, 2-> Logout

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {};
    };
}

export default ActivityLog;
