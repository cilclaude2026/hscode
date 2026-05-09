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

## 📱 핸드폰에서 1탭 배포 (권장)

아래 버튼을 **핸드폰에서 탭** → GitHub 로그인 → `ANTHROPIC_API_KEY` 입력 → Deploy.
3분 안에 `https://<프로젝트명>.vercel.app` URL이 나옵니다.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcilclaude2026%2Fhscode&project-name=hscode-search&repository-name=hscode-search)

> - Production Branch: `claude/ai-hscode-search-app-NSrhL` (현재 유일한 브랜치)
> - 환경변수는 **선택사항**입니다. 비워두면 내장 사전 모드로 동작하고, 나중에 `ANTHROPIC_API_KEY` 를 추가하면 AI 모드로 전환됩니다.

### Cloudflare Pages 로 올리기 (대안)

1. Cloudflare 대시보드 → **Workers & Pages → Create → Pages → Connect to Git**
2. 이 레포 선택 → 빌드 명령 `npx @cloudflare/next-on-pages`, 출력 디렉터리 `.vercel/output/static`
3. 환경변수 `ANTHROPIC_API_KEY`, `NODE_VERSION=20` 추가
4. Compatibility flag `nodejs_compat` 켜기

## 로컬 개발

```bash
npm install
cp .env.example .env.local      # ANTHROPIC_API_KEY 입력
npm run dev -- -H 0.0.0.0       # 같은 Wi-Fi 의 핸드폰에서도 접속 가능
# → http://<PC-LAN-IP>:3000
```

## 동작 모드

| 모드 | 조건 | 정확도 | 비용 |
|------|------|--------|------|
| 🤖 **AI 모드**       | `ANTHROPIC_API_KEY` 환경변수 설정 시 | 높음 (GIR 추론) | API 호출당 |
| 📚 **사전 모드(기본)** | 키 미설정 시 자동 폴백          | 보통 (50개 대표 품목) | 무료 |

> Vercel 배포 시 환경변수 칸을 비워둬도 즉시 동작합니다. 나중에 키를 추가하고 Redeploy 하면 자동으로 AI 모드로 전환됩니다.

## 환경 변수

| 변수 | 설명 | 기본값 |
|------|------|--------|
| `ANTHROPIC_API_KEY` | (선택) Anthropic API 키. 없으면 사전 모드 | — |
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
