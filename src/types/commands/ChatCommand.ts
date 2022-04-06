import Command from "./Command";
import {SlashCommandBuilder} from "@discordjs/builders";
import Discord from "discord.js";

/**
 * This class represents a Slash Command
 */
export default abstract class ChatCommand extends Command{

	/**
	 * Command Builder that helps create the command. Use this to change information about the command before deployment
	 * @protected
	 */
	protected override commandBuilder: SlashCommandBuilder;

	/**
	 * This method is called when the command is run using a trigger in a message. To change change command behavior
	 * override the executeMessage method below
	 */
	public runMessage?: (message: Discord.Message, args: Record<string, string|string[]>) => unknown = this.executeMessage?.bind(this);

	/**
	 * Creates an instance of a Chat Slash Command
	 * @param name the name of the command
	 * @param description the description of the command
	 * @param mode the mode of the command GUILD or GLOBAL
	 * @param permission default permission of the command
	 * @protected
	 */
	protected constructor(name: string, description: string, scope: "guild"|"global" = "guild", permission = true) {
		super(name,"CHAT_INPUT", scope);
		this.commandBuilder = new SlashCommandBuilder()
			.setName(name.toLowerCase())
			.setDescription(description)
			.setDefaultPermission(permission);
	}

	/**
	 * This method is run when the slash command gets called! override this to change its behavior
	 * @param interaction
	 * @protected
	 */
	protected abstract override execute(interaction: Discord.CommandInteraction): unknown;

	/**
	 * This method is run when the command is run using the legacy prefix way
	 * @param message
	 * @param args
	 * @protected
	 */
	protected abstract executeMessage?(message: Discord.Message, args: Record<string, string|string[]>): unknown;
}
