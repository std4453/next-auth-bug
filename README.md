# Next.js + next-auth bug reproduction

`next-auth` does not work when:

- `next.js` v13.4.12 (other versions not tested)
- Using app router (probably optional)
- Using middlewares
- Using adapters
- Using `database` as session strategy

## Steps to reproduce

You would need a provider and a database to start with. I used
Keycloak and PostgreSQL, although I don't think that's what triggers
this bug. The OAuth provider should be correctly configured to
redirect back to the page.

```bash
cp .env.local.example .env.local

# Fill in the .env.local file with your credentials

pnpm install
pnpm dev
```

Now open `http://localhost:3000`, it should jump to `/api/auth/signin`, not login, and it jumps back to `/api/auth/callback/keycloak`, then to `/`, then to `/api/auth/signin` again.

As a result, you never get to use the app.

## Expected behavior

It should redirect to the OAuth provider, then back to the app, and you should be able to use it.
