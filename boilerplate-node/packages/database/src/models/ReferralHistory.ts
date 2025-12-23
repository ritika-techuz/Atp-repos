import { BaseModel } from './BaseModel';
import User from './User';

class ReferralHistory extends BaseModel {
    static get tableName() {
        return 'referral_history';
    }

    referrer_id!: number;
    referred_id!: number;

    referrer!: User;
    referred!: User;

    static relationMappings = {
        referrer: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'referral_history.referrer_id',
                to: 'users.id'
            }
        },
        referred: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'referral_history.referred_id',
                to: 'users.id'
            }
        }
    };
}

export default ReferralHistory;
