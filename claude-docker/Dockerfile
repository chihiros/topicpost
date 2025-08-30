FROM node:20-slim

# aliasの設定
RUN echo "alias ll='ls -alF --color=auto'" >> /root/.bashrc && \
    echo "alias la='ls -A --color=auto'" >> /root/.bashrc && \
    echo "alias l='ls -CF --color=auto'" >> /root/.bashrc && \
    echo "alias claude-auto='--dangerously-skip-permissions'" >> /root/.bashrc

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    tree \
    curl \
    git \
    vim \
    nano \
    python3 \
    python3-pip \
    build-essential \
    ripgrep \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# Claude Code CLI をインストール
RUN curl -fsSL https://claude.ai/claude-code/install.sh | sh && \
    echo 'export PATH="/root/.local/bin:$PATH"' >> /root/.bashrc

# 作業ディレクトリを設定
WORKDIR /workspace

# Node.js の権限設定
RUN npm config set fund false
RUN npm config set audit false

# Git の設定（Dockerコンテナ内での安全な設定）
RUN git config --global user.name "Claude Code User"
RUN git config --global user.email "claude-code@docker.local"
RUN git config --global init.defaultBranch main
RUN git config --global safe.directory '*'

# 開発に必要な追加ツールをインストール
RUN npm install -g \
    typescript \
    tsx \
    @types/node \
    eslint \
    prettier

# Python の追加パッケージ
RUN pip3 install --break-system-packages \
    requests \
    beautifulsoup4 \
    pandas \
    numpy

# 既存のnodeユーザーを利用してsudo権限を追加
RUN usermod -aG sudo node && \
    echo 'node ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# Claude Codeをrootでインストール
RUN npm install -g @anthropic-ai/claude-code

# 非rootユーザーの設定
USER node
WORKDIR /home/node/workspace

# Git設定を非rootユーザーで行う
RUN git config --global user.name "Claude Code User" && \
    git config --global user.email "claude-code@docker.local" && \
    git config --global init.defaultBranch main && \
    git config --global safe.directory '*'

# スタートアップスクリプトをコピー
COPY --chown=node:node docker-entrypoint.sh /usr/local/bin/
USER root
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
USER node

# ポートを開放（開発サーバー用）
EXPOSE 3000 8000 8080 5173

# デフォルトのエントリーポイント
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["bash"]
