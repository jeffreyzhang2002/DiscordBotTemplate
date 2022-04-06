import Event from "../types/events/Event";
import Discord from "discord.js";

class GuildCreateEvent extends Event{

	constructor() {
		super("guildCreate", "on");
	}

	override async execute(guild: Discord.Guild) {

	}
}

export default new GuildCreateEvent();
