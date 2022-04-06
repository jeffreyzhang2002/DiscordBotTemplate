import Yargs, {argv} from "yargs";
import Start from "./src/scripts/start";

Yargs.scriptName("index.ts")
	.command("*", "Default Command", () => {DefaultCommand();})
	.command({
		command: "start",
		describe: "Start the discord bot",
		builder: (yargs) => yargs
			.option("token", {
				alias: "t",
				type: "string",
				describe: "Bot Token"
			})
			.option("intents", {
				alias: "i",
				type: "number",
				describe: "Bot Intents"
			})
			.option("partials",{
				alias: "p",
				type: "array",
				describe: "Bot Partials it will receive"
			})
			.option("events", {
				alias: "e",
				type: "array",
				describe: "List of events that will be included"
			})
			.option("commands", {
				alias: "c",
				type: "array",
				describe: "List of commands that will be included"
			}),
		handler: (argv) => {Start(argv);}
	})
	.command({
		command: "deploy",
		describe: "Manually deploy discord application commands",
		builder: (yargs) => yargs
			.option("guildID", {
				alias: "g",
				demandOption: true,
				type: "number",
				description: "the guildID for commands to deploy to. enter 0 for global commands"
			})
			.option("commands", {
				alias: "c",
				demandOption: true,
				type: "array",
				description: "List of command files to deploy"
			})
			.option("output", {
				alias: "o",
				default: "default place",
				type: "string",
				description: "log files for commands"
			}),
		handler: (argv) => {Start(argv);}
	})
	.command({
		command: "delete",
		describe: "Manually delete discord application commands",
		builder: (yargs) => yargs
			.option("guildID", {
				alias: "g",
				demandOption: true,
				type: "number",
				description: "the guildID for commands to deploy to. enter 0 for global commands"
			})
			.option("commands", {
				alias: "c",
				demandOption: true,
				type: "array",
				description: "List of command files or application IDs to delete"
			})
			.option("output", {
				alias: "o",
				default: "default place",
				type: "string",
				description: "log files for commands"
			}),
		handler: (argv) => {Start(argv);}
	})
	.command({
		command: "edit",
		describe: "Manually edit discord application commands",
		builder: (yargs) => yargs
			.option("guildID", {
				alias: "g",
				demandOption: true,
				type: "number",
				description: "the guildID for commands to deploy to. enter 0 for global commands"
			})
			.option("commands", {
				alias: "c",
				demandOption: true,
				type: "array",
				description: "List of command files to edit"
			})
			.option("output", {
				alias: "o",
				default: "default place",
				type: "string",
				description: "log files for commands"
			}),
		handler: (argv) => {
			Start(argv);
		}
	})
	.help()
	.config()
	.option("debug", {
		description: "debug mode level",
		choices: ["error", "warn", "info", "verbose", "debug", "silly"]
	})
	.argv;


function DefaultCommand() {
	console.log("\n----------------------------------------------");
	console.log("Hello and welcome to the Discord Bot Start Page!");
	console.log("For a list of commands type ts-node index.ts --help");
	console.log("----------------------------------------------\n");
}
