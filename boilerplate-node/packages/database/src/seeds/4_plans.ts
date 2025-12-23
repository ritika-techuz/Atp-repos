import { Knex } from 'knex';

/**
 * Executes the seed function.
 * @description This will delete all existing entries in the table_name table and insert the seed entries.
 *
 * @param {Knex} knex - Knex instance.
 * @returns {Promise<void>} - Resolves if the seed was successful.
 */
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('plans').del();

    try {
        let planIds: string[] = [
            // Test price ids
            'price_1RSz7WSD0McdkBvaLyknqCsJ',
            'price_1RSz7pSD0McdkBvaBHfo0Dhm'

            // Live price ids
            // '',
            // ''
        ];

        // Create new plans
        const currency = 2; // 1 -> INR, 2 -> USD
        const interval = 3; // 1 -> Daily, 2 -> Weekly, 3 -> Monthly, 4 -> Yearly
        const intervalCount = 1; // The number of interval units for the subscription interval (e.g., 1 for monthly)
        const planType = {
            Basic: 1,
            Pro: 2
        };
        const planTypeNumberToName = {
            1: 'Basic',
            2: 'Pro'
        };
        const planPrice = {
            Basic: 50.0,
            Pro: 100.0
        };

        // Insert the plans into the database
        const insertPlanData = [
            {
                name: planTypeNumberToName['1'],
                price_id: planIds[0],
                price: planPrice['Basic'],
                features: null,
                currency: currency,
                type: planType['Basic'],
                interval: interval,
                interval_count: intervalCount
            },
            {
                name: planTypeNumberToName['2'],
                price_id: planIds[1],
                price: planPrice['Pro'],
                features: null,
                currency: currency,
                type: planType['Pro'],
                interval: interval,
                interval_count: intervalCount
            }
        ];

        // Inserts seed entries
        await knex('plans').insert(insertPlanData.flat(1));
    } catch (error: any) {
        throw new Error('Failed to create plans', error);
    }
}
