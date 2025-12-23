import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './../../BaseModel';
import State from './state';

class Country extends BaseModel {
    static get tableName() {
        return 'countries';
    }

    name!: string;
    emoji!: string;
    country_code!: string;

    states!: State[];

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {
            states: {
                modelClass: State,
                relation: Model.HasManyRelation,
                join: { from: 'countries.id', to: 'states.country_id' }
            }
        };
    };
}

export default Country;
