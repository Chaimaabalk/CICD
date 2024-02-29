#Create MySQL Image for JSP Tutorial Application
FROM mysql:latest
MAINTAINER balkassechaimaa8@gmail.coms
COPY ./sqlfiles /docker-entrypoint-initdb.d
EXPOSE 3306