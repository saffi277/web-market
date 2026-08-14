FROM golang:1.24-alpine AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /out/server ./cmd/server \
 && CGO_ENABLED=0 go build -ldflags="-s -w" -o /out/seed   ./cmd/seed

FROM alpine:3.20
RUN adduser -D -u 10001 app && apk add --no-cache ca-certificates
WORKDIR /app
COPY --from=build /out/server /out/seed ./
COPY migrations ./migrations
USER app
EXPOSE 8080
CMD ["./server"]
