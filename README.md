# 🔐 Passgen

> A tiny, fast password generator that shows you how secure your password actually is — in real time, in color.

Passgen isn't just a random-string generator. As you tune the length and character types, the whole UI shifts through a red → amber → green → emerald gradient that reflects an actual **security score** combining both length and character variety — so you can *see* a weak password before you use it.

## ✨ Features

- **Live security scoring** — combines password length and character-type variety (lowercase, uppercase, numbers, symbols) into a `weak` / `average` / `strong` / `very-strong` rating.
- **Color-reactive UI** — background, borders, labels, and accents all shift to match the current security level.
- **No duplicate passwords** — regenerating never shows you a password you've already seen in the session.
- **One-click copy** to clipboard.
- **Toggle character sets** — lowercase, uppercase, numbers, symbols — independently.
- **Length slider**, capped at 25 characters.

## 🛠️ Tech stack

| | |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) |
| **UI** | [React 19](https://react.dev) + [Tailwind CSS 4](https://tailwindcss.com) |
| **Icons** | [Tabler Icons](https://tabler.io/icons) |
| **Lint / Format** | [oxlint](https://oxc.rs/docs/guide/usage/linter) + [oxfmt](https://oxc.rs) |
| **Package manager** | [Bun](https://bun.sh) |

## 🚀 Getting started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

### Lint & format

```bash
bun run lint          # oxlint
bun run format        # oxfmt --write
bun run format:check   # oxfmt --check
```

## 🐳 Running with Docker

The included `Dockerfile` uses a multi-stage build on top of `output: "standalone"`, so the final image only ships the traced production files — no `node_modules`, no source.

```bash
docker build -t passgen .
docker run -p 3000:3000 passgen
```

Open [http://localhost:3000](http://localhost:3000).

## 📁 Project structure

```
src/
├── app/            # App Router pages, layout, global styles
├── hooks/          # useGeneratePassword, useCopyPassword
└── lib/            # security.ts — level calculation → color/label mapping
```

---

Made with ❤️ by [pietrodev](https://pietrodev.up.railway.app)
