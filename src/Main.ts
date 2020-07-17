import {sendHitMessage} from "./ChatManager"
import { log } from "./Logger"
import {createMacro} from "./Macro"
import {Manager, Message} from "./Socket"

declare global {
  interface Window { StarfinderQOL: any }
}

const handleDamagePost = async (message: Message) => {
  log("Handling damage")
  const token = canvas.tokens.get(message.data.targetId)
  await token.actor.update({
    "data.attributes.hp.value": token.actor.data.data.attributes.hp.value - message.data.totalDamage,
  })
}

const processSocketMessage = async (message: Message) => {
  switch (message.actionName) {
    case "action_name":
      if (!game.user.isGM) {
        break
      }
      await handleDamagePost(message)
      break
  }
}

let manager: Manager
Hooks.once("init", async () => {
  log("Initializing starfinder-qol")
  window.StarfinderQOL = {
    doRoll,
  }
})

Hooks.once("ready", async () => {
  manager = new Manager(processSocketMessage)
})

// export async function doRoll(event, itemName, {type = "weapon", versatile=false, token = null}={type:"weapon", versatile: false, token: null}) {
export async function doRoll(event: any, itemName: string): Promise<void> {
  const speaker = ChatMessage.getSpeaker()
  const token = canvas.tokens.get(speaker.token)
  const initiateActor = token ? token.actor : game.actors.get(speaker.actor)

  game.user.targets.forEach(async (target) => {
    const intendedGM = game.users.entities.find((u: User) => u.isGM && u.active)
    const attackData = {
      targetId: target.data._id,
      totalDamage: 9,
    }
    const socketMessage = new Message("action_name", intendedGM!.id, "foobarbazmessage", attackData)
    manager.broadcastData(socketMessage)

    const actor = target.actor
    const item = initiateActor.items.find((i: Item) => i.name === itemName)
    const attributes = actor.data.data.attributes

    await item.rollAttack({ event })

    const templateData = {
      targetAttributes: attributes,
      damageAppliedString: "Nailed it.",
    }
    sendHitMessage(templateData, actor)
  })
}

Hooks.on("hotbarDrop", (_hotbar: any, data: any, slot: number) => {
  log("Handling hotbarDrop")
  createMacro(data.data, slot)
  return false
})
