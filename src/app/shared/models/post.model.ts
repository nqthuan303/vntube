export class PostModel {
    _id: string;
    title: string;
    category: string;
    shortDescription: string;
    content: string;
    image: string;
    author: string;
    status: number = 1;
}