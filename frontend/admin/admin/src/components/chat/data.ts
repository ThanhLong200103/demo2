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
export const addRoom = async (userId: number) => {
    try {
        const data = await RepositoryFactory.get('chat').addRoom(userId);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const sendMessage = async (roomId: number, content: string) => {
    try {
        const data = await RepositoryFactory.get('chat').sendMessage(roomId, content);
        return data;
    } catch (error) {
        console.log(error)
    }   

}