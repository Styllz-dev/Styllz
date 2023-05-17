import { ClothesColorCombine } from "./clothes-color-combine.model";

export class Prompt {
    id?: number;
    type?: number;
    image?: File;
    clothes?: ClothesColorCombine[];
    details?: string;
    results?: string[];
    error?: string;
}
