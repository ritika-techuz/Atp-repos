import { BaseModel } from '../BaseModel';

class StaticPages extends BaseModel {
    static get tableName() {
        return 'static_pages';
    }

    page!: string;
    content!: string;
}

export default StaticPages;
