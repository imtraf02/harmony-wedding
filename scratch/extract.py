import json
import os

os.makedirs('/home/imtraf/Projects/harmony-wedding/scratch', exist_ok=True)
with open('/home/imtraf/Projects/harmony-wedding/data/blog.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

posts = data['posts']
extracted = posts[9:18]

print(f"Extracted {len(extracted)} posts.")
for i, p in enumerate(extracted):
    print(f"Index {9+i}: {p['slug']} - {p['title']}")

with open('/home/imtraf/Projects/harmony-wedding/scratch/posts_group_b_original.json', 'w', encoding='utf-8') as f:
    json.dump(extracted, f, ensure_ascii=False, indent=2)
