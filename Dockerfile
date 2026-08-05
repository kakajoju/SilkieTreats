FROM php:8.1-apache
RUN a2enmod rewrite
RUN apt-get update && apt-get install -y
