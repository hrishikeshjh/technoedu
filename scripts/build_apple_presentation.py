#!/usr/bin/env python3
"""
Build Apple-Inspired Technical Architecture & Pitch Deck for Techno Wallah (TechnoEdu).
Generates an executive, 16:9 widescreen, 10-slide PowerPoint presentation with real software screenshots.
"""

import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def build_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5) # 16:9 Widescreen

    # Apple-Inspired Visual Design Tokens
    COLOR_WHITE = RGBColor(255, 255, 255)         # #FFFFFF (Pure White Canvas)
    COLOR_BG_CARD = RGBColor(250, 250, 250)       # #FAFAFA (Subtle Card Surface)
    COLOR_BG_HOVER = RGBColor(244, 244, 245)      # #F4F4F5 (Tag & Pill Surface)
    COLOR_TEXT_PRIMARY = RGBColor(17, 17, 17)     # #111111 (Apple Near Black)
    COLOR_TEXT_SECONDARY = RGBColor(102, 102, 102)# #666666 (Apple Secondary Grey)
    COLOR_TEXT_MUTED = RGBColor(140, 140, 145)    # #8C8C91 (Subtle Caption Grey)
    COLOR_BRAND_RED = RGBColor(220, 38, 38)       # #DC2626 (Techno Wallah Red)
    COLOR_BORDER_LIGHT = RGBColor(234, 234, 234)  # #EAEAEA (Apple Hairline Divider)
    COLOR_BORDER_STRONG = RGBColor(220, 220, 224) # #DCDCE0 (Card Border)
    COLOR_ACCENT_BLUE = RGBColor(0, 113, 227)     # #0071E3 (Apple System Blue)
    COLOR_ACCENT_GREEN = RGBColor(22, 163, 74)    # #16A34A (Apple System Green)

    FONT_DISPLAY = "SF Pro Display"
    FONT_TEXT = "SF Pro Text"
    FONT_MONO = "SF Mono"

    blank_layout = prs.slide_layouts[6] # Blank slide layout

    def set_white_bg(slide):
        bg = slide.background
        fill = bg.fill
        fill.solid()
        fill.fore_color.rgb = COLOR_WHITE

    def add_header(slide, eyebrow, title, subtitle):
        tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.40), Inches(11.733), Inches(0.98))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        # Eyebrow tag
        p0 = tf.paragraphs[0]
        p0.text = eyebrow.upper()
        p0.font.name = FONT_DISPLAY
        p0.font.size = Pt(8.5)
        p0.font.bold = True
        p0.font.color.rgb = COLOR_BRAND_RED
        p0.space_after = Pt(2)

        # Title
        p1 = tf.add_paragraph()
        p1.text = title
        p1.font.name = FONT_DISPLAY
        p1.font.size = Pt(20)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY
        p1.space_after = Pt(2)

        # Subtitle
        p2 = tf.add_paragraph()
        p2.text = subtitle
        p2.font.name = FONT_TEXT
        p2.font.size = Pt(10.5)
        p2.font.color.rgb = COLOR_TEXT_SECONDARY

        # Hairline divider line
        divider = slide.shapes.add_shape(
            MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.42), Inches(11.733), Inches(0.012)
        )
        divider.fill.solid()
        divider.fill.fore_color.rgb = COLOR_BORDER_LIGHT
        divider.line.fill.background()

    def add_footer(slide, slide_num):
        # Left branding
        tb = slide.shapes.add_textbox(Inches(0.8), Inches(7.05), Inches(8.5), Inches(0.3))
        tf = tb.text_frame
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = "TECHNO WALLAH (TECHNOEDU) • SOFTWARE ARCHITECTURE, TECHNICAL DOCUMENTATION & PITCH DECK"
        p.font.name = FONT_DISPLAY
        p.font.size = Pt(7.5)
        p.font.bold = True
        p.font.color.rgb = COLOR_TEXT_MUTED

        # Right slide number
        tb_num = slide.shapes.add_textbox(Inches(10.533), Inches(7.05), Inches(2.0), Inches(0.3))
        tf_num = tb_num.text_frame
        tf_num.margin_left = tf_num.margin_top = tf_num.margin_right = tf_num.margin_bottom = 0
        p_num = tf_num.paragraphs[0]
        p_num.text = f"{slide_num:02d} / 10"
        p_num.alignment = PP_ALIGN.RIGHT
        p_num.font.name = FONT_DISPLAY
        p_num.font.size = Pt(7.5)
        p_num.font.bold = True
        p_num.font.color.rgb = COLOR_TEXT_MUTED

    def add_card(slide, left, top, width, height, bg_color=COLOR_BG_CARD, border_color=COLOR_BORDER_LIGHT, radius_shape=MSO_SHAPE.ROUNDED_RECTANGLE):
        card = slide.shapes.add_shape(radius_shape, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        if border_color:
            card.line.color.rgb = border_color
            card.line.width = Pt(0.75)
        else:
            card.line.fill.background()
        return card

    # =========================================================================
    # SLIDE 01 — PRODUCT OVERVIEW
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_white_bg(s1)
    add_header(s1, "Academic OER Directory & Examination Resource Hub", "TECHNO WALLAH", "Everything You Need to Learn Better.")
    add_footer(s1, 1)

    # Left Column: Strategic Value Proposition
    left_card = add_card(s1, Inches(0.8), Inches(1.6), Inches(4.7), Inches(5.25), COLOR_BG_CARD, COLOR_BORDER_LIGHT)
    tb_l = s1.shapes.add_textbox(Inches(1.05), Inches(1.8), Inches(4.2), Inches(4.85))
    tf_l = tb_l.text_frame
    tf_l.word_wrap = True
    tf_l.margin_left = tf_l.margin_top = tf_l.margin_right = tf_l.margin_bottom = 0

    p = tf_l.paragraphs[0]
    p.text = "CORE VALUE PROPOSITION"
    p.font.name = FONT_DISPLAY
    p.font.size = Pt(9)
    p.font.bold = True
    p.font.color.rgb = COLOR_BRAND_RED
    p.space_after = Pt(8)

    p = tf_l.add_paragraph()
    p.text = "“One discovery layer connecting competitive examinations with structured, accessible and open learning.”"
    p.font.name = FONT_DISPLAY
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = COLOR_TEXT_PRIMARY
    p.space_after = Pt(14)

    pillars = [
        ("01", "Discover Examinations", "Unified, searchable directory of 32+ national and international competitive examinations across Civil Services, Study Abroad, and Professional Entrances."),
        ("02", "Explore Structured Roadmaps", "Topic-wise syllabus roadmaps pairing each core academic syllabus area with peer-reviewed open courses, official blueprints, and lecture series."),
        ("03", "Access Verified OER", "Direct outbound links to authentic institutional repositories: NCERT, NPTEL/SWAYAM, MIT OCW, OpenStax, and official government PYQ archives.")
    ]

    for num, heading, desc in pillars:
        p_p = tf_l.add_paragraph()
        p_p.text = f"{num}  •  {heading}"
        p_p.font.name = FONT_DISPLAY
        p_p.font.size = Pt(10)
        p_p.font.bold = True
        p_p.font.color.rgb = COLOR_TEXT_PRIMARY
        p_p.space_after = Pt(2)

        p_d = tf_l.add_paragraph()
        p_d.text = desc
        p_d.font.name = FONT_TEXT
        p_d.font.size = Pt(8.5)
        p_d.font.color.rgb = COLOR_TEXT_SECONDARY
        p_d.space_after = Pt(10)

    # Right Column: Real Software Screenshot Container
    right_card = add_card(s1, Inches(5.7), Inches(1.6), Inches(6.833), Inches(5.25), COLOR_WHITE, COLOR_BORDER_LIGHT)
    if os.path.exists("screenshots/crop_home_hero.png"):
        s1.shapes.add_picture("screenshots/crop_home_hero.png", Inches(5.82), Inches(1.72), Inches(6.593), Inches(3.6))
    
    # Bottom KPI strip on right card
    kpis = [
        ("32+", "Indexed Exams", "Govt, Abroad & Law"),
        ("100%", "Open & Free", "No Subscriptions"),
        ("9", "Flagship OERs", "NPTEL, MIT, NCERT"),
        ("0", "Server Database Lag", "Static Typed Data")
    ]
    for i, (metric, label, sub) in enumerate(kpis):
        bx = Inches(5.82 + i * 1.68)
        by = Inches(5.55)
        add_card(s1, bx, by, Inches(1.55), Inches(1.15), COLOR_BG_CARD, COLOR_BORDER_LIGHT)
        tb_m = s1.shapes.add_textbox(bx + Inches(0.1), by + Inches(0.1), Inches(1.35), Inches(0.95))
        tf_m = tb_m.text_frame
        tf_m.word_wrap = True
        tf_m.margin_left = tf_m.margin_top = tf_m.margin_right = tf_m.margin_bottom = 0

        p1 = tf_m.paragraphs[0]
        p1.text = metric
        p1.font.name = FONT_DISPLAY
        p1.font.size = Pt(14)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY

        p2 = tf_m.add_paragraph()
        p2.text = label
        p2.font.name = FONT_DISPLAY
        p2.font.size = Pt(8)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_BRAND_RED

        p3 = tf_m.add_paragraph()
        p3.text = sub
        p3.font.name = FONT_TEXT
        p3.font.size = Pt(7)
        p3.font.color.rgb = COLOR_TEXT_MUTED

    # =========================================================================
    # SLIDE 02 — THE PROBLEM & SOLUTION
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_white_bg(s2)
    add_header(s2, "Problem Statement & Educational Architecture", "Learning Resources Are Everywhere. The Roadmap Isn't.", "Resolving the fragmented preparation pipeline for competitive exam aspirants worldwide.")
    add_footer(s2, 2)

    # Left Side: The Problem (Fragmented Experience)
    card_prob = add_card(s2, Inches(0.8), Inches(1.6), Inches(5.7), Inches(5.25), COLOR_BG_CARD, COLOR_BORDER_LIGHT)
    tb_p = s2.shapes.add_textbox(Inches(1.05), Inches(1.82), Inches(5.2), Inches(4.8))
    tf_p = tb_p.text_frame
    tf_p.word_wrap = True
    tf_p.margin_left = tf_p.margin_top = tf_p.margin_right = tf_p.margin_bottom = 0

    p = tf_p.paragraphs[0]
    p.text = "THE FRAGMENTED EXPERIENCE (BEFORE)"
    p.font.name = FONT_DISPLAY
    p.font.size = Pt(9)
    p.font.bold = True
    p.font.color.rgb = COLOR_BRAND_RED
    p.space_after = Pt(6)

    p = tf_p.add_paragraph()
    p.text = "Search engines → YouTube → Textbooks → Government portals → PYQs → Multiple learning platforms."
    p.font.name = FONT_DISPLAY
    p.font.size = Pt(11.5)
    p.font.bold = True
    p.font.color.rgb = COLOR_TEXT_PRIMARY
    p.space_after = Pt(14)

    prob_steps = [
        ("Search Engines", "Overwhelmed with aggressive SEO coaching ads and commercial subscription funnels."),
        ("YouTube & Video Sites", "Scattered playlists, clickbait titles, and zero syllabus-to-lecture alignment."),
        ("Commercial Monopolies", "Aggressive paywalls charging ₹30,000 to ₹1,50,000/year for public domain syllabus prep."),
        ("Unverified PDFs", "Relying on pirated, low-quality watermarked scans with broken and missing chapters."),
        ("Government Portals", "Important notifications and PYQs buried beneath complex legacy websites.")
    ]

    for step, desc in prob_steps:
        p_s = tf_p.add_paragraph()
        p_s.text = f"✕  {step}"
        p_s.font.name = FONT_DISPLAY
        p_s.font.size = Pt(9.5)
        p_s.font.bold = True
        p_s.font.color.rgb = COLOR_BRAND_RED
        p_s.space_after = Pt(1)

        p_d = tf_p.add_paragraph()
        p_d.text = desc
        p_d.font.name = FONT_TEXT
        p_d.font.size = Pt(8.5)
        p_d.font.color.rgb = COLOR_TEXT_SECONDARY
        p_d.space_after = Pt(8)

    # Right Side: The Solution (Techno Wallah Unified Architecture)
    card_sol = add_card(s2, Inches(6.833), Inches(1.6), Inches(5.7), Inches(5.25), COLOR_WHITE, COLOR_BORDER_STRONG)
    tb_s = s2.shapes.add_textbox(Inches(7.083), Inches(1.82), Inches(5.2), Inches(4.8))
    tf_s = tb_s.text_frame
    tf_s.word_wrap = True
    tf_s.margin_left = tf_s.margin_top = tf_s.margin_right = tf_s.margin_bottom = 0

    p = tf_s.paragraphs[0]
    p.text = "THE TECHNO WALLAH PARADIGM (AFTER)"
    p.font.name = FONT_DISPLAY
    p.font.size = Pt(9)
    p.font.bold = True
    p.font.color.rgb = COLOR_ACCENT_GREEN
    p.space_after = Pt(6)

    p = tf_s.add_paragraph()
    p.text = "Student → Techno Wallah → Examination Discovery → Syllabus Mapping → Open Resources → Practice."
    p.font.name = FONT_DISPLAY
    p.font.size = Pt(11.5)
    p.font.bold = True
    p.font.color.rgb = COLOR_TEXT_PRIMARY
    p.space_after = Pt(14)

    sol_pipeline = [
        ("Student Aspirant", "Enters with a targeted career ambition (Civil Services, Abroad, Law, Banking)."),
        ("Techno Wallah Discovery Layer", "Single unified interface with real-time autocomplete across 32+ examinations."),
        ("Topic-Wise Syllabus Mapping", "Every micro-topic linked to peer-reviewed textbooks (NCERT, OpenStax, NPTEL)."),
        ("Official Outbound Gateways", "One-click access to authentic official archives (UPSC, ETS, College Board)."),
        ("Practice & Evaluation", "Verified PYQ archives and concept roadmaps without subscription barriers.")
    ]

    for step, desc in sol_pipeline:
        p_s = tf_s.add_paragraph()
        p_s.text = f"✓  {step}"
        p_s.font.name = FONT_DISPLAY
        p_s.font.size = Pt(9.5)
        p_s.font.bold = True
        p_s.font.color.rgb = COLOR_ACCENT_GREEN
        p_s.space_after = Pt(1)

        p_d = tf_s.add_paragraph()
        p_d.text = desc
        p_d.font.name = FONT_TEXT
        p_d.font.size = Pt(8.5)
        p_d.font.color.rgb = COLOR_TEXT_SECONDARY
        p_d.space_after = Pt(8)

    # =========================================================================
    # SLIDE 03 — COMPLETE SOFTWARE ARCHITECTURE
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_white_bg(s3)
    add_header(s3, "System Design & Technical Architecture", "Inside the Architecture", "A decoupled, frontend-driven, data-oriented architecture engineered for instant edge delivery.")
    add_footer(s3, 3)

    # 5 Horizontal Architecture Layers
    layers = [
        ("LAYER 1: PRESENTATION LAYER", COLOR_BG_CARD, [
            ("React 18.3.1 SPA", "Component-driven UI with concurrent rendering and client-side hydration."),
            ("TypeScript 5.7.2", "Strictly typed UI components, prop interfaces, and data models."),
            ("Tailwind CSS 3.4.16", "Utility-first design tokens, safe-area hardware insets, custom elevation."),
            ("Dual Navigation", "Desktop top bar with autocomplete search + mobile bottom thumb dock (MobileNav).")
        ]),
        ("LAYER 2: APPLICATION & ROUTING LAYER", COLOR_WHITE, [
            ("React Router v6", "Declarative client-side routing, scroll restoration to top, and 404 fallbacks."),
            ("URL Filter State", "Deep-linkable filter synchronization (?category=, ?exam=) for 100% shareability."),
            ("State & Context", "NotificationContext (toast dispatch) + ThemeContext (light/dark styling)."),
            ("Client Search Engine", "Zero-latency substring matching across examinations, syllabi, and platforms.")
        ]),
        ("LAYER 3: STATIC & EDGE DATA LAYER", COLOR_BG_CARD, [
            ("Typed Static Datasets", "Single source of truth in TypeScript: examsData.ts, platformsData.ts, studyMaterialData.ts."),
            ("Catalog Coverage", "32 Indexed Exams • 9 Flagship Platforms • 37 Curated Books • UGC-NET Hub."),
            ("Vercel Edge Functions", "Serverless Edge Function runtime (/api/blogs.ts) with CORS and native Web Crypto."),
            ("Cloudflare R2 Storage", "S3-compatible bucket (technoedu-blogs) persistence via AWS SigV4 signed requests.")
        ]),
        ("LAYER 4: EXTERNAL OPEN EDUCATIONAL RESOURCES (OER)", COLOR_WHITE, [
            ("Govt of India / IITs", "NPTEL & SWAYAM university video lectures, transcripts, and courseware."),
            ("Global Universities", "MIT OpenCourseWare (linear algebra, microeconomics) & OpenStax Rice Univ."),
            ("Foundational Books", "NCERT e-Pathshala & DIKSHA Class 6–12 official government textbooks."),
            ("Open Repositories", "Khan Academy, e-GyanKosh (IGNOU), NDLI (IIT Kharagpur), PRS India & Archive.")
        ]),
        ("LAYER 5: BUILD & DEPLOYMENT INFRASTRUCTURE", COLOR_BG_CARD, [
            ("Vite 6.0.3 Bundler", "Blazing-fast ESM dev server on port 3000; strict production builds (tsc && vite build)."),
            ("Production Bundle", "Minified zero-dependency static assets (HTML/CSS/JS) output to dist/ directory."),
            ("Vercel Global Edge CDN", "High-availability edge distribution with sub-50ms latency across worldwide nodes."),
            ("SPA Rewrites", "vercel.json configuration redirecting all client paths to /index.html with /api/* edge bypass.")
        ])
    ]

    layer_top = 1.6
    layer_height = 0.98
    gap = 0.08

    for idx, (title, bg, items) in enumerate(layers):
        y = Inches(layer_top + idx * (layer_height + gap))
        card = add_card(s3, Inches(0.8), y, Inches(11.733), Inches(layer_height), bg, COLOR_BORDER_LIGHT)

        tb_h = s3.shapes.add_textbox(Inches(0.95), y + Inches(0.06), Inches(2.6), Inches(0.85))
        tf_h = tb_h.text_frame
        tf_h.word_wrap = True
        tf_h.margin_left = tf_h.margin_top = tf_h.margin_right = tf_h.margin_bottom = 0
        p_lh = tf_h.paragraphs[0]
        p_lh.text = title
        p_lh.font.name = FONT_DISPLAY
        p_lh.font.size = Pt(8.5)
        p_lh.font.bold = True
        p_lh.font.color.rgb = COLOR_BRAND_RED

        for c_idx, (c_title, c_desc) in enumerate(items):
            cx = Inches(3.6 + c_idx * 2.18)
            tb_c = s3.shapes.add_textbox(cx, y + Inches(0.06), Inches(2.05), Inches(0.85))
            tf_c = tb_c.text_frame
            tf_c.word_wrap = True
            tf_c.margin_left = tf_c.margin_top = tf_c.margin_right = tf_c.margin_bottom = 0

            p_ct = tf_c.paragraphs[0]
            p_ct.text = c_title
            p_ct.font.name = FONT_DISPLAY
            p_ct.font.size = Pt(9.5)
            p_ct.font.bold = True
            p_ct.font.color.rgb = COLOR_TEXT_PRIMARY
            p_ct.space_after = Pt(1)

            p_cd = tf_c.add_paragraph()
            p_cd.text = c_desc
            p_cd.font.name = FONT_TEXT
            p_cd.font.size = Pt(7.5)
            p_cd.font.color.rgb = COLOR_TEXT_SECONDARY

    # =========================================================================
    # SLIDE 04 — FRONTEND & BACKEND IMPLEMENTATION
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_white_bg(s4)
    add_header(s4, "Engineering Details & Source Code Analysis", "Two Sides of the Software", "Component-driven React 18 interface paired with a zero-database static layer and serverless edge storage.")
    add_footer(s4, 4)

    # Left Column: Frontend Implementation
    card_fe = add_card(s4, Inches(0.8), Inches(1.6), Inches(5.7), Inches(5.25), COLOR_BG_CARD, COLOR_BORDER_LIGHT)
    tb_fe = s4.shapes.add_textbox(Inches(1.0), Inches(1.75), Inches(5.3), Inches(0.4))
    tf_fe = tb_fe.text_frame
    tf_fe.margin_left = tf_fe.margin_top = tf_fe.margin_right = tf_fe.margin_bottom = 0
    p = tf_fe.paragraphs[0]
    p.text = "FRONTEND IMPLEMENTATION • REACT 18 + TYPESCRIPT 5.7"
    p.font.name = FONT_DISPLAY
    p.font.size = Pt(9)
    p.font.bold = True
    p.font.color.rgb = COLOR_BRAND_RED

    # Two real UI thumbnails side-by-side
    if os.path.exists("screenshots/thumb_directory.png") and os.path.exists("screenshots/thumb_library.png"):
        s4.shapes.add_picture("screenshots/thumb_directory.png", Inches(1.0), Inches(2.15), Inches(2.6), Inches(1.85))
        s4.shapes.add_picture("screenshots/thumb_library.png", Inches(3.7), Inches(2.15), Inches(2.6), Inches(1.85))

    tb_feb = s4.shapes.add_textbox(Inches(1.0), Inches(4.15), Inches(5.3), Inches(2.55))
    tf_feb = tb_feb.text_frame
    tf_feb.word_wrap = True
    tf_feb.margin_left = tf_feb.margin_top = tf_feb.margin_right = tf_feb.margin_bottom = 0

    fe_specs = [
        ("React + TypeScript", "Strict type safety across all components, interfaces, and props."),
        ("Component-Driven Architecture", "Modular hierarchy (components/common, home, layout, ugc-net, blog)."),
        ("Responsive Design", "Dual navigation with desktop search and mobile bottom app dock (MobileNav)."),
        ("React Router v6", "Declarative client routing with URL-synced search and category filters (?category=)."),
        ("Tailwind CSS", "Utility-first design tokens, safe-area hardware insets, custom layered shadows."),
        ("Lucide React Icons", "Crisp SVG iconography paired with hand-crafted exam emblems (Ashoka, Crests).")
    ]
    for i, (title, desc) in enumerate(fe_specs):
        p_t = tf_feb.paragraphs[0] if i == 0 else tf_feb.add_paragraph()
        p_t.text = f"•  {title}: "
        p_t.font.name = FONT_DISPLAY
        p_t.font.size = Pt(8)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_TEXT_PRIMARY

        run = p_t.add_run()
        run.text = desc
        run.font.name = FONT_TEXT
        run.font.size = Pt(8)
        run.font.bold = False
        run.font.color.rgb = COLOR_TEXT_SECONDARY
        p_t.space_after = Pt(3)

    # Right Column: Backend & Data Implementation
    card_be = add_card(s4, Inches(6.833), Inches(1.6), Inches(5.7), Inches(5.25), COLOR_BG_CARD, COLOR_BORDER_LIGHT)
    tb_be = s4.shapes.add_textbox(Inches(7.033), Inches(1.75), Inches(5.3), Inches(0.4))
    tf_be = tb_be.text_frame
    tf_be.margin_left = tf_be.margin_top = tf_be.margin_right = tf_be.margin_bottom = 0
    p = tf_be.paragraphs[0]
    p.text = "BACKEND & DATA LAYER • STATIC DATASETS + EDGE RUNTIME"
    p.font.name = FONT_DISPLAY
    p.font.size = Pt(9)
    p.font.bold = True
    p.font.color.rgb = COLOR_BRAND_RED

    # Real Code screenshot preview
    if os.path.exists("screenshots/code_api_blogs.png"):
        s4.shapes.add_picture("screenshots/code_api_blogs.png", Inches(7.033), Inches(2.15), Inches(5.3), Inches(1.85))

    tb_beb = s4.shapes.add_textbox(Inches(7.033), Inches(4.15), Inches(5.3), Inches(2.55))
    tf_beb = tb_beb.text_frame
    tf_beb.word_wrap = True
    tf_beb.margin_left = tf_beb.margin_top = tf_beb.margin_right = tf_beb.margin_bottom = 0

    be_specs = [
        ("Static Data Architecture", "Core catalog in typed TS files (examsData.ts, etc.) — zero SQL/DB latency."),
        ("Vercel Serverless Edge Runtime", "api/blogs.ts handler for GET/POST/OPTIONS with strict CORS and edge execution."),
        ("Cloudflare R2 Object Storage", "Zero-egress S3 bucket (technoedu-blogs) persistence via AWS SigV4 signed requests."),
        ("Native Web Crypto Signing", "HMAC-SHA256 and SHA-256 via crypto.subtle eliminates heavy external AWS SDKs."),
        ("Production Deployment Rewrites", "vercel.json forwards /api/* to edge functions and catches all SPA routes to index.html."),
        ("Build Verification Pipeline", "npm run build runs tsc before vite build, guaranteeing compile-time type safety.")
    ]
    for i, (title, desc) in enumerate(be_specs):
        p_t = tf_beb.paragraphs[0] if i == 0 else tf_beb.add_paragraph()
        p_t.text = f"•  {title}: "
        p_t.font.name = FONT_DISPLAY
        p_t.font.size = Pt(8)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_TEXT_PRIMARY

        run = p_t.add_run()
        run.text = desc
        run.font.name = FONT_TEXT
        run.font.size = Pt(8)
        run.font.bold = False
        run.font.color.rgb = COLOR_TEXT_SECONDARY
        p_t.space_after = Pt(3)

    # =========================================================================
    # SLIDE 05 — COMPLETE NAVIGATION MAP
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_white_bg(s5)
    add_header(s5, "Information Architecture & Routing Hierarchy", "One Interface. Multiple Learning Pathways.", "Complete sitemap and verified route table derived directly from App.tsx and layout components.")
    add_footer(s5, 5)

    # Top visual: Actual Navbar crop with Search
    if os.path.exists("screenshots/crop_navbar_search.png"):
        card_nav = add_card(s5, Inches(0.8), Inches(1.58), Inches(11.733), Inches(1.35), COLOR_WHITE, COLOR_BORDER_LIGHT)
        s5.shapes.add_picture("screenshots/crop_navbar_search.png", Inches(0.9), Inches(1.65), Inches(11.533), Inches(1.2))

    route_sections = [
        ("DISCOVERY & ROADMAPS", [
            ("/", "Landing Page", "Hero section, live KPI strip, category tabs, featured platforms & library spotlight."),
            ("/exams", "Examination Directory", "Filter by stream (Govt, Abroad, Law) with instant keyword search across 32 exams."),
            ("/exams/:id", "Exam Detail Dossier", "Topic-wise open roadmap, syllabus highlights, official portal links, recommended books."),
            ("/directory", "Complete Directory", "Lightweight directory listing examinations by region (West Bengal, All India, Global).")
        ]),
        ("SPECIALIZED HUBS", [
            ("/exams/ugc-net", "UGC-NET Master Hub", "Comprehensive portal for UGC-NET & JRF (Paper 1 10-unit syllabus + 83 Paper 2 domains)."),
            ("/library", "Open Study Material", "Curated catalog of 37+ open textbooks and PYQ archives across 7 material categories."),
            ("/platforms", "Platforms Directory", "Profiles for 9 flagship open learning repositories (NPTEL, MIT OCW, NCERT, OpenStax)."),
            ("/blogs", "Academic Blog Hub", "Peer-reviewed articles, exam strategies, and community academic contributions.")
        ]),
        ("CONTRIBUTION & COMMUNITY", [
            ("/blogs/contribute", "Community Authoring", "Markdown editor and submission workflow for student and educator blog articles."),
            ("/blogs/:slug", "Blog Detail View", "Full article reader with author credentials, reading time estimate, and topic tags."),
            ("/about", "Mission & Manifesto", "Platform principles, non-commercial pledge, and Open Educational Guarantee."),
            ("GitHub /pr", "Open Source Pipeline", "Transparent PR contribution workflow for adding exams, syllabi, and OER links.")
        ]),
        ("LEGAL & ROUTE ALIASES", [
            ("/privacy-policy", "Privacy Policy", "Zero third-party trackers, zero data monetization, privacy-first commitment."),
            ("/terms & /cookies", "Terms & Cookies", "Academic usage rights, Open Educational Resource attribution policies."),
            ("/accessibility", "Accessibility (a11y)", "WCAG 2.1 guidelines, high-contrast palette, 44px minimum touch targets."),
            ("Redirects", "Legacy Aliases", "/practice → /exams, /study-material → /library, /courses → /exams.")
        ])
    ]

    col_w = Inches(2.78)
    col_gap = Inches(0.2)
    start_x = Inches(0.8)
    card_y = Inches(3.05)
    card_h = Inches(3.8)

    for c_i, (section_title, routes) in enumerate(route_sections):
        cx = start_x + c_i * (col_w + col_gap)
        c_card = add_card(s5, cx, card_y, col_w, card_h, COLOR_BG_CARD, COLOR_BORDER_LIGHT)

        tb = s5.shapes.add_textbox(cx + Inches(0.12), card_y + Inches(0.15), col_w - Inches(0.24), card_h - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = section_title
        p0.font.name = FONT_DISPLAY
        p0.font.size = Pt(8.5)
        p0.font.bold = True
        p0.font.color.rgb = COLOR_BRAND_RED
        p0.space_after = Pt(8)

        for path, name, desc in routes:
            p_p = tf.add_paragraph()
            p_p.text = f"{path} • {name}"
            p_p.font.name = FONT_DISPLAY
            p_p.font.size = Pt(8.5)
            p_p.font.bold = True
            p_p.font.color.rgb = COLOR_TEXT_PRIMARY
            p_p.space_after = Pt(1)

            p_d = tf.add_paragraph()
            p_d.text = desc
            p_d.font.name = FONT_TEXT
            p_d.font.size = Pt(7.5)
            p_d.font.color.rgb = COLOR_TEXT_SECONDARY
            p_d.space_after = Pt(6)

    # =========================================================================
    # SLIDE 06 — EXAMINATION ECOSYSTEM
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_white_bg(s6)
    add_header(s6, "Comprehensive Academic & Entrance Coverage", "One Platform. Multiple Examination Pathways.", "32 verified competitive examinations catalogued across 3 primary academic and professional streams.")
    add_footer(s6, 6)

    exam_streams = [
        ("GOVERNMENT & CIVIL SERVICES (14 EXAMS)", COLOR_BRAND_RED, [
            ("UPSC Civil Services (CSE)", "UPSC CSE", "upsc.gov.in", "IAS, IPS, IFS flagship civil service"),
            ("West Bengal Civil Services", "WBCS", "psc.wb.gov.in", "State civil services executive cadre"),
            ("SSC CGL & CHSL", "SSC CGL", "ssc.gov.in", "Central ministries & administrative posts"),
            ("Banking PO & Clerk", "IBPS / SBI", "ibps.in", "Probationary officers, clerk & RBI"),
            ("Railways RRB NTPC & Group D", "RRB NTPC", "rrbapply.gov.in", "Non-technical popular categories"),
            ("Defence (CDS / NDA / AFCAT)", "Defence", "upsc.gov.in", "Armed forces officer commission"),
            ("Teaching (CTET / WB TET)", "Teaching", "ctet.nic.in", "National & state teacher eligibility"),
            ("UGC-NET & JRF (83 Subjects)", "UGC-NET", "ugcnet.nta.ac.in", "Assistant professor & PhD fellowship"),
            ("WB Police (Constable / SI)", "WB Police", "prb.wb.gov.in", "State police executive cadres"),
            ("WBPSC Clerkship & Misc", "WBPSC", "psc.wb.gov.in", "State clerical & supervisory posts"),
            ("WBHRB Staff Recruitment", "WBHRB", "wbhrb.in", "State medical & health boards"),
            ("SSC JE (Junior Engineer)", "SSC JE", "ssc.gov.in", "Civil, Electrical & Mechanical"),
            ("EPFO SSA & EO", "EPFO", "upsc.gov.in", "Enforcement & accounts officers"),
            ("LIC AAO & Insurance", "LIC / GIC", "licindia.in", "Assistant administrative officers")
        ]),
        ("STUDY ABROAD & GLOBAL TESTS (9 EXAMS)", COLOR_ACCENT_BLUE, [
            ("GRE General Test", "GRE", "ets.org/gre", "Global MS/PhD graduate school entrance"),
            ("GMAT Focus Edition", "GMAT Focus", "mba.com", "Premier global MBA admission test"),
            ("IELTS Academic & General", "IELTS", "ielts.idp.com", "English language proficiency benchmark"),
            ("TOEFL iBT", "TOEFL", "ets.org/toefl", "ETS university English proficiency"),
            ("Digital SAT", "SAT", "collegeboard.org", "US undergraduate admissions test"),
            ("PTE Academic", "PTE", "pearsonpte.com", "Computer-based academic English test"),
            ("Duolingo English Test", "DET", "englishtest.duolingo.com", "Online language proficiency benchmark"),
            ("ACT American College Testing", "ACT", "act.org", "US college readiness evaluation"),
            ("LSAT Law School Admission", "LSAT", "lsac.org", "US & Canada JD law school entrance")
        ]),
        ("LAW & MANAGEMENT ENTRANCES (9 EXAMS)", COLOR_ACCENT_GREEN, [
            ("CLAT UG & PG", "CLAT", "consortiumofnlus.ac.in", "National Law Universities admission"),
            ("CAT (Common Admission Test)", "CAT", "iimcat.ac.in", "IIMs & top management institutes"),
            ("CUET UG / PG", "CUET", "cuet.nta.nic.in", "Central universities common entrance"),
            ("AILET (NLU Delhi)", "AILET", "nludelhi.ac.in", "All India Law Entrance Test"),
            ("SLAT (Symbiosis Law)", "SLAT", "set-test.org", "Symbiosis Law Schools admission"),
            ("XAT (Xavier Aptitude Test)", "XAT", "xatonline.in", "XLRI Jamshedpur & top B-schools"),
            ("SNAP (Symbiosis National)", "SNAP", "snaptest.org", "Symbiosis management institutes"),
            ("NMAT by GMAC", "NMAT", "mba.com/nmat", "NMIMS & international B-schools"),
            ("NIFT Entrance Examination", "NIFT", "nift.ac.in", "Fashion technology & design careers")
        ])
    ]

    col_w = Inches(3.75)
    col_gap = Inches(0.24)
    start_x = Inches(0.8)
    card_y = Inches(1.6)
    card_h = Inches(5.25)

    for c_i, (stream_title, stream_color, exams) in enumerate(exam_streams):
        cx = start_x + c_i * (col_w + col_gap)
        c_card = add_card(s6, cx, card_y, col_w, card_h, COLOR_BG_CARD, COLOR_BORDER_LIGHT)

        tb = s6.shapes.add_textbox(cx + Inches(0.18), card_y + Inches(0.15), col_w - Inches(0.36), card_h - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = stream_title
        p0.font.name = FONT_DISPLAY
        p0.font.size = Pt(8.5)
        p0.font.bold = True
        p0.font.color.rgb = stream_color
        p0.space_after = Pt(8)

        for name, code, domain, desc in exams:
            p_e = tf.add_paragraph()
            p_e.text = f"{name} "
            p_e.font.name = FONT_DISPLAY
            p_e.font.size = Pt(8.5)
            p_e.font.bold = True
            p_e.font.color.rgb = COLOR_TEXT_PRIMARY

            r_code = p_e.add_run()
            r_code.text = f"[{code}]"
            r_code.font.name = FONT_DISPLAY
            r_code.font.size = Pt(7.5)
            r_code.font.bold = True
            r_code.font.color.rgb = stream_color

            p_d = tf.add_paragraph()
            p_d.text = f"{desc} • {domain}"
            p_d.font.name = FONT_TEXT
            p_d.font.size = Pt(7.5)
            p_d.font.color.rgb = COLOR_TEXT_MUTED
            p_d.space_after = Pt(4)

    # =========================================================================
    # SLIDE 07 — EXAM SYLLABUS & LEARNING FOCUS
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    set_white_bg(s7)
    add_header(s7, "Syllabus Breakdown & Topic-Wise Roadmaps", "Every Examination Has a Learning Roadmap.", "Distinguishing official syllabus scope from concrete, verified Open Educational Resource (OER) mappings.")
    add_footer(s7, 7)

    clusters = [
        ("CIVIL SERVICES & STATE PSC", "UPSC CSE • WBCS • SSC CGL • BANKING", [
            ("UPSC CSE (Civil Services)", "Prelims GS-1 (Polity, History, Economy, Geography, Environment, Science), CSAT (Math/Logic/RC), Mains GS 1–4, Ethics & Essays.", "NCERT Class 6–12, NPTEL Constitutional Law, PRS Legislative Research, e-GyanKosh Public Admin."),
            ("WBCS (West Bengal Civil Services)", "Indian History & National Movement, Geography of India & WB, Indian Polity & Economy, General Science, English Composition, WB Affairs.", "Banglar Shiksha WB Board Textbooks, NCERT History/Polity, MoEFCC Reports."),
            ("SSC CGL & CHSL", "Quantitative Aptitude, General Intelligence & Reasoning, English Comprehension, General Awareness.", "OpenStax Algebra, NCERT General Science, Khan Academy Grammar."),
            ("Banking PO & Clerk (IBPS/SBI)", "Quantitative Aptitude, Reasoning Ability, English Language, Banking & Financial Awareness, Data Interpretation.", "RBI Monetary Policy Handbooks, NPTEL Decision Sciences, OpenStax Statistics.")
        ]),
        ("GRADUATE & INTERNATIONAL ADMISSIONS", "GRE • GMAT • DIGITAL SAT • CAT", [
            ("GRE General Test", "Quantitative Reasoning (Algebra, Arithmetic, Geometry, Data Analysis), Verbal Reasoning (Text Completion, SE, RC), Analytical Writing.", "OpenStax College Algebra 2e, ETS Official Math Review, Classic Public Domain Literature."),
            ("GMAT Focus Edition", "Quantitative Reasoning (Problem Solving), Verbal Reasoning (Critical Reasoning, RC), Data Insights (Multi-Source, Table, Graphic, Two-Part).", "OpenStax Statistics, Khan Academy Mastery Math, NPTEL Quantitative Decision Methods."),
            ("Digital SAT", "Reading and Writing (Craft & Structure, Information & Ideas), Mathematics (Algebra, Advanced Math, Problem Solving, Geometry).", "College Board Official Bluebook Tests, Khan Academy Official SAT Course, OpenStax Precalculus."),
            ("CAT (Common Admission Test)", "Verbal Ability & Reading Comprehension (VARC), Data Interpretation & Logical Reasoning (DILR), Quantitative Ability (QA).", "MIT OpenCourseWare Microeconomics, OpenStax Calculus/Algebra, Open Case Studies.")
        ]),
        ("LANGUAGE & LAW ENTRANCES", "IELTS • TOEFL • CLAT • CUET", [
            ("IELTS Academic & General", "Listening (Conversations & Academic Lectures), Reading (Complex Passages), Writing (Tasks 1 & 2), Speaking Fluency.", "BBC Learning English Pronunciation/Grammar, Open Etymology Compendium, Official Sample Tests."),
            ("TOEFL iBT", "Reading (Academic Texts), Listening (Lectures/Discussions), Speaking (Campus Scenarios), Writing for Academic Discussion.", "ETS Official Sample Sets, Open English Grammar Handbooks, Voice/Pronunciation Guides."),
            ("CLAT (Common Law Admission)", "English Language, Current Affairs & GK, Legal Reasoning, Logical Reasoning, Quantitative Techniques.", "Indian Kanoon Landmark Verdicts, Legislative.gov.in Constitution Bare Act, PRS Reports."),
            ("CUET UG / PG", "Section 1A/1B (Language Proficiency), Section 2 (Domain Subjects: 33+ Subjects), Section 3 (General Aptitude Test).", "NCERT Class 12 Domain Textbooks (Micro/Macroeconomics, History, Physics, Biology).")
        ]),
        ("NATIONAL ELIGIBILITY & ACADEMICS", "UGC-NET / JRF • DEFENCE • RAILWAYS", [
            ("UGC-NET & JRF (Paper 1)", "10 Units: Teaching Aptitude, Research Aptitude, Reading Comprehension, Communication, Mathematical Reasoning, Logic, DI, ICT, Environment, Higher Education.", "UGC-NET Master Hub (technoedu), NPTEL Research Methodology, e-GyanKosh Higher Ed."),
            ("UGC-NET (Paper 2 Domains)", "87 Subject Domains (Computer Science, Commerce, Economics, History, English Literature, Law, Sociology, Education).", "NPTEL Core Engineering/CS, OpenStax Economics/Management, e-GyanKosh Law."),
            ("Defence (NDA / CDS / AFCAT)", "Elementary Mathematics, English Comprehension, General Knowledge (Physics, Chemistry, History, Geography).", "NCERT Class 10–12 Science, NCERT History/Polity, OpenStax Physics Volume 1."),
            ("Railways RRB NTPC & Group D", "Mathematics, General Intelligence & Reasoning, General Awareness, General Science.", "NCERT General Science, OpenStax College Algebra, Open Railway PYQ Archives.")
        ])
    ]

    card_w = Inches(5.7)
    card_h = Inches(2.55)
    positions = [
        (Inches(0.8), Inches(1.6)),
        (Inches(6.833), Inches(1.6)),
        (Inches(0.8), Inches(4.3)),
        (Inches(6.833), Inches(4.3))
    ]

    for idx, (cluster_title, cluster_sub, items) in enumerate(clusters):
        x, y = positions[idx]
        card = add_card(s7, x, y, card_w, card_h, COLOR_BG_CARD, COLOR_BORDER_LIGHT)

        tb = s7.shapes.add_textbox(x + Inches(0.18), y + Inches(0.12), card_w - Inches(0.36), card_h - Inches(0.24))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = f"{cluster_title}  •  {cluster_sub}"
        p0.font.name = FONT_DISPLAY
        p0.font.size = Pt(8.5)
        p0.font.bold = True
        p0.font.color.rgb = COLOR_BRAND_RED
        p0.space_after = Pt(4)

        for name, syllabus, mapping in items:
            p_n = tf.add_paragraph()
            p_n.text = f"•  {name}: "
            p_n.font.name = FONT_DISPLAY
            p_n.font.size = Pt(8)
            p_n.font.bold = True
            p_n.font.color.rgb = COLOR_TEXT_PRIMARY

            r_s = p_n.add_run()
            r_s.text = f"{syllabus} "
            r_s.font.name = FONT_TEXT
            r_s.font.size = Pt(7.5)
            r_s.font.bold = False
            r_s.font.color.rgb = COLOR_TEXT_SECONDARY

            r_m = p_n.add_run()
            r_m.text = f"[OER: {mapping}]"
            r_m.font.name = FONT_TEXT
            r_m.font.size = Pt(7.5)
            r_m.font.bold = True
            r_m.font.color.rgb = COLOR_BRAND_RED
            p_n.space_after = Pt(2)

    # =========================================================================
    # SLIDE 08 — THE STUDENT JOURNEY
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    set_white_bg(s8)
    add_header(s8, "User Experience & Pedagogical Pathway", "From Examination Discovery to Actual Learning.", "An eight-stage continuous user journey connecting search to authenticated open learning.")
    add_footer(s8, 8)

    workflow_steps = [
        ("01", "LAND", "Homepage Search", "Aspirant lands on clean homepage; accesses global search with autocomplete across 32 exams."),
        ("02", "DISCOVER", "Exam Directory", "Filters examinations by stream (Govt, Abroad, Law & Entrance) with live keyword search."),
        ("03", "SELECT", "Examination Detail", "Opens targeted dossier (e.g., UPSC CSE, GRE General) with custom vector emblem and badge."),
        ("04", "UNDERSTAND", "Syllabus Blueprint", "Inspects structured syllabus highlights, popular topics, and official examination portals."),
        ("05", "ACCESS", "Mapped OER Links", "Selects topic-wise open learning roadmap (NPTEL lecture, NCERT chapter, OpenStax book)."),
        ("06", "LEARN", "External Repositories", "Launches verified outbound institutional portal with one tap (100% free, no paywall)."),
        ("07", "PRACTICE", "PYQ Archives", "Solves authentic previous-year question papers with official scoring rubrics and answers."),
        ("08", "REVIEW", "Study Library", "Reinforces concepts using formula sheets, revision summaries, and vocabulary compendiums.")
    ]

    step_w = Inches(2.78)
    step_h = Inches(1.35)
    step_gap = Inches(0.2)

    for i, (num, stage, title, desc) in enumerate(workflow_steps[:4]):
        sx = Inches(0.8 + i * (step_w + step_gap))
        sy = Inches(1.6)
        card = add_card(s8, sx, sy, step_w, step_h, COLOR_BG_CARD, COLOR_BORDER_LIGHT)

        tb = s8.shapes.add_textbox(sx + Inches(0.12), sy + Inches(0.08), step_w - Inches(0.24), step_h - Inches(0.16))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = f"{num}  •  {stage}"
        p0.font.name = FONT_DISPLAY
        p0.font.size = Pt(8.5)
        p0.font.bold = True
        p0.font.color.rgb = COLOR_BRAND_RED
        p0.space_after = Pt(1)

        p1 = tf.add_paragraph()
        p1.text = title
        p1.font.name = FONT_DISPLAY
        p1.font.size = Pt(9.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY
        p1.space_after = Pt(1)

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.name = FONT_TEXT
        p2.font.size = Pt(7.5)
        p2.font.color.rgb = COLOR_TEXT_SECONDARY

    for i, (num, stage, title, desc) in enumerate(workflow_steps[4:]):
        sx = Inches(0.8 + i * (step_w + step_gap))
        sy = Inches(3.05)
        card = add_card(s8, sx, sy, step_w, step_h, COLOR_BG_CARD, COLOR_BORDER_LIGHT)

        tb = s8.shapes.add_textbox(sx + Inches(0.12), sy + Inches(0.08), step_w - Inches(0.24), step_h - Inches(0.16))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p0 = tf.paragraphs[0]
        p0.text = f"{num}  •  {stage}"
        p0.font.name = FONT_DISPLAY
        p0.font.size = Pt(8.5)
        p0.font.bold = True
        p0.font.color.rgb = COLOR_BRAND_RED
        p0.space_after = Pt(1)

        p1 = tf.add_paragraph()
        p1.text = title
        p1.font.name = FONT_DISPLAY
        p1.font.size = Pt(9.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_PRIMARY
        p1.space_after = Pt(1)

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.name = FONT_TEXT
        p2.font.size = Pt(7.5)
        p2.font.color.rgb = COLOR_TEXT_SECONDARY

    # Bottom Half: Real UI Visual Evidence Strip
    card_vis = add_card(s8, Inches(0.8), Inches(4.55), Inches(11.733), Inches(2.35), COLOR_WHITE, COLOR_BORDER_LIGHT)
    tb_vt = s8.shapes.add_textbox(Inches(1.0), Inches(4.62), Inches(11.333), Inches(0.25))
    tf_vt = tb_vt.text_frame
    tf_vt.margin_left = tf_vt.margin_top = tf_vt.margin_right = tf_vt.margin_bottom = 0
    p = tf_vt.paragraphs[0]
    p.text = "REAL-WORLD APPLICATION WORKFLOW EVIDENCE (AUTHENTIC SCREENSHOTS)"
    p.font.name = FONT_DISPLAY
    p.font.size = Pt(8)
    p.font.bold = True
    p.font.color.rgb = COLOR_BRAND_RED

    screens = [
        ("thumb_home.png", "Stage 01: Landing & Search", Inches(1.0)),
        ("thumb_directory.png", "Stage 02: Exam Filtering", Inches(3.9)),
        ("thumb_detail.png", "Stage 04: Topic Roadmaps", Inches(6.8)),
        ("thumb_library.png", "Stage 08: Material Dossiers", Inches(9.7))
    ]

    for img_name, label, left_pos in screens:
        path = os.path.join("screenshots", img_name)
        if os.path.exists(path):
            s8.shapes.add_picture(path, left_pos, Inches(4.9), Inches(2.6), Inches(1.5))
            tb_l = s8.shapes.add_textbox(left_pos, Inches(6.45), Inches(2.6), Inches(0.3))
            tf_l = tb_l.text_frame
            tf_l.margin_left = tf_l.margin_top = tf_l.margin_right = tf_l.margin_bottom = 0
            p = tf_l.paragraphs[0]
            p.text = label
            p.font.name = FONT_DISPLAY
            p.font.size = Pt(7.5)
            p.font.bold = True
            p.font.color.rgb = COLOR_TEXT_PRIMARY

    # =========================================================================
    # SLIDE 09 — TECHNOLOGY, DEPLOYMENT & OPEN ECOSYSTEM
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    set_white_bg(s9)
    add_header(s9, "Deployment Pipeline & Open Repository Partnerships", "Built for Open, Accessible Learning.", "Production-grade web stack, zero-database scaling velocity, and verified global OER partnerships.")
    add_footer(s9, 9)

    col_w = Inches(3.75)
    col_gap = Inches(0.24)
    start_x = Inches(0.8)
    card_y = Inches(1.6)
    card_h = Inches(5.25)

    # Pillar 1: Verified Tech Stack
    card1 = add_card(s9, start_x, card_y, col_w, card_h, COLOR_BG_CARD, COLOR_BORDER_LIGHT)
    tb1 = s9.shapes.add_textbox(start_x + Inches(0.18), card_y + Inches(0.18), col_w - Inches(0.36), card_h - Inches(0.36))
    tf1 = tb1.text_frame
    tf1.word_wrap = True
    tf1.margin_left = tf1.margin_top = tf1.margin_right = tf1.margin_bottom = 0

    p = tf1.paragraphs[0]
    p.text = "VERIFIED TECHNOLOGY STACK"
    p.font.name = FONT_DISPLAY
    p.font.size = Pt(8.5)
    p.font.bold = True
    p.font.color.rgb = COLOR_BRAND_RED
    p.space_after = Pt(10)

    stack_items = [
        ("React 18.3.1", "Core framework with Concurrent Rendering, Suspense boundaries, and zero-runtime component abstraction."),
        ("TypeScript 5.7.2", "Strict typing across all data interfaces (ExamInfo, StudyMaterialItem, LearningPlatformInfo)."),
        ("Vite 6.0.3", "Next-generation ESM development server (port 3000) and optimized Rollup production bundler."),
        ("Tailwind CSS 3.4.16", "Utility-first design tokens, safe-area hardware insets, custom elevation, and zero CSS bloat."),
        ("React Router 6.28.0", "Declarative client-side routing, URL query parameter syncing, and scroll restoration."),
        ("Lucide React 1.16.0", "Clean, accessible SVG iconography paired with custom hand-drawn exam emblems.")
    ]

    for name, desc in stack_items:
        p_n = tf1.add_paragraph()
        p_n.text = f"•  {name}"
        p_n.font.name = FONT_DISPLAY
        p_n.font.size = Pt(9)
        p_n.font.bold = True
        p_n.font.color.rgb = COLOR_TEXT_PRIMARY
        p_n.space_after = Pt(1)

        p_d = tf1.add_paragraph()
        p_d.text = desc
        p_d.font.name = FONT_TEXT
        p_d.font.size = Pt(7.5)
        p_d.font.color.rgb = COLOR_TEXT_SECONDARY
        p_d.space_after = Pt(6)

    # Pillar 2: Deployment & Serverless Edge
    x2 = start_x + col_w + col_gap
    card2 = add_card(s9, x2, card_y, col_w, card_h, COLOR_WHITE, COLOR_BORDER_LIGHT)
    tb2 = s9.shapes.add_textbox(x2 + Inches(0.18), card_y + Inches(0.18), col_w - Inches(0.36), card_h - Inches(0.36))
    tf2 = tb2.text_frame
    tf2.word_wrap = True
    tf2.margin_left = tf2.margin_top = tf2.margin_right = tf2.margin_bottom = 0

    p = tf2.paragraphs[0]
    p.text = "DEPLOYMENT & EDGE STORAGE PIPELINE"
    p.font.name = FONT_DISPLAY
    p.font.size = Pt(8.5)
    p.font.bold = True
    p.font.color.rgb = COLOR_BRAND_RED
    p.space_after = Pt(10)

    pipe_items = [
        ("Vite Build & Type-Check", "Build script tsc && vite build enforces 100% type safety before generating dist/ bundle."),
        ("Vercel Edge Global Hosting", "Pre-configured for continuous deployment from GitHub with zero-config edge CDN caching."),
        ("SPA Rewrite Architecture", "vercel.json rewrites all incoming routes to /index.html, ensuring deep links never 404."),
        ("Serverless Edge Function", "Lightweight /api/blogs handler running on Edge runtime with native Web Crypto Subtle."),
        ("Cloudflare R2 Object Storage", "Zero-egress S3-compatible bucket (technoedu-blogs) persisting community blog submissions."),
        ("AWS SigV4 Authentication", "Clientless crypto signing eliminates heavy AWS SDK dependencies from production.")
    ]

    for name, desc in pipe_items:
        p_n = tf2.add_paragraph()
        p_n.text = f"•  {name}"
        p_n.font.name = FONT_DISPLAY
        p_n.font.size = Pt(9)
        p_n.font.bold = True
        p_n.font.color.rgb = COLOR_TEXT_PRIMARY
        p_n.space_after = Pt(1)

        p_d = tf2.add_paragraph()
        p_d.text = desc
        p_d.font.name = FONT_TEXT
        p_d.font.size = Pt(7.5)
        p_d.font.color.rgb = COLOR_TEXT_SECONDARY
        p_d.space_after = Pt(6)

    # Pillar 3: Open Ecosystem & Contribution
    x3 = start_x + 2 * (col_w + col_gap)
    card3 = add_card(s9, x3, card_y, col_w, card_h, COLOR_BG_CARD, COLOR_BORDER_LIGHT)
    tb3 = s9.shapes.add_textbox(x3 + Inches(0.18), card_y + Inches(0.18), col_w - Inches(0.36), card_h - Inches(0.36))
    tf3 = tb3.text_frame
    tf3.word_wrap = True
    tf3.margin_left = tf3.margin_top = tf3.margin_right = tf3.margin_bottom = 0

    p = tf3.paragraphs[0]
    p.text = "INDEXED OERs & OPEN CONTRIBUTION"
    p.font.name = FONT_DISPLAY
    p.font.size = Pt(8.5)
    p.font.bold = True
    p.font.color.rgb = COLOR_BRAND_RED
    p.space_after = Pt(10)

    eco_items = [
        ("NPTEL & SWAYAM (Govt)", "100% free university lecture video archives and assignment question banks."),
        ("MIT OpenCourseWare (MIT)", "Full course notes, syllabus plans, and problem sets under Creative Commons."),
        ("NCERT e-Pathshala & DIKSHA", "Class 6 to 12 national standard foundational textbooks across history, polity, science."),
        ("OpenStax (Rice University)", "Peer-reviewed, openly licensed college textbooks (Algebra, Statistics, Economics)."),
        ("Khan Academy & Internet Archive", "Mastery learning modules, SAT partner courseware, and public domain classics."),
        ("GitHub Contribution Model", "Students and faculty can submit PRs to expand exam mappings, verify links, and seed OERs.")
    ]

    for name, desc in eco_items:
        p_n = tf3.add_paragraph()
        p_n.text = f"•  {name}"
        p_n.font.name = FONT_DISPLAY
        p_n.font.size = Pt(9)
        p_n.font.bold = True
        p_n.font.color.rgb = COLOR_TEXT_PRIMARY
        p_n.space_after = Pt(1)

        p_d = tf3.add_paragraph()
        p_d.text = desc
        p_d.font.name = FONT_TEXT
        p_d.font.size = Pt(7.5)
        p_d.font.color.rgb = COLOR_TEXT_SECONDARY
        p_d.space_after = Pt(6)

    # =========================================================================
    # SLIDE 10 — CLOSING / VISION
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    set_white_bg(s10)
    add_header(s10, "Platform Manifesto & Strategic Vision", "Knowledge Should Be Open. Discovery Should Be Simple.", "Removing subscription paywalls and fragmented preparation pipelines for students everywhere.")
    add_footer(s10, 10)

    # Left Column: Strategic Manifesto & Product Loop
    card_v1 = add_card(s10, Inches(0.8), Inches(1.6), Inches(6.0), Inches(5.25), COLOR_BG_CARD, COLOR_BORDER_LIGHT)
    tb_v1 = s10.shapes.add_textbox(Inches(1.05), Inches(1.82), Inches(5.5), Inches(4.8))
    tf_v1 = tb_v1.text_frame
    tf_v1.word_wrap = True
    tf_v1.margin_left = tf_v1.margin_top = tf_v1.margin_right = tf_v1.margin_bottom = 0

    p = tf_v1.paragraphs[0]
    p.text = "THE OPEN KNOWLEDGE MANIFESTO"
    p.font.name = FONT_DISPLAY
    p.font.size = Pt(9)
    p.font.bold = True
    p.font.color.rgb = COLOR_BRAND_RED
    p.space_after = Pt(6)

    p = tf_v1.add_paragraph()
    p.text = "“Making high-quality educational resources easier to discover, navigate and access — without unnecessary subscription barriers.”"
    p.font.name = FONT_DISPLAY
    p.font.size = Pt(13.5)
    p.font.bold = True
    p.font.color.rgb = COLOR_TEXT_PRIMARY
    p.space_after = Pt(12)

    p_loop = tf_v1.add_paragraph()
    p_loop.text = "THE CONTINUOUS LEARNING LOOP"
    p_loop.font.name = FONT_DISPLAY
    p_loop.font.size = Pt(8.5)
    p_loop.font.bold = True
    p_loop.font.color.rgb = COLOR_BRAND_RED
    p_loop.space_after = Pt(6)

    loop_stages = [
        ("DISCOVER", "Locate target examinations through indexed stream directories and instant search."),
        ("EXPLORE", "Navigate structured syllabus highlights, blueprints, and topic-wise roadmaps."),
        ("LEARN", "Study directly from peer-reviewed university textbooks and official lectures."),
        ("PRACTICE", "Solve authentic government PYQ question papers and concept questions."),
        ("IMPROVE", "Review performance with formula handbooks and specialized master hubs.")
    ]

    for stage, desc in loop_stages:
        p_st = tf_v1.add_paragraph()
        p_st.text = f"{stage}  →  "
        p_st.font.name = FONT_DISPLAY
        p_st.font.size = Pt(9)
        p_st.font.bold = True
        p_st.font.color.rgb = COLOR_TEXT_PRIMARY

        r_sd = p_st.add_run()
        r_sd.text = desc
        r_sd.font.name = FONT_TEXT
        r_sd.font.size = Pt(8)
        r_sd.font.bold = False
        r_sd.font.color.rgb = COLOR_TEXT_SECONDARY
        p_st.space_after = Pt(4)

    # Right Column: Visual Showcase & Official Credentials
    card_v2 = add_card(s10, Inches(7.0), Inches(1.6), Inches(5.533), Inches(5.25), COLOR_WHITE, COLOR_BORDER_LIGHT)
    if os.path.exists("screenshots/crop_home_hero.png"):
        s10.shapes.add_picture("screenshots/crop_home_hero.png", Inches(7.18), Inches(1.78), Inches(5.173), Inches(2.9))

    tb_end = s10.shapes.add_textbox(Inches(7.18), Inches(4.8), Inches(5.173), Inches(1.9))
    tf_end = tb_end.text_frame
    tf_end.word_wrap = True
    tf_end.margin_left = tf_end.margin_top = tf_end.margin_right = tf_end.margin_bottom = 0

    p = tf_end.paragraphs[0]
    p.text = "OFFICIAL PRODUCTION & REPOSITORY ENDPOINTS"
    p.font.name = FONT_DISPLAY
    p.font.size = Pt(8.5)
    p.font.bold = True
    p.font.color.rgb = COLOR_BRAND_RED
    p.space_after = Pt(4)

    p_web = tf_end.add_paragraph()
    p_web.text = "Live Web Application: "
    p_web.font.name = FONT_DISPLAY
    p_web.font.size = Pt(9)
    p_web.font.bold = True
    p_web.font.color.rgb = COLOR_TEXT_PRIMARY

    r_w = p_web.add_run()
    r_w.text = "https://technoedu-wheat.vercel.app/"
    r_w.font.name = FONT_TEXT
    r_w.font.size = Pt(9)
    r_w.font.color.rgb = COLOR_ACCENT_BLUE

    p_git = tf_end.add_paragraph()
    p_git.text = "Source Code Repository: "
    p_git.font.name = FONT_DISPLAY
    p_git.font.size = Pt(9)
    p_git.font.bold = True
    p_git.font.color.rgb = COLOR_TEXT_PRIMARY

    r_g = p_git.add_run()
    r_g.text = "https://github.com/hrishikeshjh/technoedu"
    r_g.font.name = FONT_TEXT
    r_g.font.size = Pt(9)
    r_g.font.color.rgb = COLOR_ACCENT_BLUE
    p_git.space_after = Pt(8)

    p_brand = tf_end.add_paragraph()
    p_brand.text = "TECHNO WALLAH"
    p_brand.font.name = FONT_DISPLAY
    p_brand.font.size = Pt(16)
    p_brand.font.bold = True
    p_brand.font.color.rgb = COLOR_BRAND_RED

    p_tag = tf_end.add_paragraph()
    p_tag.text = "Everything You Need to Learn Better."
    p_tag.font.name = FONT_TEXT
    p_tag.font.size = Pt(10)
    p_tag.font.bold = True
    p_tag.font.color.rgb = COLOR_TEXT_SECONDARY

    # Save presentations
    output_filename = "TechnoWallah_Architecture_and_Pitch_Deck.pptx"
    prs.save(output_filename)
    prs.save(os.path.join("technoedu", output_filename))
    print(f"Presentation saved successfully to {output_filename} and technoedu/{output_filename}")

if __name__ == "__main__":
    build_presentation()
