# Use Nginx Alpine for lightweight production server
FROM nginx:alpine

# Copy website files to Nginx html directory
COPY index.html /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
