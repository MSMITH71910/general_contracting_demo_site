# Apex Build & Remodel — Demo Website

A professional, **10-page general contracting demo website** for **Apex Build & Remodel** (Cleveland, OH). Built as a static HTML/CSS/JS site showcasing an AI estimate chatbot, online estimate request form with follow-up automation, Google review request system, and a filterable project portfolio gallery.

> **Demo Site** — All credentials, reviews, and contact information are fictional and for demonstration purposes only.

---

## Live Features

### AI Estimate Chatbot — "Max"
- 24/7 floating chat widget available on every page
- Covers 15+ conversation paths: kitchen, bathroom, room addition, roofing, new build, commercial, pricing, timeline, licensing, portfolio, contact, warranty, and reviews
- Quick-reply buttons for fast, guided conversations
- Budget ranges provided for every service type
- Routes urgent leads to Tyler Holt within 1 hour (simulated)

### Online Estimate Request Form
- 8 project type selectors (visual card UI)
- Budget range, timeline, and description fields
- Simulates Make.com PDF quote template generation on submission
- Confirmation modal with full follow-up sequence preview

### Estimate Follow-Up Sequence (3-Day Non-Response)
- **Day 0:** PDF quote emailed + Make.com confirmation triggered
- **Day 1:** Personal call from Tyler Holt
- **Day 3:** Follow-up email with budget-friendly alternative option
- **Day 7:** Final check-in — "No pressure, we're here when you're ready"

### Google Review Request Automation
- Automated SMS + email triggered 2 weeks after project completion
- Personalized message from Tyler with client name and project details
- Demo modal on every page via "Leave a Review" button

### Project Portfolio Gallery
- 15 project cards across 6 categories
- Live category filtering: All / Kitchen / Bathroom / Addition / Exterior / Commercial / New Build
- Hover overlay with project name and key details

---

## Pages (10 Total)

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, services overview, build process, featured projects, testimonials, review request |
| Services | `services.html` | All 9 services with descriptions and pricing, financing options |
| Portfolio | `portfolio.html` | 15-photo filterable gallery by project category |
| Free Estimate | `estimate.html` | Project type selector, full form, follow-up sequence preview |
| Kitchen Remodeling | `kitchen.html` | Kitchen services, 3-tier package pricing, featured kitchen projects |
| Bathroom Remodeling | `bathroom.html` | Bathroom services, 3-tier package pricing, featured bathroom projects |
| Room Additions | `additions.html` | Addition types, what's included, featured addition projects |
| About | `about.html` | Tyler Holt bio, team roster, credentials, certifications |
| Reviews | `testimonials.html` | 9 client testimonials, review stats, automated review request system |
| Contact | `contact.html` | General contact form, direct call CTA, service area map |

---

## Fake Credentials (Demo Only)

| Field | Value |
|-------|-------|
| Company | Apex Build & Remodel |
| Owner | Tyler Holt |
| Title | Owner & Master Contractor |
| Founded | 2011 |
| Phone | (555) 386-4700 |
| Email | tyler@apexbuildremodel.com |
| Address | 5200 Commerce Pkwy, Suite 100, Cleveland, OH 44130 |
| License | OH-GC-381927 |
| Insurance | $2M General Liability |
| Rating | 4.8/5 — 2,400+ Google Reviews |
| Projects | 850+ completed |
| Crew | 24 full-time tradespeople |

---

## Team (Fictional)

| Name | Role |
|------|------|
| Tyler Holt | Owner & Master Contractor |
| Brad Sullivan | Senior Project Manager |
| Maria Santos | Interior Design Consultant |
| Kevin Torres | Lead Carpenter & Framer |
| Chris Walton | Commercial Division Lead |
| Denise Park | Client Relations Manager |

---

## Design System

| Token | Value |
|-------|-------|
| Primary (Charcoal) | `#1c1e22` |
| Accent (Orange) | `#f97316` |
| Background (Cream) | `#fafaf8` |
| Success (Green) | `#16a34a` |
| Heading Font | Oswald (Google Fonts) |
| Body Font | Inter (Google Fonts) |
| Icons | Font Awesome 6 |
| Photos | Unsplash (royalty-free) |

---

## File Structure

```
general-contracting-site/
├── index.html          # Home
├── services.html       # All services + financing
├── portfolio.html      # Filterable photo gallery
├── estimate.html       # Estimate request form + follow-up sequence
├── kitchen.html        # Kitchen remodeling detail + packages
├── bathroom.html       # Bathroom remodeling detail + packages
├── additions.html      # Room additions detail + gallery
├── about.html          # Tyler Holt bio + team + credentials
├── testimonials.html   # 9 reviews + automated review request
├── contact.html        # Contact form + direct call CTA
├── css/
│   └── style.css       # Full responsive stylesheet
├── js/
│   └── main.js         # Chatbot, portfolio filter, forms, modals
└── README.md
```

---

## Customization Guide

### Change Contractor Info
Search across all HTML files for `Tyler Holt`, `(555) 386-4700`, `Apex Build & Remodel`, and `OH-GC-381927` to replace with real credentials.

### Update Colors
Edit CSS variables at the top of `css/style.css`:
```css
:root {
  --charcoal: #1c1e22;
  --orange: #f97316;
  --cream: #fafaf8;
}
```

### Update Portfolio Photos
In `portfolio.html`, replace the Unsplash image `src` URLs with your actual project photos. Update `data-cat` to match your filter categories.

### Connect Real Integrations

| Feature | Integration Needed |
|---------|-------------------|
| Estimate form | Formspree, EmailJS, or backend API |
| Owner SMS alert | Twilio |
| PDF quote template | Make.com → Carbone or DocuPilot |
| Chatbot AI | OpenAI GPT-4 API |
| Review automation | Twilio + SendGrid (2-week delay trigger) |
| Follow-up sequence | Make.com or HubSpot |

---

## Tech Stack

- **HTML5** — Semantic markup, accessible structure
- **CSS3** — Custom properties, CSS Grid, Flexbox, IntersectionObserver animations
- **Vanilla JavaScript** — No frameworks, no build tools required
- **Font Awesome 6** — Icon library via CDN
- **Google Fonts** — Oswald + Inter via CDN
- **Unsplash** — Royalty-free project photography

---

## Deployment

This is a static site — deploy to any static hosting provider:

```bash
# GitHub Pages
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/MSMITH71910/general_contracting_demo_site.git
git push -u origin main

# Enable GitHub Pages in repo Settings → Pages → Deploy from main branch
```

Other options: Netlify (drag & drop), Vercel, Cloudflare Pages.

---

*Built as a demo by Zencoder AI. All names, numbers, projects, and reviews are fictional.*
