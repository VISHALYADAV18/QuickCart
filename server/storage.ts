// This file is not used in the MongoDB implementation
// Keeping it for compatibility with the template structure
export interface IStorage {}
export class MemStorage implements IStorage {}
export const storage = new MemStorage();
