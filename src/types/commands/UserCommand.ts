import Discord from "discord.js";
import Command from "./Command";
import CommandBuilder from "./CommandBuilder";

/**
 * Abstract class that represents a User Application Command
 */
export default abstract class UserCommand extends Command{

	/**
	 * Command builder that helps create the command
	 * @protected
	 */
	protected override readonly commandBuilder: CommandBuilder;

	/**
	 * Initializes a User command with its name, its mode and its default permissions
	 * @param name the name of the command
	 * @param mode the mode of the command "GUILD|GLOBAL"
	 * @param permissions If this command is disabled by default
	 * @protected
	 */
	protected constructor(name: string, scope: "guild"|"global" = "guild", permissions = true) {
		super(name,"USER", scope);
		this.commandBuilder = new CommandBuilder(name.toLowerCase(),"USER", permissions);
	}

	/**
	 * This method is called when the command executes
	 * @param interaction
	 */
	abstract override execute(interaction: Discord.UserContextMenuInteraction): unknown;
}
