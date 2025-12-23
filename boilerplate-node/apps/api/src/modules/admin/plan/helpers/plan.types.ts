export interface ICreatePlanBody {
    name: string;
    price: number;
    tax_percentage?: number;
    type: number;
    provider: number;
    currency: number;
    interval?: number;
    status: number;
    features: string;
}

export interface IUpdatePlanParams {
    id: number;
}

export interface IUpdatePlanBody extends ICreatePlanBody {}

export interface IUpdatePlanStatusParams extends IUpdatePlanParams {}
