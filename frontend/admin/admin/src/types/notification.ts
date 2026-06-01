export interface GetNotificationsResponse {
    id:string;
    user_id: number;
    title: string;
    content: string;
    is_read: boolean;
    created_at: string;
}