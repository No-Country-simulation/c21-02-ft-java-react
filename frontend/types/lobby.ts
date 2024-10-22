export interface LobbyCreation {
    id: number,
    roomName: string,
    enable: boolean,
    bet: number,
    maxUsers: number,
    roomOwner: number,
    usersInRoom: number[],
    privateRoom: boolean,
    invitedUsers: number[],
    betDescription: string,
    totalAmount: number,
    sportEvent: {
        id: number,
        eventName: string,
        description: string,
        eventDate: string,
        team1: string,
        team2: string,
    }
}