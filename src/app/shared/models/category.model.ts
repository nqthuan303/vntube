export class CategoryModel {
    _id: string;
    name: string;
    parent: string;
    level: number;
    description: string;
    status: number = 1;
}