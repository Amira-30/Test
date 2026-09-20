# Amira Abdelhamid - Professional Web Developer Portfolio

Welcome to the repository for **Amira Abdelhamid's Personal Portfolio Website**. This project is a modern, clean, and interactive static website designed to showcase professional skills, career history, and facilitate client inquiries through a comprehensive contact and project estimation form.

---

## 🚀 Project Overview

This repository houses a personal portfolio designed for a **Web Developer**. It features a cohesive aesthetic (light coral and soft pink accents) and includes key sections that a client or recruiter would expect, complete with structured markup and semantic HTML.

### 🌟 Key Features

- **About Me & Biography:** A warm, professional introduction highlighting expertise and background.
- **Skills Highlight:** Clear list of core technical competencies: HTML5, CSS, JavaScript, React, and Vue.js.
- **Social Connects:** Seamless links to professional profiles on Facebook, LinkedIn, Instagram, and GitHub.
- **Experience Timeline:** A beautifully structured professional history grid, highlighting roles as an Educator, Event Specialist, and Junior Web Developer.
- **Interactive Project Inquiry & Contact Form:**
  - Standard contact info capture (Name, Email, Phone, Preferred Meeting Date & Time).
  - Project specification options (Project Type, Detailed Description).
  - Dynamic budget range selector and multi-service checkboxes (UI/UX, Frontend, Backend, Hosting, Maintenance).
  - Lead attribution tracking ("How did you hear about me?").

---

## 📁 File Structure

The project has a clean, straightforward structure optimized for lightweight static hosting:

```
Store/
├── index.html          # Main portfolio page containing semantic HTML structure and content
├── doc.html            # Secondary HTML document prepared for modular expansion
├── main.js             # Client-side JavaScript file (ready for interactive features)
├── css/
│   └── style.css       # External stylesheet linked by doc.html (ready for custom CSS)
└── images/             # Visual assets, logos, and profile graphics
    ├── pic.PNG         # Profile picture
    ├── teacher.png     # Montessori Kids Academy visual
    ├── assistant.JPG   # White Eagle Event role visual
    ├── front.PNG       # Web Developer role illustration
    ├── facebook.JPG    # Facebook badge
    ├── instagram.JPG   # Instagram badge
    ├── linkedin.JPG    # LinkedIn badge
    └── github.jfif     # GitHub badge
```

---

## 🛠️ Tech Stack & Styling

- **HTML5:** Utilizes semantic markup (`<fieldset>`, `<legend>`, `<header>`, `<table>`, `<tbody>`, `<tfoot>`, `<form>`, etc.) to ensure accessibility and strong SEO foundations.
- **CSS:** Features direct embedded styling within `index.html` showcasing clean typography using Serif/Georgia fonts, a warm light-coral color palette, and structured table grids.
- **JavaScript:** Structured to support client-side form submissions, responsive animations, and validation inside `main.js`.

---

## 💻 How to Run the Project

Since this is a client-side static application, there is no build step or package installation required. 

### 1. Locally via Browser
Simply double-click `index.html` or right-click the file and select **Open with...** followed by your preferred web browser (e.g., Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari).

### 2. Live Server (Recommended for Development)
If you are using **VS Code**, you can use the **Live Server** extension:
1. Open the project folder in VS Code.
2. Click on the **Go Live** button in the status bar at the bottom-right corner of the window.
3. The page will open automatically in your browser with hot-reload enabled.

---

## 🔮 Future Enhancements & Roadmap

To evolve this project into a next-generation web portfolio, the following enhancements are planned:
1. **Style Modularization:** Move the embedded CSS from the `<style>` block in `index.html` into `css/style.css` to clean up the markup and leverage external style caching.
2. **Form Interaction & API Integration:** Utilize `main.js` to intercept form submissions, validate fields in real-time, and forward entries to an email service (such as EmailJS) or a backend server.
3. **Advanced Responsive Design:** Integrate modern CSS custom properties (variables), Flexbox/Grid layouts, and CSS media queries to ensure pixel-perfect rendering across mobile, tablet, and desktop devices.
4. **Micro-animations:** Incorporate subtle fade-in and hover effects on buttons, experience grids, and social cards to elevate the user experience.
