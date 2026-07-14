import json

with open("data/blog.json", "r", encoding="utf-8") as f:
    data = json.load(f)

posts = data["posts"]
print(f"Total posts: {len(posts)}")
for i in range(27, min(35, len(posts))):
    post = posts[i]
    print(f"Index {i}: {post['slug']} -> {post['title']}")
