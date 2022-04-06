import Discord from "discord.js";
import Event from "./events/Event";
import Command from "./commands/Command";
import {Sequelize} from "sequelize";

type IntentsResolvable = string|number|Discord.Intents|string[]|number[]|Discord.Intents[]

export default class Client extends Discord.Client {

	public readonly database:
	public readonly commands: Map<string, Command>;

	public constructor(config: Discord.ClientOptions) {
		super(config);
		this.commands = new Map<string, Command>();
	}

	public registerEvent(event: Event): boolean {

		if(super.eventNames().includes(event.name))
			return false;

		event.registerClient(this);
		super[event.mode](event.name, (...args) => {event.run(...args); });
		return true;
	}

	public registerEvents(events: Event[]): Event[] {
		const failedEvents = [];
		for(const event of events) {
			if(!this.registerEvent(event))
				failedEvents.push(event);
		}
		return failedEvents;
	}

	public registerCommand(command: Command): boolean {
		if(this.commands.has(command.name))
			return false;

		command.registerClient(this);
		this.commands.set(command.name, command);
		return true;
	}

	public registerCommands(commands: Command[]): Command[] {
		const failedCommands = [];
		for(const command of commands) {
			if(!this.registerCommand(command))
				failedCommands.push(command);
		}
		return failedCommands;
	}

	public registerDatabase(database) {

	}
}
