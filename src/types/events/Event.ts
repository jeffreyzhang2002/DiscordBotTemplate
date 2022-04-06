import Client from "../Client";

/**
 * Base class for all events. Events must extends from this class to connect with the client
 */
export default abstract class Event{

	/**
	 * Name of the event. This should match up with DiscordJS event names
	 */
	public readonly name: string;

	/**
	 * By default this will be set to **ON** but can be changed to **ONCE**
	 * Events with mode ON will run multiple times while events with mode ONCE will run once
	 */
	public readonly mode: "on"|"once";

	/**
	 * The client this event is attached to. This value should not be modified as it is automatically
	 * initialized when registering the event to a client.
	 * @protected
	 */
	protected client!: Client;

	/**
	 * This method is run whenever the event fires. Override the execute method to change its behavior
	 */
	public readonly run: (...args: unknown[]) => unknown = this.execute.bind(this);

	/**
	 * Initializes an Event class with important information
	 * @param name the name of the event from discordJS documentation
	 * @param mode the mode of the event. Can be ON or ONCE
	 * @protected
	 */
	protected constructor(name: string, mode: "on"|"once" = "on") {
		this.name = name;
		this.mode = mode;
	}

	/**
	 * This method registers a client with the event. This method is automatically
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
	 * Abstract method that defines what occurs when the event is fired. This method should be overridden
	 * @param args Arguments that the event will receive.
	 * @protected
	 */
	protected abstract execute(...args: unknown[]) : unknown;
}
