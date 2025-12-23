import { RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';

class PromoCode extends BaseModel {
    static get tableName() {
        return 'promo_codes';
    }

    coupon_id!: string;
    promo_code!: string;
    discount_value!: number;
    start_date!: Date;
    expiry_date!: Date;
    type!: number; // 1 -> Fixed, 2 -> Percentage
    status!: number; // 1 -> Active, 2 -> Inactive, 3 -> Expired

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {};
    };
}

export default PromoCode;
