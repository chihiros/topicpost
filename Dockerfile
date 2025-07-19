FROM golang:1.23-bullseye AS docker
WORKDIR /api
COPY /api .
RUN go get github.com/air-verse/air@v1.61.5
RUN go install github.com/air-verse/air@v1.61.5
CMD air

FROM golang:1.23-bullseye AS build
WORKDIR /api
COPY /api .
RUN go mod download
RUN GOOS=linux go build -tags timetzdata -mod=readonly -v -o server

FROM ubuntu:latest AS deploy
RUN apt update && apt install -y ca-certificates
COPY --from=build /api/server /server

CMD ["/server"]
