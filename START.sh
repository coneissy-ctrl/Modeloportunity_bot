#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Modeloportunity Bot - Startup Script${NC}"
echo "============================================"

if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    echo "Please install Docker from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

echo -e "${GREEN}✅ Docker is installed${NC}"

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker Compose is installed${NC}"

if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  backend/.env not found${NC}"
    cp backend/.env.example backend/.env
    echo -e "${YELLOW}⚠️  Edit backend/.env and add your OpenAI API key!${NC}"
    echo "Get it from: https://platform.openai.com/api/keys"
    exit 1
fi

if grep -q "sk-proj-test-key-placeholder" backend/.env; then
    echo -e "${RED}❌ OpenAI API key not configured!${NC}"
    echo -e "${YELLOW}Please edit backend/.env and add your real API key${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Configuration looks good${NC}"
echo ""
echo -e "${BLUE}Starting services...${NC}"
echo "============================================"
echo ""
echo -e "${GREEN}📝 Services:${NC}"
echo "  Backend: http://localhost:8000"
echo "  Frontend: http://localhost:3000"
echo "  API Docs: http://localhost:8000/docs"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop${NC}"
echo ""

docker-compose up