import { RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';

class Plan extends BaseModel {
    static get tableName() {
        return 'plans';
    }

    name!: string;
    price_id!: string;
    price!: number;
    tax_percentage!: number;
    features!: string;
    type!: number; // 1 -> Basic, 2 -> Pro
    provider!: number; // 1 -> Stripe, 2 -> Razorpay
    currency!: number; // 1 -> INR, 2 -> USD
    interval!: number; // 1 -> Daily, 2 -> Weekly, 3 -> Monthly, 4 -> Yearly
    interval_count!: number; // Number of intervals. Maps from billing frequency in stripe - e.g. 1 for monthly
    status!: number; // 1 -> Inactive, 2 -> Active

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {};
    };
}

export default Plan;
