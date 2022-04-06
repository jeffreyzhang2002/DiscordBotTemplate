import UserCommand from "../../types/commands/UserCommand";
import Discord, {UserContextMenuInteraction} from "discord.js";
import Moment from "moment";

class InfoCommand extends UserCommand {

	constructor() {
		super("Info", "global", true);
	}

	override async execute(interaction: UserContextMenuInteraction): Promise<void> {
		const page = new Discord.MessageEmbed()
			.setAuthor({name: this.client.user!.username!, iconURL: String(this.client.user!.avatarURL())})
			.setColor("#DD6E0F")
			.setTitle(`${interaction.targetUser.username}'s Profile`)
			.setDescription(interaction.targetUser.tag)
			.setThumbnail(String(interaction.targetUser.avatarURL()))
			.addField("__ID__", interaction.targetUser.id, true)
			.addField("__Avatar__", `[Link](${String(interaction.targetUser.avatarURL())})`, true);

		if(interaction.targetUser.banner)
			page.addField("__Banner__", `[Link](${String(interaction.targetUser.bannerURL())})`, true);

		page.addField("__**Creation Date**__", interaction.targetUser.createdAt.toLocaleDateString("en-US"), false)
			.addField("__**Account Age**__", `\`\`\`${Moment.utc(interaction.user.createdTimestamp).fromNow()}\`\`\``, false);

		if(interaction.guild) {
			const member = await interaction.guild.members.fetch(interaction.targetUser.id);
			page.addField("__**Join Date**__", member.joinedAt!.toLocaleString("en-US"), true)
				.addField("__**Join Age**__",  `\`\`\`${Moment.utc(member.joinedAt).fromNow()}\`\`\``,false);
		}

		page.setTimestamp()
			.setFooter({text: `Requested By ${interaction.user.tag}`, iconURL: String(interaction.user.avatarURL())});

		await interaction.reply({embeds: [page]});
	}
}

export default new InfoCommand();
