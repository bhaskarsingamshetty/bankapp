FROM nginx:stable-alpine

# Remove default config
RUN rm /etc/nginx/nginx.conf

# Copy our custom config
COPY deafult.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
