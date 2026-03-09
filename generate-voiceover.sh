#!/bin/bash
# Google Cloud TTS voiceover generator
# Requires: gcloud CLI authenticated, texttospeech API enabled

DIR="public/voiceover"
mkdir -p "$DIR"

VOICE="ko-KR-Neural2-A"  # Female Korean voice

generate() {
  local name="$1"
  local text="$2"
  local output="$DIR/$name.mp3"

  if [ -f "$output" ]; then
    echo "Skip: $output exists"
    return
  fi

  echo "Generating: $name"
  curl -s -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "x-goog-user-project: ash-email-487014" \
    -H "Content-Type: application/json" \
    "https://texttospeech.googleapis.com/v1/text:synthesize" \
    -d "{
      \"input\": {\"text\": \"$text\"},
      \"voice\": {\"languageCode\": \"ko-KR\", \"name\": \"$VOICE\"},
      \"audioConfig\": {\"audioEncoding\": \"MP3\", \"speakingRate\": 0.95, \"pitch\": 0}
    }" | python3 -c "import sys,json,base64; d=json.load(sys.stdin); sys.stdout.buffer.write(base64.b64decode(d['audioContent']))" > "$output"

  echo "Done: $output ($(wc -c < "$output") bytes)"
}

generate "intro" "Claude Code. 2026년, AI 네이티브 CLI의 새로운 기준."
generate "skills" "슬래시 커맨드 한 줄이면, 분석부터 커밋, 푸시까지 자동으로 완료됩니다."
generate "multiagent" "여러 에이전트가 동시에 작업합니다. 병렬 실행으로 3배 더 빠르게."
generate "mcp" "터미널 하나로 Slack, Notion, 모든 외부 도구를 바로 연결합니다."
generate "outro" "Claude Code. The AI-Native CLI."

echo "All voiceovers generated!"
