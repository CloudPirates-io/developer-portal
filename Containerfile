FROM docker.io/library/nginx:alpine@sha256:b3c656d55d7ad751196f21b7fd2e8d4da9cb430e32f646adcf92441b72f82b14

COPY /conf/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY /dist /usr/share/nginx/html

# User nginx (gid 101, uid: 101 from base image)
RUN chown -R 101:101 /usr/share/nginx/html && chown -R 101:101 /var/cache/nginx

USER nginx
