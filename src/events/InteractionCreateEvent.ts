import Event from "../types/events/Event";
import Discord from "discord.js";

class InteractionCreateEvent extends Event{

	constructor() {
		super("interactionCreate", "on");
	}

	override execute(interaction: Discord.Interaction) {

	}
}

export default new InteractionCreateEvent();
