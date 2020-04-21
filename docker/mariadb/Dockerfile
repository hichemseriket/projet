FROM mariadb:10.4

ADD ./database /docker-entrypoint-initdb.d

ENV MYSQL_INITDB_SKIP_TZINFO 1
ENV LANG=C.UTF-8




