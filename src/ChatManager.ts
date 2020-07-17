export const sendHitMessage = async (templateData: any, actor: any) => {
    const messageContent = await renderTemplate("modules/sfrpgqol/public/templates/hits.html", templateData)
    const chatData = {
      user: game.user._id,
      speaker: { actor, alias: actor?.name },
      content: messageContent,
    }
    ChatMessage.create(chatData)
}
