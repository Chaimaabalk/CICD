#Create MySQL Image for JSP Tutorial Application
FROM mysql:latest
MAINTAINER balkassechaimaa8@gmail.com
COPY ./sqlfiles /docker-entrypoint-initdb.d
EXPOSE 3306