#!/usr/bin/env python3
"""Download Fluent UI 3D emoji PNGs into public/emoji (local filenames)."""
from __future__ import annotations

import ssl
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "emoji"
BASE = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets"

# Local filename -> path under assets/ (folder/3D/file.png)
# Folder names must match repo exactly (case-sensitive).
ASSETS: dict[str, str] = {
    "bolt.png": "High voltage/3D/high_voltage_3d.png",
    "magic_wand.png": "Magic wand/3D/magic_wand_3d.png",
    "direct_hit.png": "Bullseye/3D/bullseye_3d.png",
    "shield.png": "Shield/3D/shield_3d.png",
    # Fluent repo uses "Pen" for writing instrument (Writing hand asset path varies by release)
    "writing_hand.png": "Pen/3D/pen_3d.png",
    "outbox_tray.png": "Outbox tray/3D/outbox_tray_3d.png",
    "sparkles.png": "Sparkles/3D/sparkles_3d.png",
    "game_die.png": "Game die/3D/game_die_3d.png",
    "robot.png": "Robot/3D/robot_3d.png",
    "bar_chart.png": "Bar chart/3D/bar_chart_3d.png",
    "counterclockwise_arrows.png": "Counterclockwise arrows button/3D/counterclockwise_arrows_button_3d.png",
    "memo.png": "Memo/3D/memo_3d.png",
    "bust_in_silhouette.png": "Bust in silhouette/3D/bust_in_silhouette_3d.png",
    "briefcase.png": "Briefcase/3D/briefcase_3d.png",
    "light_bulb.png": "Light bulb/3D/light_bulb_3d.png",
    "magnifying_glass.png": "Magnifying glass tilted left/3D/magnifying_glass_tilted_left_3d.png",
    "page_facing_up.png": "Page facing up/3D/page_facing_up_3d.png",
    "rocket.png": "Rocket/3D/rocket_3d.png",
    "check_mark_button.png": "Check mark button/3D/check_mark_button_3d.png",
    "warning.png": "Warning/3D/warning_3d.png",
    "star.png": "Star/3D/star_3d.png",
    "envelope.png": "Envelope/3D/envelope_3d.png",
    "round_pushpin.png": "Round pushpin/3D/round_pushpin_3d.png",
    "one_oclock.png": "One oclock/3D/one_oclock_3d.png",
    "speech_balloon.png": "Speech balloon/3D/speech_balloon_3d.png",
    "credit_card.png": "Credit card/3D/credit_card_3d.png",
    "inbox_tray.png": "Inbox tray/3D/inbox_tray_3d.png",
    "gear.png": "Gear/3D/gear_3d.png",
    "confused_face.png": "Confused face/3D/confused_face_3d.png",
    "eye.png": "Eye/3D/eye_3d.png",
    "hourglass_done.png": "Hourglass done/3D/hourglass_done_3d.png",
    "chart_increasing.png": "Chart increasing/3D/chart_increasing_3d.png",
    "information.png": "Information/3D/information_3d.png",
    "red_circle.png": "Red circle/3D/red_circle_3d.png",
    # ATS module / category extras (Fluent 3D)
    "straight_ruler.png": "Straight ruler/3D/straight_ruler_3d.png",
    "card_index.png": "Card index/3D/card_index_3d.png",
    "flexed_biceps.png": "Flexed biceps/Default/3D/flexed_biceps_3d_default.png",
    "books.png": "Books/3D/books_3d.png",
    "clockwise_vertical_arrows.png": "Clockwise vertical arrows/3D/clockwise_vertical_arrows_3d.png",
    "bookmark_tabs.png": "Bookmark tabs/3D/bookmark_tabs_3d.png",
    "hammer_and_wrench.png": "Hammer and wrench/3D/hammer_and_wrench_3d.png",
    "handshake.png": "Handshake/3D/handshake_3d.png",
    "puzzle_piece.png": "Puzzle piece/3D/puzzle_piece_3d.png",
    "calendar.png": "Calendar/3D/calendar_3d.png",
    "file_folder.png": "File folder/3D/file_folder_3d.png",
    "open_book.png": "Open book/3D/open_book_3d.png",
    "bubbles.png": "Bubbles/3D/bubbles_3d.png",
    "building_construction.png": "Building construction/3D/building_construction_3d.png",
    "cross_mark.png": "Cross mark/3D/cross_mark_3d.png",
    "clipboard.png": "Clipboard/3D/clipboard_3d.png",
    "locked.png": "Locked/3D/locked_3d.png",
}


def fetch(url: str) -> bytes:
    ctx = ssl.create_default_context()
    req = urllib.request.Request(url, headers={"User-Agent": "resugrow-emoji-fetch/1.0"})
    with urllib.request.urlopen(req, context=ctx, timeout=60) as resp:
        return resp.read()


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    failed: list[tuple[str, str, int]] = []
    for local_name, rel in ASSETS.items():
        parts = rel.split("/")
        encoded = "/".join(urllib.parse.quote(p, safe="") for p in parts)
        url = f"{BASE}/{encoded}"
        dest = OUT / local_name
        try:
            data = fetch(url)
            dest.write_bytes(data)
            print(f"OK {local_name} ({len(data)} bytes)")
        except urllib.error.HTTPError as e:
            print(f"FAIL {local_name} HTTP {e.code} {url}")
            failed.append((local_name, url, e.code))
    if failed:
        raise SystemExit(f"{len(failed)} download(s) failed")


if __name__ == "__main__":
    main()
