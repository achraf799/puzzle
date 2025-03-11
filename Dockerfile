FROM php:8.2-fpm-alpine
ARG USERNAME
ARG UID
ARG MAIL
ARG NAME

RUN echo "==============================="
RUN echo "$USERNAME ($UID)"
RUN echo "$NAME ($MAIL)"
RUN echo "==============================="


# installation postgres
RUN apk --no-cache add postgresql-dev && \
    docker-php-ext-install pdo_pgsql
    RUN apk --no-cache add postgresql-dev
    RUN docker-php-ext-install pdo pdo_pgsql
# installation bash
RUN apk --no-cache update && apk --no-cache add bash git npm shadow

# installation npm et nodejs
RUN apk --no-cache add npm nodejs=~22


# installation de composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
&& php composer-setup.php --install-dir=/usr/local/bin \
&& php -r "unlink('composer-setup.php');"


# installation de symfony
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.alpine.sh' | bash
RUN apk add symfony-cli

# installation de Angular
RUN npm install -g typescript @angular/cli@^19

# Gestion user
RUN echo "UID_MAX 9223372036854775807" > /etc/login.defs
RUN /usr/sbin/useradd -m -s /bin/sh -u "$UID" $USERNAME
USER $USERNAME

# config git
RUN git config --global user.email "$MAIL"
RUN git config --global user.name "$NAME"

WORKDIR /var/www/html


