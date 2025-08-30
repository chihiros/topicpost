#!/bin/bash

# Claude Code 認証確認・自動ログインスクリプト

echo "🔍 Claude Code認証状態を確認中..."

# 認証状態をチェック
if claude --version > /dev/null 2>&1; then
    # 簡単なテストコマンドで認証状態を確認
    if timeout 5s claude --help > /dev/null 2>&1; then
        echo "✅ Claude Code認証済み"
        exit 0
    fi
fi

echo "⚠️  Claude Code認証が必要です"
echo "🔗 認証URLを生成中..."

# 認証プロセスを開始（バックグラウンド）
claude auth &
AUTH_PID=$!

echo "📋 以下の手順で認証してください："
echo "1. 上記のURLをブラウザで開く"
echo "2. コードをコピーして貼り付ける"
echo "3. Enterキーを押す"

# プロセスの完了を待機
wait $AUTH_PID

if [ $? -eq 0 ]; then
    echo "✅ Claude Code認証完了"
else
    echo "❌ Claude Code認証に失敗しました"
    exit 1
fi