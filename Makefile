BINARY_NAME		:= bhakti-portfolio-api
EXPORT_RESULT	?= false # for CI please set EXPORT_RESULT to true
BUILD_DIR		:= build

GOCMD	:= go
GOTEST	:= $(GOCMD) test
GOVET	:= $(GOCMD) vet
GOFUMPT	:= gofumpt

BREWPATH		:= /opt/homebrew
GOPATH 			:= $(shell $(GOCMD) env GOPATH)
AIRPATH 		:= $(GOPATH)/bin/air
GOFUMPTPATH 	:= $(GOPATH)/bin/gofumpt
GOFUMPTBREWPATH	:= $(BREWPATH)/bin/gofumpt

GREEN   := $(shell tput -Txterm setaf 2)
YELLOW  := $(shell tput -Txterm setaf 3)
WHITE   := $(shell tput -Txterm setaf 7)
RESET   := $(shell tput -Txterm sgr0)

.PHONY: all test build vendor

all: watch

test.unit:
ifeq ($(EXPORT_RESULT), true)
	GO111MODULE=off go get -u github.com/jstemmer/go-junit-report
	$(eval OUTPUT_OPTIONS = | tee /dev/tty | go-junit-report -set-exit-code > junit-report.xml)
endif
	$(GOTEST) -v -race ./... $(OUTPUT_OPTIONS)

coverage:
	$(GOTEST) -cover -covermode=count -coverprofile=profile.cov ./...
	$(GOCMD) tool cover -func profile.cov
ifeq ($(EXPORT_RESULT), true)
	GO111MODULE=off go get -u github.com/AlekSi/gocov-xml
	GO111MODULE=off go get -u github.com/axw/gocov/gocov
	gocov convert profile.cov | gocov-xml > coverage.xml
endif

format:
	test -s ${GOFUMPTBREWPATH} || test -s ${GOFUMPTPATH} || go install mvdan.cc/gofumpt@latest
	$(GOFUMPT) -l -w .

vendor:
	$(GOCMD) mod tidy
	$(GOCMD) mod vendor

build:
	mkdir -p $(BUILD_DIR)
	rm -rf $(BUILD_DIR)/*
	CGO_ENABLED=0 GO111MODULE=on $(GOCMD) build -ldflags="-s -w" -mod vendor -o $(BUILD_DIR)/$(BINARY_NAME) ./src/cmd

watch:
	test -s "$(AIRPATH)" || curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b "$(GOPATH)/bin"
	"$(AIRPATH)"

run:
	$(GOCMD) run src/cmd/main.go -config environment/env.yml

help:
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@echo "  ${YELLOW}help               ${RESET} ${GREEN}Show this help message${RESET}"
	@echo "  ${YELLOW}coverage           ${RESET} ${GREEN}Run the tests of the project and export the coverage${RESET}"
	@echo "  ${YELLOW}format             ${RESET} ${GREEN}Format '*.go' files with gofumpt${RESET}"
	@echo "  ${YELLOW}test.unit          ${RESET} ${GREEN}Run the tests of the project${RESET}"
	@echo "  ${YELLOW}vendor             ${RESET} ${GREEN}Copy of all packages needed to support builds and tests in the vendor directory${RESET}"
	@echo "  ${YELLOW}build              ${RESET} ${GREEN}Build your project and put the output binary in $(BUILD_DIR)/$(BINARY_NAME)${RESET}"
	@echo "  ${YELLOW}watch              ${RESET} ${GREEN}Run the code with cosmtrek/air to have automatic reload on changes${RESET}"
	@echo "  ${YELLOW}run                ${RESET} ${GREEN}Run the code with without hot reload${RESET}"
