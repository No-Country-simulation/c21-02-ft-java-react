export interface LobbyCreation {
    roomName: string,
    bet: number,
    maxUsers: number,
    privateRoom: boolean,
    ownerBet: string,
}

export interface SportEvent {
    id: number,
    eventName: string,
    description: string,
    eventDate: string,
    team1: string,
    team2: string,
    result: string | null
}