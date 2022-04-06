async function deployCommands() {
	const commandFiles: string[] = argMap["--deploy"] == "ALL"? loadFiles(__dirname + "\\commands") : argMap["--deploy"];
	const commands: {}[] = [];

	await commandFiles.forEach(file => import(Path.resolve(process.cwd(), String(file))).then(cmd => commands.push(cmd.default.toJSON())));

	const result = guildID?
		await rest.put(Routes.applicationGuildCommands(clientID, guildID), {body: commands}) :
		await rest.put(Routes.applicationCommands(clientID), {body: commands});

	return result;
}
