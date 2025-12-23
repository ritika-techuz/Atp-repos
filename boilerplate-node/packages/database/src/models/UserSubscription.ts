import { RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';
import { Plan, User } from './index';

class UserSubscription extends BaseModel {
    static get tableName() {
        return 'user_subscriptions';
    }

    user_id!: number;
    plan_id!: number;
    price_id!: string;
    subscription_id!: string;
    subscription_item_id!: string;
    invoice_url!: string;
    invoice_number!: string;
    price!: number;
    discount_amount!: number;
    tax_percentage!: number;
    tax_amount!: number;
    sub_total!: number;
    grand_total!: number;
    start_date!: Date;
    expiry_date!: Date;
    is_switch!: boolean; // 0 -> No, 1 -> Yes
    is_cancelled!: boolean; // 0 -> No, 1 -> Yes
    is_added_by_cron!: boolean; // 0 -> No, 1 -> Yes
    provider_response?: string | null;
    provider!: number; // 1 -> Stripe, 2 -> Razorpay
    payment_status!: number; // 1 -> Paid, 2 -> Failed, 3 -> Pending
    status!: number; // 1 -> Active, 2 -> Inactive, 3 -> Upcoming

    user!: User;
    plan!: Plan;

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {
            user: {
                modelClass: User,
                relation: BaseModel.BelongsToOneRelation,
                join: { from: 'user_subscriptions.user_id', to: 'users.id' }
            },
            plan: {
                modelClass: Plan,
                relation: BaseModel.BelongsToOneRelation,
                join: { from: 'user_subscriptions.plan_id', to: 'plans.id' }
            }
        };
    };
}

export default UserSubscription;
