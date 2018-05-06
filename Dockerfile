FROM nginx:alpine
LABEL maintainer="contact@lunik.xyz"

COPY ./build /usr/share/nginx/html

ENV NODE_ENV=production

EXPOSE 80

# expose volumes
VOLUME ["/etc/nginx/conf.d", "/usr/share/nginx/html"]
