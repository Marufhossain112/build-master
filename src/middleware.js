export { default } from "next-auth/middleware";
export const config = { matcher: ["/pc/build/build-pc"], callbackUrl: "/auth/signin?callbackUrl=${encodeURIComponent(ctx.req.url)}", };