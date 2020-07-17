import {log} from "./Logger"

const moduleSocket = "module.starfinderqol"

export class Message {
  constructor(public actionName: string, public message: string, public intendedFor: string, public data: any) { }
}

export class Manager {
  private socket = game.socket as any

  constructor(public callback: (message: Message) => void) {
    this.socket.on(moduleSocket, (message: Message) => {
      log("Processing socket message")
      callback(message)
    })
  }

  public broadcastData(message: Message): void {
    // if not a gm broadcast the message to a gm who can apply the damage
    if (game.user.id !== message.intendedFor) {
      this.socket.emit(moduleSocket, message)
    } else {
      this.callback(message)
    }
  }
}
