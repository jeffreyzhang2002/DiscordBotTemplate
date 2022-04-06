export default class CommandBuilder
{
	public name: string;
	public permission: boolean;
	public type: "USER"|"MESSAGE";

	constructor(name: string, type: "USER"|"MESSAGE", permission = true) {
		if(!name.length || name.length > 32) {
			throw `${name} does not meet standards!. Length of name must be between 1 and 32`;
		}

		this.name = name;
		this.permission = permission;
		this.type = type;
	}

	setName(name: string) {
		if(!name.length || name.length > 32) {
			throw `${name} does not meet standards!. Length of name must be between 1 and 32`;
		}
		this.name = name;
		return this;
	}

	setDefaultPermission(permission: boolean) {
		this.permission = permission;
		return this;
	}

	setType(type: "USER"|"MESSAGE") {
		this.type = type;
		return this;
	}

	toJSON() : Record<string, unknown>{
		return {
			type: this.type,
			name: this.name,
			description: "",
			default_permission: this.permission,
			options: []
		};
	}
}

