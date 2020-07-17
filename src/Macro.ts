export const createMacro = async (item: any, slot: number) => {
  const command = `SFRPGQOL.doRoll(event, "${item.name}")`
  const macro = await Macro.create({
    name: `${item.name} - ${item.type}`,
    type: "script",
    img: item.img,
    command,
    flags: { "starfinderqol.itemMacro": true },
  }) as Macro
  await game.user.assignHotbarMacro(macro, slot)
}
