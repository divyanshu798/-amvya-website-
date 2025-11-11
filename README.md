# AMVYA - Premium Home Décor Website

A modern, elegant one-page website for AMVYA, a premium home décor and essentials brand that blends contemporary aesthetics with traditional Indian craftsmanship.

## 🎨 Design Philosophy

**Brand Aesthetic:** Cozy, luxurious, and serene - modern minimalism meets Indian craftsmanship
**Inspiration:** Vaaree-style clean and airy layout
**Tone:** Elegant, aspirational, warm, and trust-building

## 🎯 Target Audience

Young urban professionals and homeowners (age 25–45) who value:
- Style and comfort
- Sustainable living
- Premium quality products
- Artisanal craftsmanship

## 🏠 Brand Description

AMVYA curates high-quality, aesthetic home décor and essential products including:
- Premium bedsheets and bedding
- Decorative cushions and throws
- Artisanal candles and lighting
- Elegant serveware and dinnerware
- Bathroom and kitchen accessories

**Tagline:** "Designed for Serenity"
**Brand Promise:** Sustainable. Artisanal. Everyday Luxury.

## 🎨 Color Palette

- **Primary Beige:** #F5F1EB
- **Secondary Beige:** #E8E0D5
- **Warm White:** #FEFCF9
- **Soft Taupe:** #D4C4B0
- **Dusty Rose:** #E6CCC2
- **Dusty Rose Light:** #F2E5E0
- **Charcoal:** #3A3A3A
- **Soft Gray:** #7A7A7A

## 📱 Features

### ✅ Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Smooth animations and transitions

### ✅ SEO Optimized
- Semantic HTML structure
- Meta tags and Open Graph
- Structured data (JSON-LD)
- Product-focused headings
- Optimized loading performance

### ✅ Modern UI/UX
- Clean, airy layout
- Elegant typography (Inter + Playfair Display)
- Smooth scrolling navigation
- Interactive hover effects
- Accessibility considerations

### ✅ Content Sections
1. **Hero Section** - Beautiful banner with tagline
2. **About AMVYA** - Brand story and philosophy
3. **Product Highlights** - 4 main categories showcase
4. **Customer Promise** - Brand values and commitments
5. **Contact Section** - Multiple contact methods + form

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local web server (recommended for development)

### Installation

1. **Clone or download the project files**
   ```bash
   # If using git
   git clone <repository-url>
   cd amvya-website
   ```

2. **Serve the website locally**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### File Structure
```
amvya-website/
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   └── images/               # Image assets (placeholder)
└── README.md                 # This file
```

## 🖼️ Adding Images

To replace image placeholders with actual product photos:

1. Add high-quality images to the `assets/images/` folder
2. Update the HTML placeholders:
   ```html
   <!-- Replace this -->
   <div class="hero-image-placeholder">
       <i class="fas fa-home"></i>
       <p>Beautiful Hero Image</p>
   </div>
   
   <!-- With this -->
   <div class="hero-image">
       <img src="assets/images/hero-banner.jpg" alt="AMVYA home décor collection">
   </div>
   ```

### Recommended Image Specifications
- **Hero Image:** 1200x800px, high quality
- **Product Images:** 400x300px, consistent lighting
- **Format:** JPG for photos, PNG for graphics
- **Optimization:** Compress for web (80-90% quality)

## 📞 Contact Information

Update the contact details in the HTML:
- **Email:** hello@amvya.com
- **WhatsApp:** +91 98765 43210
- **Instagram:** @amvya_home

## 🛠️ Customization

### Colors
Update the CSS custom properties in `:root` section of `style.css`:
```css
:root {
    --primary-beige: #F5F1EB;
    --dusty-rose: #E6CCC2;
    /* ... more colors */
}
```

### Typography
The website uses:
- **Primary Font:** Inter (body text)
- **Display Font:** Playfair Display (headings)

### Content
All content is inline in `index.html` and can be easily edited:
- Hero section tagline and description
- About section brand story
- Product descriptions and features
- Contact information

## 📈 SEO Features

- **Meta Tags:** Title, description, keywords, author
- **Open Graph:** Social media sharing optimization
- **Twitter Cards:** Enhanced Twitter sharing
- **Structured Data:** Organization and website markup
- **Semantic HTML:** Proper heading hierarchy and landmarks
- **Performance:** Optimized CSS and minimal external resources

## 🔧 Browser Support

- **Modern Browsers:** Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers:** iOS Safari, Chrome Mobile, Samsung Internet
- **Fallbacks:** Graceful degradation for older browsers

## 📝 License

This website template is created for AMVYA brand. Please ensure you have proper rights to use any images or content before deployment.

## 🚀 Deployment

### Option 1: Static Hosting (Recommended)
- **Netlify:** Drag & drop deployment
- **Vercel:** Git-based deployment
- **GitHub Pages:** Free hosting with custom domain

### Option 2: Traditional Hosting
- Upload files to your web hosting provider
- Ensure index.html is in the root directory
- Configure custom domain if needed

## 📞 Support

For customizations or issues:
- Review the CSS for styling modifications
- Check browser console for any JavaScript errors
- Ensure all file paths are correct
- Validate HTML and CSS for syntax errors

---

**AMVYA** - Designed for Serenity 🏡✨