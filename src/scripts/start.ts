import Dotenv from "dotenv";
import Client from "../types/Client";
import * as FileSystem from "../utilities/FileSystem";
import * as Path from "path";
import {ArgumentsCamelCase} from "yargs";
import {PartialTypes} from "discord.js";
import {Sequelize} from "sequelize";

export default async function Start(args: ArgumentsCamelCase) {

	const env = Dotenv.config({path: Path.resolve(__dirname, "../../.env")});
	if(env.error)
		throw env.error;

	if(process.env.DISCORD_TOKEN == undefined && args.token == undefined)
		throw "Discord token can not be undefined!";

	const client = new Client({
		intents: Number(args.intents) || 32767,
		partials: (<PartialTypes[]>args.partials) || ["MESSAGE", "CHANNEL", "REACTION", "USER", "GUILD_MEMBER", "GUILD_SCHEDULED_EVENT"]
	});

	const eventFiles = (<string[]>args.events) || FileSystem.getFiles(Path.resolve(__dirname, "../events"));
	eventFiles.forEach(file => import(file).then(file => client.registerEvent(file.default)));
	console.log("Finished Configuring Events!");

	const commandFiles = (<string[]>args.commands) || FileSystem.getFiles(Path.resolve(__dirname, "../commands"));
	commandFiles.forEach(file => import(file).then(file => client.registerCommand(file.default)));
	console.log("Finished Configuring Commands!");

	if(<string>args.token || process.env.MONGO_URI) {

	}

	new Sequelize();
	await client.loginDatabase((<string>args.token || process.env.MONGO_URI)!);

	await client.login(<string>args.token || process.env.DISCORD_TOKEN);
}
