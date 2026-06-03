

export interface GetNotificationsResponse {
    _id:string;
    user_id: number;
    title: string;
    content: string;
    is_read: boolean;
    created_at: string;
}

export interface GetNotificationData {
    notifications:GetNotificationsResponse[],
    total:number
}