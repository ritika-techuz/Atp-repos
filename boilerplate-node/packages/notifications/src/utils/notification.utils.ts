import { User } from '@repo/db';

interface VariableMap {
    [key: string]: string;
}

export const replaceNotificationVariables = (content: string, variables: VariableMap): string => {
    let processedContent = content;
    Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        processedContent = processedContent.replace(regex, value);
    });
    return processedContent;
};

export const getNotificationVariables = async (receiver_id: number): Promise<VariableMap> => {
    const variables: VariableMap = {};
    // Add more variable types as needed
    const user = await User.query().findById(receiver_id);
    if (user) {
        variables.USER_NAME = user.first_name;
        // Add more user-related variables as needed
    }

    return variables;
};
