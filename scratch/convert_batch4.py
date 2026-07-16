import subprocess

files = {
    "anime_trian_cover_1784052821074.png": "anime_trian_cover.webp",
    "anime_trian_boat_1784052833848.png": "anime_trian_boat.webp",
    "anime_checklist_cover_1784052847210.png": "anime_checklist_cover.webp",
    "anime_checklist_budget_1784052860366.png": "anime_checklist_budget.webp",
    "anime_checklist_timeline_1784052875844.png": "anime_checklist_timeline.webp",
    "anime_suit_cover_1784052888693.png": "anime_suit_cover.webp"
}

artifact_dir = "/home/imtraf/.gemini/antigravity/brain/0790f9e8-a8d1-4cf5-a7c7-1541c814de49"
dest_dir = "/home/imtraf/Projects/harmony-wedding/public/images/blog"

for png, webp in files.items():
    src = f"{artifact_dir}/{png}"
    dest = f"{dest_dir}/{webp}"
    cmd = ["/home/imtraf/.local/bin/ffmpeg", "-i", src, "-y", dest]
    print(f"Converting {png} to {webp}...")
    subprocess.run(cmd)

print("Batch 4 conversions completed successfully!")
