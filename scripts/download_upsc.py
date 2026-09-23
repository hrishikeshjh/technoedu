#!/usr/bin/env python3
import os
import sys
import time
import urllib.request

UPSC_FILES = [
    # 2024
    {
        "url": "https://www.upsc.gov.in/sites/default/files/QP-CSP-24-GENERAL-STUDIES-PAPER-I-180624.pdf",
        "path": "public/materials/upsc/2024/2024_GS_1.pdf",
        "name": "2024 Prelims GS Paper 1"
    },
    {
        "url": "https://www.upsc.gov.in/sites/default/files/QP-CSP-24-GENERAL-STUDIES-PAPER-II-180624.pdf",
        "path": "public/materials/upsc/2024/2024_CSAT_2.pdf",
        "name": "2024 Prelims CSAT Paper 2"
    },
    {
        "url": "https://www.upsc.gov.in/sites/default/files/QP_CSM_2024_ESSAY_03102024.pdf",
        "path": "public/materials/upsc/2024/2024_Mains_Essay.pdf",
        "name": "2024 Mains Essay"
    },
    {
        "url": "https://www.upsc.gov.in/sites/default/files/QP_CSM_2024_GenStud_I_03102024.pdf",
        "path": "public/materials/upsc/2024/2024_Mains_GS1.pdf",
        "name": "2024 Mains GS 1"
    },
    {
        "url": "https://www.upsc.gov.in/sites/default/files/QP_CSM_2024_GenStud_II_03102024.pdf",
        "path": "public/materials/upsc/2024/2024_Mains_GS2.pdf",
        "name": "2024 Mains GS 2"
    },
    {
        "url": "https://www.upsc.gov.in/sites/default/files/QP_CSM_2024_GenStud_III_03102024.pdf",
        "path": "public/materials/upsc/2024/2024_Mains_GS3.pdf",
        "name": "2024 Mains GS 3"
    },
    {
        "url": "https://www.upsc.gov.in/sites/default/files/QP_CSM_2024_GenStud_IV_03102024.pdf",
        "path": "public/materials/upsc/2024/2024_Mains_GS4.pdf",
        "name": "2024 Mains GS 4"
    },
    # 2023
    {
        "url": "https://www.upsc.gov.in/sites/default/files/QP_CS_Pre_Exam_2023_280523.pdf",
        "path": "public/materials/upsc/2023/2023_GS_1.pdf",
        "name": "2023 Prelims GS Paper 1"
    },
    {
        "url": "https://www.upsc.gov.in/sites/default/files/QP_CS_Pre_Exam_2023_GENERAL_STUDIES_PAPER_II_280523.pdf",
        "path": "public/materials/upsc/2023/2023_CSAT_2.pdf",
        "name": "2023 Prelims CSAT Paper 2"
    },
    {
        "url": "https://www.upsc.gov.in/sites/default/files/QP-CSM-23-ESSAY-180923.pdf",
        "path": "public/materials/upsc/2023/2023_Mains_Essay.pdf",
        "name": "2023 Mains Essay"
    },
    {
        "url": "https://www.upsc.gov.in/sites/default/files/QP-CSM-23-GENERAL-STUDIES-PAPER-I-180923.pdf",
        "path": "public/materials/upsc/2023/2023_Mains_GS1.pdf",
        "name": "2023 Mains GS 1"
    },
    {
        "url": "https://www.upsc.gov.in/sites/default/files/QP-CSM-23-GENERAL-STUDIES-PAPER-II-180923.pdf",
        "path": "public/materials/upsc/2023/2023_Mains_GS2.pdf",
        "name": "2023 Mains GS 2"
    },
    {
        "url": "https://www.upsc.gov.in/sites/default/files/QP-CSM-23-GENERAL-STUDIES-PAPER-III-180923.pdf",
        "path": "public/materials/upsc/2023/2023_Mains_GS3.pdf",
        "name": "2023 Mains GS 3"
    },
    {
        "url": "https://www.upsc.gov.in/sites/default/files/QP-CSM-23-GENERAL-STUDIES-PAPER-IV-180923.pdf",
        "path": "public/materials/upsc/2023/2023_Mains_GS4.pdf",
        "name": "2023 Mains GS 4"
    },
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "application/pdf,*/*",
    "Referer": "https://www.upsc.gov.in/examinations/previous-question-papers",
}

def download_file(item):
    url = item["url"]
    dest = item["path"]
    name = item["name"]
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    temp_dest = dest + ".tmp"
    
    print(f"\n📥 Fetching {name}...")
    print(f"   URL: {url}")
    
    for attempt in range(1, 6):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            
            # Check existing temp file for resume
            start_byte = 0
            if os.path.exists(temp_dest):
                start_byte = os.path.getsize(temp_dest)
                if start_byte > 0:
                    req.add_header("Range", f"bytes={start_byte}-")
            
            with urllib.request.urlopen(req, timeout=30) as resp:
                mode = "ab" if start_byte > 0 and resp.status == 206 else "wb"
                if mode == "wb":
                    start_byte = 0
                
                content_len = resp.headers.get("Content-Length")
                total_size = int(content_len) + start_byte if content_len else None
                
                with open(temp_dest, mode) as out:
                    downloaded = start_byte
                    while True:
                        chunk = resp.read(128 * 1024)
                        if not chunk:
                            break
                        out.write(chunk)
                        downloaded += len(chunk)
                        if total_size:
                            pct = (downloaded / total_size) * 100
                            sys.stdout.write(f"\r   Progress: {downloaded / 1024 / 1024:.1f} MB / {total_size / 1024 / 1024:.1f} MB ({pct:.0f}%)")
                        else:
                            sys.stdout.write(f"\r   Downloaded: {downloaded / 1024 / 1024:.1f} MB")
                        sys.stdout.flush()
            
            # Check magic bytes
            with open(temp_dest, "rb") as f:
                header = f.read(5)
                if header.startswith(b"%PDF"):
                    os.replace(temp_dest, dest)
                    size_mb = os.path.getsize(dest) / 1024 / 1024
                    print(f"\n   ✅ Verified authentic PDF! ({size_mb:.2f} MB)")
                    return True
                else:
                    print(f"\n   ⚠️ Not a PDF (header: {header[:10]}). Retrying...")
                    if os.path.exists(temp_dest):
                        os.remove(temp_dest)
        except Exception as e:
            print(f"\n   ⚠️ Attempt {attempt} failed: {e}")
            time.sleep(2)
            
    return False

def main():
    success_count = 0
    for item in UPSC_FILES:
        ok = download_file(item)
        if ok:
            success_count += 1
        else:
            print(f"   ❌ FAILED to download {item['name']}")
            
    print(f"\n════════════════════════════════════════════════")
    print(f"Summary: {success_count} / {len(UPSC_FILES)} verified PDFs ready.")
    if success_count < len(UPSC_FILES):
        sys.exit(1)

if __name__ == "__main__":
    main()
