import Discord from "discord.js";
import Event from "../types/events/Event";

class MessageCreateEvent extends Event{

	constructor() {
		super("messageCreate", "on");
	}

	override execute(message: Discord.Message) {
		console.log(message.content);
	}
}

export default new MessageCreateEvent();
