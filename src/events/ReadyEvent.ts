import Event from "../types/events/Event";
import Discord from "discord.js";
import * as Mongoose from "mongoose";

class ReadyEvent extends Event{

	constructor() {
		super("ready", "once");
	}

	override execute(client: Discord.Client<true>) {

		this.client?.commands.forEach(cmd => cmd.initialize());
		console.log("ready!");
	}
}

export default new ReadyEvent();
