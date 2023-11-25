export { default } from "next-auth/middleware";
export const config = { matcher: ["/abc"], callbackUrl: "/auth/signin?callbackUrl=${encodeURIComponent(ctx.req.url)}", };