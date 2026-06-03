import { RepositoryFactory } from "../../service/FactoryService";

export const GetNotifications = async (limit: number) => {
    try {
        const data = await RepositoryFactory.get('notification').getNotifications(limit);
        return data;
    } catch (error) {
        console.log(error)
    }
}