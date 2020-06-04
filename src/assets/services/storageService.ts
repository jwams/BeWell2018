import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

export class StorageService {
	constructor() {}
	
	async set(key: string, value: any): Promise<void> {
		console.log("key" + key);
		console.log("value" + value);
	  await Storage.set({
		key: key,
		value: value
	  });
	}

	async get(key: string): Promise<any> {
	  const item = await Storage.get({ key: key });
	  return item.value;
	}

	async remove(key: string): Promise<void> {
	  await Storage.remove({
		key: key
	  });
	}
}