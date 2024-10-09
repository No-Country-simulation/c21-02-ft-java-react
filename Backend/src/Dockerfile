FROM eclipse-temurin:17-jdk-jammy

LABEL authors="c21-02-ft-java-react"

EXPOSE 8080

WORKDIR /app

# Copy the source code
COPY src ./src
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Build the application
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Run the application
CMD ["java", "-jar", "target/edtech-0.0.1-SNAPSHOT.jar"]