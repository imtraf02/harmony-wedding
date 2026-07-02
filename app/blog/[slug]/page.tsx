import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ReadingProgressBar } from "@/components/blog/reading-progress";
import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { blogPosts } from "@/constants/blog";
import { siteConfig } from "@/lib/config";

interface BlogPostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export function generateStaticParams() {
	return blogPosts.map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = blogPosts.find((p) => p.slug === slug);

	if (!post) {
		return {
			title: "Bài Viết Không Tồn Tại | Harmony Wedding",
		};
	}

	return {
		title: `${post.title} - Cẩm Nang Cưới`,
		description: post.summary,
		alternates: {
			canonical: `/blog/${slug}`,
		},
		openGraph: {
			title: `${post.title} | Harmony Wedding`,
			description: post.summary,
			url: `/blog/${slug}`,
			type: "article",
			publishedTime: post.date.split("/").reverse().join("-"),
			authors: [post.author?.name || siteConfig.name],
			images: [
				{
					url: post.coverImage,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
		},
	};
}

export async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	const post = blogPosts.find((p) => p.slug === slug);

	if (!post) {
		notFound();
	}

	// Related posts (excluding current post)
	const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

	// Article Schema.org Markup
	const articleJsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${siteConfig.url}/blog/${post.slug}`,
		},
		headline: post.title,
		description: post.summary,
		image: `${siteConfig.url}${post.coverImage}`,
		datePublished: post.date.split("/").reverse().join("-"),
		author: {
			"@type": "Person",
			name: post.author?.name || siteConfig.name,
		},
		publisher: {
			"@type": "Organization",
			name: siteConfig.name,
			logo: {
				"@type": "ImageObject",
				url: `${siteConfig.url}/logo.png`,
			},
		},
	};

	return (
		<main className="min-h-screen bg-white text-black">
			<Header variant="solid" />
			<ReadingProgressBar />

			<BreadcrumbJsonLd
				items={[
					{ name: "Trang Chủ", href: "/" },
					{ name: "Cẩm Nang Cưới", href: "/blog" },
					{ name: post.title, href: `/blog/${post.slug}` },
				]}
			/>
			<JsonLd data={articleJsonLd} />

			{/* Article Content Section */}
			<article className="mx-auto max-w-[800px] px-5 pt-[11.5rem] pb-24 md:px-8 md:pt-56 md:pb-32">
				{/* Article Meta */}
				<header className="mb-10 text-center md:mb-14">
					<span className="inline-block rounded-full bg-neutral-50 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-widest text-neutral-500">
						{post.category}
					</span>
					<h1 className="mt-4 font-serif text-3xl font-light leading-tight tracking-wide text-neutral-900 md:text-4xl lg:text-5xl">
						{post.title}
					</h1>
					<div className="mt-6 flex items-center justify-center gap-3 text-xs text-neutral-400">
						<span>{post.date}</span>
						<span className="size-1 rounded-full bg-neutral-300" />
						<span>{post.readTime}</span>
					</div>
				</header>

				{/* Cover Image */}
				<div className="relative mb-12 w-full overflow-hidden border border-neutral-100 bg-neutral-50 flex items-center justify-center">
					<img
						src={post.coverImage}
						alt={post.title}
						className="max-h-[550px] w-auto object-contain"
					/>
				</div>

				{/* Rich Text Body */}
				<div className="mx-auto max-w-[700px] text-[0.98rem] leading-relaxed text-neutral-700">
					{post.content.map((block, index) => {
						switch (block.type) {
							case "paragraph":
								return (
									<p key={index} className="mb-6 font-sans whitespace-pre-line">
										{parseMarkdownLinks(block.text)}
									</p>
								);
							case "heading":
								const HeadingTag = block.level === 2 ? "h2" : "h3";
								return (
									<HeadingTag
										key={index}
										className={`font-serif tracking-tight text-neutral-900 ${
											block.level === 2
												? "mt-12 mb-5 border-l-2 border-black pl-4 text-2xl font-light"
												: "mt-8 mb-4 text-xl font-normal"
										}`}
									>
										{block.text}
									</HeadingTag>
								);
							case "quote":
								return (
									<blockquote
										key={index}
										className="my-10 border-l-3 border-neutral-300 bg-neutral-50 py-5 pl-6 pr-4 italic text-neutral-600"
									>
										<p className="text-lg leading-relaxed">
											&ldquo;{block.text}&rdquo;
										</p>
									</blockquote>
								);
							case "list":
								return (
									<ul
										key={index}
										className="list-disc pl-6 mb-6 space-y-3 text-neutral-700"
									>
										{block.items.map((item, itemIdx) => (
											<li key={itemIdx}>{parseMarkdownLinks(item)}</li>
										))}
									</ul>
								);
							case "image":
								return (
									<figure key={index} className="my-10 text-center">
										<div className="relative w-full overflow-hidden border border-neutral-100 bg-neutral-50 flex items-center justify-center">
											<img
												src={block.src}
												alt={block.alt}
												className="max-h-[500px] w-auto object-contain"
											/>
										</div>
										{block.caption && (
											<figcaption className="mt-3 text-xs tracking-wide text-neutral-400">
												{block.caption}
											</figcaption>
										)}
									</figure>
								);
							default:
								return null;
						}
					})}
				</div>

				{/* Related Posts */}
				{relatedPosts.length > 0 && (
					<footer className="mt-20 border-t border-neutral-100 pt-16">
						<h2 className="text-center font-serif text-2xl font-light tracking-wide text-neutral-900">
							Bài Viết Liên Quan
						</h2>
						<div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
							{relatedPosts.map((rPost) => (
								<article
									key={rPost.slug}
									className="group flex flex-col justify-between border border-neutral-100 bg-white shadow-xs transition-all duration-300 hover:shadow-md"
								>
									<div>
										<div className="relative aspect-3/2 w-full overflow-hidden">
											<Image
												src={rPost.coverImage}
												alt={rPost.title}
												fill
												sizes="(min-width: 768px) 25vw, 50vw"
												className="object-cover transition-transform duration-500 group-hover:scale-103"
											/>
										</div>
										<div className="p-4">
											<span className="text-[0.62rem] font-bold uppercase tracking-widest text-neutral-400">
												{rPost.category}
											</span>
											<h3 className="mt-1 font-serif text-[1rem] font-medium leading-snug text-neutral-900 group-hover:text-neutral-600 transition-colors line-clamp-2">
												<Link href={`/blog/${rPost.slug}`}>
													{rPost.title}
												</Link>
											</h3>
										</div>
									</div>
									<div className="flex items-center justify-between border-t border-neutral-100 px-4 py-3 text-[0.65rem] text-neutral-400">
										<span>{rPost.date}</span>
										<Link
											href={`/blog/${rPost.slug}`}
											className="font-semibold uppercase tracking-wider text-black group-hover:underline"
										>
											Đọc bài
										</Link>
									</div>
								</article>
							))}
						</div>
					</footer>
				)}
			</article>

			<Footer />
		</main>
	);
}

function parseMarkdownLinks(text: string) {
	const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
	const parts = [];
	let lastIndex = 0;
	let match;

	while ((match = regex.exec(text)) !== null) {
		const [fullMatch, linkText, url] = match;
		const matchIndex = match.index;

		if (matchIndex > lastIndex) {
			parts.push(text.substring(lastIndex, matchIndex));
		}

		parts.push(
			<a
				key={matchIndex}
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="text-neutral-900 underline hover:text-neutral-600 transition-colors"
			>
				{linkText}
			</a>
		);

		lastIndex = regex.lastIndex;
	}

	if (lastIndex < text.length) {
		parts.push(text.substring(lastIndex));
	}

	return parts.length > 0 ? parts : text;
}

export default BlogPostPage;
