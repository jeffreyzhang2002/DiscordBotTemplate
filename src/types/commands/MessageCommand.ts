import Discord from "discord.js";
import Command from "./Command";
import CommandBuilder from "./CommandBuilder";

/**
 * This class represent an application message command using a context menu
 */
export default abstract class MessageCommand extends Command{

	/**
	 * Command builder that helps create the command
	 * @protected
	 */
	protected override readonly commandBuilder: CommandBuilder;

	/**
	 * Creates a new Message command
	 * @param name the name of the command
	 * @param mode the mode of the command GLOBAL or GUILD
	 * @param permissions the default permissions
	 * @protected
	 */
	protected constructor(name: string, scope: "guild"|"global" = "guild", permissions = true) {
		super(name,"MESSAGE", scope);
		this.commandBuilder = new CommandBuilder(name.toLowerCase(),"MESSAGE", permissions);
	}

	/**
	 * This method is ran when the command is executed. Override this to change its behavior
	 * @param interaction
	 */
	abstract override execute(interaction: Discord.MessageContextMenuInteraction): unknown;
}
