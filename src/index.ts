// begin foundry types
interface IHooks {
    on(event: string, callback: (chatLog: IChatLog, messageText: string, msg: IChatData) => void): void;
}

interface IChatData {
    user: string;
    content: string;
}

interface IChatLog {
    tabName: string;
}

interface IChatMessage {
    create(template: IChatData, options: object): void;
}

interface IUser {
    id: string;
}

interface IGame {
    user: IUser;
}

declare var Hooks: IHooks;
declare var ChatMessage: IChatMessage;
declare var game: IGame;

// end foundry types

// Hooks.on('init', () => {
    // game.specialDiceRoller = specialDiceRoller;
// });

Hooks.on('chatMessage', (_: IChatLog, messageText: string, data: IChatData) => {
  console.log(data);
  if (messageText === 'foobar') {
    console.log('fooooo');
  }
  // ChatMessage.create(data, {});
  return false;
});

// Hooks.on('renderChatLog', () => {
//     $('#chat-log').on('click', '.special-dice-roller button', (event: Event) => {
//         event.preventDefault();
//
//         const button = event.target as HTMLButtonElement;
//         const rollerKey = button.dataset.roller;
//         const form = button.parentElement as HTMLFormElement;
//         const rolls = Array.from(form.querySelectorAll('input'));
//         const selectedRolls = rolls.filter((roll) => roll.checked);
//
//         for (const roller of rollers) {
//             if (selectedRolls.length > 0 && roller.command === rollerKey) {
//                 if (button.classList.contains('special-dice-roller-keep') && roller.canKeep) {
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
