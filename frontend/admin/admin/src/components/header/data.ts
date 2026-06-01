import { RepositoryFactory } from "../../service/FactoryService";

export const GetNotifications = async () => {
    try {
        const data = await RepositoryFactory.get('notification').getNotifications();
        return data;
    } catch (error) {
        console.log(error)
    }
}