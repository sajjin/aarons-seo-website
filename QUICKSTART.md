# 🚀 Quick Start Guide

## What You Have Now

A complete, modular individual project pages system with:
- ✅ Beautiful scroll animations
- ✅ Fully responsive design
- ✅ All data in JSON (no code changes needed)
- ✅ 7 pre-loaded projects with sample data
- ✅ Multiple route options (static & dynamic)

## Files Created

```
📁 app/
├── 📁 data/
│   └── 📄 individualProjects.json          ← All project data here!
├── 📁 projects/
│   ├── 📄 indivprojects.tsx                ← Main component
│   ├── 📄 indivprojects.module.css         ← All styles & animations
│   ├── 📁 baja/
│   │   └── 📄 page.tsx                     ← Example: Baja page
│   ├── 📁 2007-sti/
│   │   └── 📄 page.tsx                     ← Example: 2007 STI page
│   └── 📁 [id]/
│       └── 📄 page.tsx                     ← Dynamic route (any project)
└── 📁 components/
    └── 📄 EnhancedProjectsSection.tsx      ← Links to individual projects

📄 SYSTEM_SUMMARY.md                        ← Complete overview
📄 INDIVIDUAL_PROJECTS_README.md            ← Usage guide
📄 PROJECT_ROUTES.md                        ← Route reference
📄 ARCHITECTURE.md                          ← Visual diagrams
📄 ANIMATION_GUIDE.md                       ← Animation customization
📄 QUICKSTART.md                            ← This file!
```

## How to Use Right Now

### Option 1: View Examples

Visit these URLs to see the system in action:

```
http://localhost:3000/projects/baja
http://localhost:3000/projects/2007-sti
http://localhost:3000/projects/2006-subaru-baja
```

### Option 2: Add Your Own Project (5 Minutes)

1. **Edit the JSON file** (`app/data/individualProjects.json`):
   ```json
   {
     "id": "my-awesome-car",
     "title": "My Awesome Car",
     "subtitle": "Built for Speed",
     "heroImage": "/assets/img/your-image.jpg",
     "sections": [
       {
         "id": "overview",
         "heading": "Build Overview",
         "text": "This car is amazing because...",
         "image": "/assets/img/section1.jpg",
         "layout": "image-left"
       }
     ],
     "specs": {
       "engine": "V8",
       "horsepower": "500 HP"
     },
     "link": "https://yourblog.com/build-story"
   }
   ```

2. **Create a page** (optional - or just use dynamic route):
   ```bash
   # Create folder
   mkdir app/projects/my-car
   
   # Create page.tsx
   # Copy from baja/page.tsx and change projectId
   ```

3. **Visit your page**:
   ```
   http://localhost:3000/projects/my-awesome-car
   ```

Done! 🎉

## Understanding the Structure

### JSON Data Format

```json
{
  "id": "unique-id",              ← Used in URL: /projects/unique-id
  "title": "Main Title",          ← Shows in hero section
  "subtitle": "Subtitle",         ← Shows under title
  "heroImage": "/path/image.jpg", ← Hero background
  "sections": [                   ← Content sections (unlimited)
    {
      "id": "section-1",          ← Unique within project
      "heading": "Section Title", ← Section heading
      "text": "Description...",   ← Section text
      "image": "/path/img.jpg",   ← Section image
      "layout": "image-left"      ← or "image-right"
    }
  ],
  "specs": {                      ← Specifications (flexible)
    "anyKey": "Any Value",
    "anotherKey": "Another Value"
  },
  "link": "https://..."           ← External link for CTA button
}
```

## Common Tasks

### Task 1: Change Project Images

1. Add images to `public/assets/img/`
2. Update paths in `individualProjects.json`
3. Refresh browser

### Task 2: Update Text Content

1. Open `app/data/individualProjects.json`
2. Find your project by `id`
3. Edit `title`, `subtitle`, `sections[].text`, etc.
4. Save and refresh

### Task 3: Add More Sections

In JSON, add to `sections` array:
```json
{
  "id": "new-section",
  "heading": "New Section",
  "text": "New content here...",
  "image": "/path/to/image.jpg",
  "layout": "image-right"
}
```

### Task 4: Change Specs

Edit the `specs` object:
```json
"specs": {
  "engine": "Your Engine",
  "power": "Your HP",
  "customStat": "Any Value You Want"
}
```

### Task 5: Customize Colors

Edit `app/projects/indivprojects.module.css`:

```css
/* Change specs gradient */
.specsSection {
  background: linear-gradient(135deg, #yourColor1 0%, #yourColor2 100%);
}

/* Change CTA gradient */
.ctaSection {
  background: linear-gradient(135deg, #yourColor3 0%, #yourColor4 100%);
}

/* Change accent color */
.ctaButton:hover {
  background: #yourAccentColor;
}
```

## Animation Features

All animations trigger automatically when you scroll:

1. **Hero**: Background zooms in, text slides up
2. **Specs Cards**: Slide up with stagger effect
3. **Sections**: Images scale in, text slides in
4. **CTA**: Fades in from bottom

To customize, see `ANIMATION_GUIDE.md`

## Routes Explained

### Static Routes (Better for SEO)
```
/projects/baja        → Loads baja/page.tsx → Shows "2006-subaru-baja"
/projects/2007-sti    → Loads 2007-sti/page.tsx → Shows "2007-subaru-sti"
```

Create more by copying the folder structure.

### Dynamic Route (Works for Any Project)
```
/projects/[any-project-id]  → Loads [id]/page.tsx → Shows matching project
```

Just add to JSON and visit `/projects/your-project-id`

## Troubleshooting

### Project Not Showing
- ✅ Check `id` in JSON matches URL
- ✅ Ensure JSON is valid (no trailing commas)
- ✅ Refresh browser

### Images Not Loading
- ✅ Check images exist in `public/assets/img/`
- ✅ Paths should start with `/assets/img/`
- ✅ Check file extensions match (jpg, webp, etc.)

### Animations Not Working
- ✅ Scroll down to trigger them
- ✅ Check browser console for errors
- ✅ Ensure JavaScript is enabled

### Styling Issues
- ✅ Clear browser cache
- ✅ Check CSS module is imported
- ✅ Verify no conflicting global styles

## Next Steps

1. **Replace Sample Images**: Update all image paths in JSON with your actual photos
2. **Customize Text**: Edit project descriptions to match your builds
3. **Add More Projects**: Copy the JSON structure for new projects
4. **Customize Design**: Tweak colors, fonts, animations in CSS
5. **Create Static Routes**: For important projects, create dedicated pages for SEO

## Resources

- **Full Documentation**: `SYSTEM_SUMMARY.md`
- **Usage Guide**: `INDIVIDUAL_PROJECTS_README.md`
- **Route Info**: `PROJECT_ROUTES.md`
- **Architecture**: `ARCHITECTURE.md`
- **Animations**: `ANIMATION_GUIDE.md`

## Support

If something isn't working:

1. Check browser console for errors
2. Verify JSON syntax at jsonlint.com
3. Make sure all files are saved
4. Restart development server

## Start Development Server

```bash
npm run dev
```

Then visit: `http://localhost:3000/projects/baja`

---

## 🎯 Quick Wins

**5-Minute Win**: Visit `/projects/baja` to see it working

**15-Minute Win**: Edit JSON to update one project's text

**30-Minute Win**: Add your own project with custom images

**1-Hour Win**: Customize colors and create 3 new projects

---
