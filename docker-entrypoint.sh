#!/bin/bash
set -e

echo "🐳 Docker container for Claude Code development starting..."

# Git の安全ディレクトリ設定
git config --global --add safe.directory /home/node/workspace

# Node.js プロジェクトの依存関係をチェック
if [ -f "/home/node/workspace/web/package.json" ]; then
    echo "📦 Installing Node.js dependencies..."
    cd /home/node/workspace/web
    if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules" ]; then
        npm install
    fi
    cd /home/node/workspace
fi

# Go プロジェクトの依存関係をチェック
if [ -f "/home/node/workspace/api/go.mod" ]; then
    echo "🐹 Installing Go dependencies..."
    cd /home/node/workspace/api
    go mod download
    cd /home/node/workspace
fi

# Claude Code の設定チェック
if [ -f "/home/node/.claude/.credentials.json" ]; then
    echo "✅ Claude Code already authenticated"
elif [ ! -f "/home/node/.claude/config" ]; then
    echo "⚙️  Claude Code configuration not found."
    echo "🔐 Please run 'claude auth' to authenticate Claude Code manually."
else
    echo "✅ Claude Code configuration found"
fi

# 開発環境の情報表示
echo ""
echo "🚀 Development Environment Ready!"
echo "================================="
echo "📁 Workspace: /home/node/workspace"
echo "🔧 Node.js: $(node --version)"
echo "📦 NPM: $(npm --version)"
echo "🐹 Go: $(go version | cut -d' ' -f3)"
echo "🐙 Git: $(git --version | cut -d' ' -f3)"
echo "🔍 Ripgrep: $(rg --version | head -n1)"
echo ""
echo "📋 Available commands:"
echo "  claude          - Start Claude Code CLI"
echo "  npm run dev     - Start Remix development server (in web/)"
echo "  go run main.go  - Start Go API server (in api/)"
echo ""

# AUTO_CLAUDE環境変数が設定されていればClaude Codeを自動起動
if [ "${AUTO_CLAUDE}" = "true" ]; then
    echo "🤖 Auto-starting Claude Code..."
    if [ -f "/home/node/.claude/.credentials.json" ]; then
        echo "🚀 Starting Claude Code with bypass permissions..."
        exec claude --dangerously-skip-permissions
    else
        echo "❌ Claude Code not authenticated. Please run 'claude auth' first."
        echo "💡 You can connect manually with: docker-compose -f docker-compose.claude.yml exec claude-code bash"
    fi
fi
echo "🔗 Exposed ports:"
echo "  3000  - Remix development server"
echo "  8686  - Go API server"
echo "  8000  - Additional development port"
echo "  8080  - Additional development port"
echo "  5173  - Vite development server"
echo ""

# 引数が渡されていない場合はbashを起動
if [ $# -eq 0 ]; then
    echo "🐚 Starting interactive bash session..."
    echo "🤖 To start Claude Code, run: claude --dangerously-skip-permissions"
    exec bash
else
    # 引数が渡されている場合はそれを実行
    exec "$@"
fi
