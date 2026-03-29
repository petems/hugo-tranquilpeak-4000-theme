#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(pwd)"
BUILD_ROOT=".vercel-build"
SITE_DIR="${BUILD_ROOT}/test-site"
BIN_DIR="${BUILD_ROOT}/bin"
OUTPUT_DIR="public"
OUTPUT_DIR_ABS="${ROOT_DIR}/${OUTPUT_DIR}"
THEME_NAME="hugo-tranquilpeak-4000-theme"
REQUIRED_HUGO_VERSION="0.152.2"
HUGO_BIN="hugo"

ensure_hugo_version() {
  if ! command -v hugo >/dev/null 2>&1; then
    echo "hugo not found in PATH; downloading Hugo ${REQUIRED_HUGO_VERSION}..."
    install_hugo
    return
  fi

  local current_version
  current_version="$(hugo version | sed -n 's/.* v\([0-9.]*\).*/\1/p' | head -n1)"
  if [[ "${current_version}" != "${REQUIRED_HUGO_VERSION}" ]]; then
    echo "Detected Hugo ${current_version}; using pinned Hugo ${REQUIRED_HUGO_VERSION}"
    install_hugo
  fi
}

install_hugo() {
  local os
  local arch
  local archive

  os="$(uname -s | tr '[:upper:]' '[:lower:]')"
  arch="$(uname -m)"

  case "${arch}" in
    x86_64) arch="amd64" ;;
    aarch64|arm64) arch="arm64" ;;
    *)
      echo "ERROR: unsupported architecture '${arch}' for Hugo download"
      exit 1
      ;;
  esac

  archive="hugo_extended_${REQUIRED_HUGO_VERSION}_${os}-${arch}.tar.gz"

  mkdir -p "${BIN_DIR}" "${BUILD_ROOT}"

  curl -fsSL -o "${BUILD_ROOT}/${archive}" \
    "https://github.com/gohugoio/hugo/releases/download/v${REQUIRED_HUGO_VERSION}/${archive}"
  tar -xzf "${BUILD_ROOT}/${archive}" -C "${BIN_DIR}" hugo

  HUGO_BIN="${BIN_DIR}/hugo"
  echo "Using ${HUGO_BIN}: $(${HUGO_BIN} version)"
}

ensure_hugo_version

if [[ "${HUGO_BIN}" == "hugo" ]]; then
  echo "Using system Hugo: $(hugo version)"
fi

if [[ ! -d node_modules ]]; then
  echo "Installing npm dependencies..."
  npm ci
fi

echo "Building theme assets..."
npm run prod

echo "Preparing temporary Hugo site at ${SITE_DIR}..."
rm -rf "${SITE_DIR}" "${OUTPUT_DIR_ABS}"
mkdir -p "${SITE_DIR}/themes"

cp -R exampleSite/content "${SITE_DIR}/"
cp -R exampleSite/static "${SITE_DIR}/"
cp exampleSite/config.toml "${SITE_DIR}/hugo.toml"

ln -s "${ROOT_DIR}" "${SITE_DIR}/themes/${THEME_NAME}"

if grep -q 'theme = "hugo-tranquilpeak-theme"' "${SITE_DIR}/hugo.toml"; then
  sed -i "s/theme = \"hugo-tranquilpeak-theme\"/theme = \"${THEME_NAME}\"/" "${SITE_DIR}/hugo.toml"
fi

if [[ "${VERCEL_ENV:-}" == "preview" && -n "${VERCEL_URL:-}" ]]; then
  BASE_URL="https://${VERCEL_URL}"
  echo "Building preview deployment with baseURL: ${BASE_URL}"
  "${HUGO_BIN}" --source "${SITE_DIR}" --destination "${OUTPUT_DIR_ABS}" --minify --baseURL "${BASE_URL}"
elif [[ "${VERCEL_ENV:-}" == "production" && -n "${VERCEL_PROJECT_PRODUCTION_URL:-}" ]]; then
  BASE_URL="https://${VERCEL_PROJECT_PRODUCTION_URL}"
  echo "Building production deployment with baseURL: ${BASE_URL}"
  "${HUGO_BIN}" --source "${SITE_DIR}" --destination "${OUTPUT_DIR_ABS}" --minify --baseURL "${BASE_URL}"
else
  echo "Building with default baseURL from config"
  "${HUGO_BIN}" --source "${SITE_DIR}" --destination "${OUTPUT_DIR_ABS}" --minify
fi

if [[ ! -f "${OUTPUT_DIR_ABS}/index.html" ]]; then
  echo "ERROR: Hugo did not create ${OUTPUT_DIR_ABS}/index.html"
  exit 1
fi

echo "Build successful!"
