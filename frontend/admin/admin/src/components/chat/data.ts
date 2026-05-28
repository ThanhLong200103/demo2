import { RepositoryFactory } from "../../service/FactoryService";

export const getRooms = async () => {
    try {
        const data = await RepositoryFactory.get('chat').getRooms();
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getMessages = async (roomId: number) => {
    try {
        const data = await RepositoryFactory.get('chat').getMessages(roomId);  
        return data;
    } catch (error) {
        console.log(error)
    }   
}

export const getRoomUsers = async () => {
    try {
        const data = await RepositoryFactory.get('chat').getRoomUsers();
        return data;
    } catch (error) {
        console.log(error)
    }
}