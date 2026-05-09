# 🌐 전세계 HS Code 검색 (Global HS Code Search)

AI 기반(Anthropic Claude)으로 제품 설명을 받아 **국제 HS 6자리 코드**와
**국가별 확장 코드**(한국 HSK 10, 미국 HTSUS 10, 중국 13, 일본 9, EU CN 8 등)
를 한 번에 분류해 주는 Next.js 웹 애플리케이션입니다.

## 주요 기능

- 🤖 Claude 기반 자연어 → HS 코드 분류 (GIR 1~6 근거 포함)
- 🌎 15개 주요 교역국/관세동맹의 코드 스케줄을 한 번에 비교
- 🇰🇷🇺🇸 한국어 / 영어 인터페이스 토글
- 🔁 대체 후보(alternates) 및 신뢰도 표시
- ⚠ 모호하거나 확인이 필요한 항목은 warnings 로 명시
- ⚡ 시스템 프롬프트 캐시(`cache_control`)로 재요청 시 비용/지연 절감

## 빠른 시작

```bash
pnpm install   # 또는 npm install / yarn
cp .env.example .env.local
# .env.local 에 ANTHROPIC_API_KEY 입력
pnpm dev
# → http://localhost:3000
```

## 환경 변수

| 변수 | 설명 | 기본값 |
|------|------|--------|
| `ANTHROPIC_API_KEY` | (필수) Anthropic API 키 | — |
| `ANTHROPIC_MODEL`   | 사용할 모델 ID | `claude-sonnet-4-6` |

## 폴더 구조

```
app/
  api/search/route.ts   # AI 분류 API
  layout.tsx
  page.tsx              # 검색 UI
  globals.css
lib/
  countries.ts          # 지원 국가 메타데이터
  i18n.ts               # 다국어 사전 + 예시 쿼리
  prompt.ts             # 시스템/사용자 프롬프트 빌더
  types.ts              # 타입 정의
```

## 면책

본 도구는 보조용입니다. 실제 통관 신고 시에는 각국 관세 당국 또는 관세사의
공식 분류를 따르시기 바랍니다.
