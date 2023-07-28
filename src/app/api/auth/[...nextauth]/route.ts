import NextAuth, { type NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { TypeORMAdapter } from "@auth/typeorm-adapter";

const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID || "",
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  debug: true,

  adapter: TypeORMAdapter({
    type: "postgres",
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || ""),
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    synchronize: true,
  }) as any,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
