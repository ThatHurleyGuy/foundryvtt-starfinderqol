const log = (...args: any[]) => console.log("SFRPG Qol | ", ...args)

declare global {
  interface Window { SFRPGQOL: any }
}

Hooks.once("init", async () => {
  log("Initializing sfrpg-qol")
  window.SFRPGQOL = {
    doRoll,
  };
});

// export async function doRoll(event, itemName, {type = "weapon", versatile=false, token = null}={type:"weapon", versatile: false, token: null}) {
export async function doRoll(event: any, itemName: string): Promise<void> {
  log(event)
  log(`Rolling for ${itemName}`)
}

Hooks.on("hotbarDrop", (_hotbar: any, data: any, slot: number) => {
  log("Handling hotbarDrop")
  createMacro(data.data, slot)
  return false
});

const createMacro = async (item: any, slot: number) => {
  const command = `SFRPGQOL.doRoll(event, "${item.name}")`
  log(command)
  const macro = await Macro.create({
    name: `${item.name} - ${item.type}`,
    type: "script",
    img: item.img,
    command,
    flags: { "sfrpg.itemMacro": true },
  }, { displaySheet: false }) as Macro
  await game.user.assignHotbarMacro(macro, slot)
}

Hooks.on("chatMessage", (_: any, messageText: string, data: any) => {
  log(data)
  if (messageText === "foobar") {
    log("fooooo")
  }
  // ChatMessage.create(data, {})
  return false
});

// Hooks.on("renderChatLog", () => {
//     $("#chat-log").on("click", ".special-dice-roller button", (event: Event) => {
//         event.preventDefault();
//
//         const button = event.target as HTMLButtonElement;
//         const rollerKey = button.dataset.roller;
//         const form = button.parentElement as HTMLFormElement;
//         const rolls = Array.from(form.querySelectorAll("input"));
//         const selectedRolls = rolls.filter((roll) => roll.checked);
//
//         for (const roller of rollers) {
//             if (selectedRolls.length > 0 && roller.command === rollerKey) {
//                 if (button.classList.contains("special-dice-roller-keep") && roller.canKeep) {
//                     const keptRolls = selectedRolls.map((roll) => parseRoll(roll));
//                     const result = roller.formatKeptRolls(keptRolls);
//                     renderNewRoll(result);
//                 } else if (roller.canReRoll) {
//                     const parsedRolls = rolls
//                         .map((rollInput) => {
//                             const roll = parseRoll(rollInput);
//                             return new ReRoll(roll, rollInput.checked);
//                         });
//                     const result = roller.formatReRolls(parsedRolls);
//                     renderNewRoll(result);
//                 }
//                 selectedRolls.forEach((elem) => elem.checked = false);
//             }
//         }
//     });
// });
//
// function renderNewRoll(rolls: string): void {
//     const chatData: IChatData = {
//         user: game.user.id,
//         content: rolls,
//     };
//     ChatMessage.create(chatData, {displaySheet: false});
// }
