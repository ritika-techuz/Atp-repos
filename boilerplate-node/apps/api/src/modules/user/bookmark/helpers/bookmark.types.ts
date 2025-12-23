export interface IBookmark {
    user_id: number;
    target_id: number;
    target_type: string;
}

export interface IAddBookmarkParams {
    user_id: number;
    target_id: number;
    target_type: string;
}

export interface IListBookmarksParams {
    user_id: number | undefined;
    target_type?: string;
}
