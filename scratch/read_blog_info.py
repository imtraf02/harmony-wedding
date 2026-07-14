import json

with open('/home/imtraf/Projects/harmony-wedding/data/blog.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Total categories: {len(data['categories'])}")
print(f"Total posts: {len(data['posts'])}")

for i in range(min(9, len(data['posts']))):
    post = data['posts'][i]
    print(f"Index {i}: Slug: {post['slug']} | Title: {post['title']}")
