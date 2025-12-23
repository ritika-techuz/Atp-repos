export interface IFeedback {
    user_id: number;
    module_id?: number | null;
    rating: number | null;
    feedback: string;
    type: number;
}
