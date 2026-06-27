export type BlogContentBlock =
	| { type: "paragraph"; text: string }
	| { type: "heading"; level: 2 | 3; text: string }
	| { type: "image"; src: string; alt: string; caption?: string }
	| { type: "quote"; text: string; author?: string }
	| { type: "list"; items: string[] };

export interface BlogAuthor {
	name: string;
	role: string;
	avatar?: string;
}

export interface BlogPost {
	slug: string;
	title: string;
	summary: string;
	coverImage: string;
	date: string;
	readTime: string;
	category: string;
	author?: BlogAuthor;
	content: BlogContentBlock[];
}
