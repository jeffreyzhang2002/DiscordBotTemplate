import FileSystem from "fs";
import * as Path from "path";

export function getFiles(path: string, filter = (filename: string) => {return true;}): string[] {
	return getFilesRecursive(path, filter, []);
}

function getFilesRecursive(path: string, filter: (filename: string) => boolean, files: string[]): string[] {
	for(const file of FileSystem.readdirSync(path)) {
		if (FileSystem.statSync(Path.resolve(path, file)).isDirectory())
			getFilesRecursive(Path.resolve(path, file), filter, files);
		else if (filter(file))
			files.push(Path.resolve(path, file));
	}
	return files;
}
