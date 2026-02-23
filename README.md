# Fingalogy Limited Website

Modern, tech-focused website for Fingalogy Limited - IT and Electronics Services, Battery and Energy Storage After-Sales Services in Dublin, Ireland.

## Features

- 🎨 Modern tech-focused design with dark theme and gradients
- ✨ Particle background effects
- 🎭 Smooth scroll animations
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Optimized performance
- ♿ Accessibility compliant
- 🌐 Cross-browser compatible

## Quick Start

### Using Docker

```bash
# Build the Docker image
docker build -t fingalogy-website .

# Run the container
docker run -d -p 8080:80 fingalogy-website

# Access the website at http://localhost:8080
```

### Local Development

Simply open `index.html` in a web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

## Project Structure

```
.
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css     # Main stylesheet
│   ├── js/
│   │   └── main.js        # Main JavaScript
│   └── images/            # Images and logos
│       ├── worker-bus.jpg
│       ├── worker-equipment.jpg
│       └── partners/      # Partner logos
├── Dockerfile             # Docker configuration
├── nginx.conf            # Nginx configuration
└── README.md             # This file
```

## Technologies Used

- HTML5 (Semantic markup)
- CSS3 (Grid, Flexbox, CSS Variables, Animations)
- JavaScript (ES6+)
- Intersection Observer API
- Canvas API for particle effects
- Nginx (for production deployment)
- Docker (for containerization)

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Performance

- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- 60 FPS animations

## Accessibility

- WCAG AA compliant
- Keyboard navigation support
- Screen reader compatible
- Reduced motion support

## License

© 2024 Fingalogy Limited. All rights reserved.

## Contact

- Location: Dublin, Ireland
- Email: info@fingalogy.com
