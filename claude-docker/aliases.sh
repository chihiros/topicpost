# Claude Code用のエイリアス・関数

# Claude Docker便利コマンド集
# 使用方法: source aliases.sh

# Claude Dockerの起動とログイン確認  
claude-docker() {
    echo "🚀 Claude Docker起動中..."
    
    # Container起動
    docker-compose up -d
    
    # 直接Claudeに接続
    echo "🤖 Claude Code起動中..."
    docker-compose exec claude-code bash -c "claude"
}

# Claude Dockerに直接接続（認証済み前提）
claude-shell() {
    docker-compose exec claude-code bash
}

# Claude Docker完全セットアップ（初回用）
claude-init() {
    echo "🔧 Claude Docker初期セットアップ..."
    docker-compose down || true
    docker-compose up -d --build
    echo "✅ セットアップ完了！接続してください:"
    echo "  docker-compose exec claude-code bash"
}

# Claude Docker自動起動モード
claude-auto() {
    echo "🤖 Claude自動起動モードで起動中..."
    AUTO_CLAUDE=true docker-compose up -d
    echo "✅ Container起動完了！Claude Codeが自動で起動されています"
    docker-compose logs -f claude-code
}