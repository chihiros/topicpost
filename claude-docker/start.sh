#!/bin/bash

echo "🐳 Starting Claude Code Docker environment..."

# 引数でオプションを処理
AUTO_START=false
INTERACTIVE=true

for arg in "$@"; do
    case $arg in
        --auto-claude)
            AUTO_START=true
            shift
            ;;
        --no-connect)
            INTERACTIVE=false
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [options]"
            echo "Options:"
            echo "  --auto-claude    Auto-start Claude Code (requires authentication)"
            echo "  --no-connect     Don't automatically connect to container"
            echo "  -h, --help       Show this help message"
            exit 0
            ;;
    esac
done

# 自動起動モードの場合は環境変数を設定
if [ "$AUTO_START" = true ]; then
    echo "🤖 Enabling auto-start mode..."
    export AUTO_CLAUDE=true
fi

# コンテナをビルド・起動
docker-compose up -d --build

# 起動完了を待機
echo "⏳ Waiting for container to be ready..."
sleep 3

# Claude認証状態チェック
echo "🔍 Checking Claude authentication status..."
AUTH_STATUS=$(docker-compose exec -T claude-code bash -c "test -f /home/node/.claude/.credentials.json && echo 'authenticated' || echo 'not_authenticated'" 2>/dev/null || echo 'error')

echo "✅ Container is ready!"
echo ""

if [ "$AUTO_START" = true ]; then
    if [ "$AUTH_STATUS" = "authenticated" ]; then
        echo "🚀 Claude Code is starting automatically..."
        echo "💡 Check logs: docker-compose logs -f claude-code"
    else
        echo "⚠️  Claude Code authentication required!"
        echo "🔐 Please connect and run: claude auth"
        INTERACTIVE=true
    fi
else
    echo "🔗 To connect to the container:"
    echo "  docker-compose exec claude-code bash"
    echo ""
    echo "🤖 To start Claude Code:"
    echo "  claude  # (run 'claude auth' first time only)"
fi

echo ""
echo "📊 Available ports:"
echo "  - 3000: Development server"
echo "  - 8686: API server"
echo "  - 8000, 8080, 5173: Additional development ports"
echo ""

# インタラクティブモードの場合は自動的にコンテナに接続
if [ "$INTERACTIVE" = true ] && [ "$AUTO_START" != true ]; then
    echo "🐚 Connecting to container..."
    docker-compose exec claude-code bash
elif [ "$INTERACTIVE" = true ] && [ "$AUTO_START" = true ] && [ "$AUTH_STATUS" != "authenticated" ]; then
    echo "🐚 Connecting to container for authentication..."
    docker-compose exec claude-code bash
fi
