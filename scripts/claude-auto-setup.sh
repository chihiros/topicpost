#!/bin/bash

# Claude Code自動セットアップスクリプト

set -e

echo "🚀 Claude Code自動セットアップ開始..."

# Containerが起動しているか確認
if ! docker-compose -f docker-compose.claude.yml ps | grep -q "Up"; then
    echo "📦 Docker Container起動中..."
    docker-compose -f docker-compose.claude.yml up -d
    
    # Container起動待機
    echo "⏳ Container準備中..."
    sleep 5
fi

# 認証状態確認
echo "🔍 Claude認証状態確認中..."
AUTH_STATUS=$(docker-compose -f docker-compose.claude.yml exec -T claude-code bash -c "claude --help > /dev/null 2>&1 && echo 'authenticated' || echo 'not_authenticated'")

if [[ "$AUTH_STATUS" == "authenticated" ]]; then
    echo "✅ Claude認証済み - 準備完了!"
    echo "🔗 接続方法："
    echo "   docker-compose -f docker-compose.claude.yml exec claude-code bash"
    echo "   claude"
else
    echo "⚠️  Claude認証が必要です"
    echo "🔐 認証を開始します..."
    
    # インタラクティブな認証セッション
    docker-compose -f docker-compose.claude.yml exec claude-code bash -c "
        echo '📋 認証手順:'
        echo '1. 表示されるURLをブラウザで開く'
        echo '2. 認証コードをコピー'
        echo '3. 以下にコードを貼り付けてEnter'
        echo ''
        claude auth
    "
    
    if [ $? -eq 0 ]; then
        echo "✅ Claude認証完了!"
    else
        echo "❌ 認証に失敗しました"
        exit 1
    fi
fi

echo ""
echo "🎉 セットアップ完了!"
echo "📝 使用方法："
echo "   docker-compose -f docker-compose.claude.yml exec claude-code bash"
echo "   claude"