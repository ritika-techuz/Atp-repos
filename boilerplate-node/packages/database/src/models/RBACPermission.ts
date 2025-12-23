import { BaseModel } from './BaseModel';

class RBACPermission extends BaseModel {
    static get tableName() {
        return 'role_permissions';
    }

    module_name!: string;
    admin!: string; // '1' -> Granted, '2' -> Not Granted
    user!: string; // '1' -> Granted, '2' -> Not Granted
    manager!: string; // '1' -> Granted, '2' -> Not Granted
}

export default RBACPermission;
