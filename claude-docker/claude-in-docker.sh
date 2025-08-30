#!/bin/bash

echo "🤖 Starting Claude Code inside Docker container..."

# Container内で実行されているかチェック
if [ ! -f "/.dockerenv" ] && [ ! -f "/proc/1/cgroup" ]; then
    echo "❌ This script should be run inside the Docker container"
    echo "💡 Run from host: ./start-claude-docker.sh --auto-claude"
    exit 1
fi

# Claude認証状態チェック
if [ -f "/home/node/.claude/.credentials.json" ]; then
    echo "✅ Claude Code is authenticated"
    echo "🚀 Starting Claude Code..."
    exec claude --dangerously-skip-permissions
else
    echo "❌ Claude Code not authenticated"
    echo "🔐 Please run authentication first:"
    echo "   claude auth"
    echo ""
    echo "Or run Claude normally:"
    echo "   claude"
    exit 1
fi