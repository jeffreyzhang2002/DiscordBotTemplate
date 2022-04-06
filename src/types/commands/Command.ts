import Discord from "discord.js";
import Client from "../Client";
import {SlashCommandBuilder} from "@discordjs/builders";
import CommandBuilder from "./CommandBuilder";

/**
 * Base class for all application commands. All application commands / message commands must extend this class to
 * work with the custom client
 */
export default abstract class Command {

	/**
	 * This field can be either CommandMode.Global for commands that are available everywhere and
	 * CommandMode.Guild for commands are are only available on guilds.
	 */
	public readonly scope: "guild"|"global";

	/**
	 * The type of the command. This can either be CHAT_INPUT, MESSAGE or USER.
	 */
	public readonly type: Discord.ApplicationCommandType;

	/**
	 * The name of the command
	 */
	public readonly name: string;

	/**
	 * The client this event is attached to. This value should not be modified as it is automatically
	 * initialized when registering the event to a client.
	 * @protected
	 */
	protected client!: Client;

	/**
	 * Command builder class to help build the command
	 * @protected
	 */
	protected abstract commandBuilder: SlashCommandBuilder|CommandBuilder;

	/**
	 * This method is run whenever the command runs. Override the execute method to change its behavior
	 */
	public readonly run: (...args: unknown[]) => unknown = this.execute.bind(this);

	/**
	 * Initializes a Command with important information
	 * @param name the name of the command
	 * @param type the type of the command
	 * @param mode the mode of the command
	 * @protected
	 */
	protected constructor(name: string, type: Discord.ApplicationCommandType, scope: "guild"|"global" = "guild") {
		this.type = type;
		this.scope = scope;
		this.name = name;
	}

	/**
	 * This method is ran once the Client is ready. Override this method if something within the command requires the
	 * client to be initialized
	 */
	public initialize(): void {
		if (!this.client)
			throw `Client has not been registered for ${this.name}`;
	}

	/**
	 * This method registers a client with the command. This method is automatically
	 * called when registering the event with a client. THIS METHOD SHOULD NOT BE CALLED as it will throw an
	 * exception if the client has already been registered
	 * @param client
	 */
	public registerClient(client: Client) {
		if(!this.client)
			this.client = client;
		else
			throw `Unable to register client for ${this.name} event. Client has already been registered`;
	}

	/**
	 * Override this method to control what gets run when the command gets executed
	 * @param args the parameters for the command
	 * @protected
	 */
	protected abstract execute(...args: unknown[]): unknown;

	/**
	 * Converts the command to JSON to be deployed
	 */
	public toJSON(): Record<string, unknown>|unknown {
		return this.commandBuilder.toJSON;
	}
}
