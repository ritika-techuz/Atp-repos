export interface ISocialSignInBody {
    social_id: string;
    first_name: string;
    last_name: string;
    email: string;
    mobile_number: string;
    password: string;
    profile_url: string;
    auth_type: number;
    device_type: number;
}

export interface ISocialSignInResponse {
    token: string;
    loginDetails: {
        id: number;
        name: string;
        email: string;
        mobile_number?: string;
        role: number;
        status: number;
    };
}

export interface IForgetPasswordBody {
    email: string;
    client_base_url: string;
}

export interface IVerifyResetPasswordLinkParams {
    token: string;
}

export interface IVerifyResetPasswordLinkResponse {
    is_valid_link: boolean;
}

export interface IResetPasswordParams extends IVerifyResetPasswordLinkParams {}

export interface IResetPasswordBody {
    password: string;
}
