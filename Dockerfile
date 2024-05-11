# Use a base image with Maven installed
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the Maven project descriptor
COPY pom.xml .

# Copy the rest of the project
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use a lightweight base image for the runtime environment
FROM tomcat:9.0.56-jdk17-openjdk-slim

# Copy the built WAR file from the build stage to the Tomcat webapps directory
COPY --from=build /app/target/*.war /usr/local/tomcat/webapps/

# Expose the default Tomcat port
EXPOSE 8080

# Start Tomcat
CMD ["catalina.sh", "run"]
