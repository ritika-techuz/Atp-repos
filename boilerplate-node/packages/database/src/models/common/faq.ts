import { BaseModel } from '../BaseModel';

class FAQ extends BaseModel {
    static get tableName() {
        return 'faqs';
    }

    question!: string;
    answer!: string;
    status!: number;
}

export default FAQ;
