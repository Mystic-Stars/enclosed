FROM node:20-alpine AS base

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat python3 make g++
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --no-frozen-lockfile
RUN pnpm run -r build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 8787

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 openscratch

COPY --from=builder /app/packages/app-client/dist ./packages/app-client/dist
COPY --from=builder /app/packages/app-server/dist-node ./packages/app-server/dist-node
COPY --from=builder /app/packages/lib/dist ./packages/lib/dist

USER openscratch

EXPOSE 8787

CMD ["node", "packages/app-server/dist-node/index.cjs"]