import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import type { Command } from '../types/Command';
import type Client from '../util/Client';
import Logger from '../util/Logger';

/**
 * The uptime command
 *
 * @author Soni
 * @since 6.0.0
 * @see {@link Command}
 */
export default class Uptime implements Command
{
    name = 'uptime';
    description = 'Show info uptime Soni Bot';
    client: Client<true>;
    logger = new Logger(Uptime.name);

    /**
     * Creates a new uptime command
     *
     * @param {Client} client The Client the command is attached to
     *
     * @author Soni
     * @since 6.0.0
     * @see {@link Client}
     */
    constructor(client: Client)
    {
        this.client = client;
    }

    /**
     * Executes the command
     *
     * @param {ChatInputCommandInteraction<"cached">} i The command interaction
     * @returns {Promise<Message<boolean>>} The reply sent by the bot
     *
     * @author Soni
     * @since 6.0.0
     * @see {@link ChatInputCommandInteraction}
     */
    async execute(i: ChatInputCommandInteraction<'cached'>)
    {
        return await i.editReply({ embeds: [
            this.client.defaultEmbed()
                .setTitle('Soni Bot uptime')
                .addFields([
                    {
                        name: "Uptime",
                        value: this._timeConversion(this.client.uptime)
                    }
                ])
        ] });
    }

    /**
     * The slash command builder for this command interaction.
     *
     * @returns {Promise<SlashCommandBuilder>} The slash command builder for this command interaction.
     */
    async slashCommand()
    {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
    }

    /**
     * Convert milliseconds to a human-readable format
     *
     * @param {number} duration The amount to convert, in milliseconds
     * @returns {string} The converted amount
     *
     * @author theS1LV3R
     * @since 6.0.0
     * @see {@link https://stackoverflow.com/a/58826445/9088682|This code on StackOverflow}
     */
    private _timeConversion(duration: number)
    {
        const portions: string[] = [];

        // TODO: Add day conversion

        const msInHour = 1000 * 60 * 60;
        const hours = Math.trunc(duration / msInHour);
        if (hours > 0)
        {
            portions.push(hours + "h");
            duration = duration - hours * msInHour;
        }

        const msInMinute = 1000 * 60;
        const minutes = Math.trunc(duration / msInMinute);
        if (minutes > 0)
        {
            portions.push(minutes + "m");
            duration = duration - minutes * msInMinute;
        }

        const seconds = Math.trunc(duration / 1000);
        if (seconds > 0)
        {
            portions.push(seconds + "s");
        }

        return portions.join(" ");
    }
}