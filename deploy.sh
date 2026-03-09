#!/bin/bash

# =============================================
# Script de deploy de Atletico Moro a Vercel
# Uso desde la raíz del proyecto:
#   ./deploy.sh
#   ./deploy.sh "mensaje del commit"
# =============================================

set -e

COMMIT_MSG="${1:-Actualización del sitio}"
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "⚽ Atlético Moro — Deploy Script"
echo "================================="
echo ""

# 1. Git: stage, commit, push
echo "📦 Commiteando cambios en Git..."
cd "$ROOT_DIR"
git add -A

if git diff --cached --quiet; then
  echo "ℹ️  No hay cambios nuevos para commitear."
else
  git commit -m "$COMMIT_MSG"
  echo "✅ Commit listo: $COMMIT_MSG"
fi

echo "⬆️  Pusheando a GitHub..."
git push origin main
echo "✅ GitHub actualizado."

# 2. Deploy a Vercel
echo ""
echo "🌐 Deployando a Vercel (producción)..."
cd "$ROOT_DIR/web"
npx vercel --prod

echo ""
echo "✅ ¡Deploy completado! La página está actualizada."
