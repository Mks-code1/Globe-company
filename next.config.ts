import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    // The root layout lives under the [locale] dynamic segment, so there is no single layout to
    // compose a 404 from: app/global-not-found.tsx renders the 404 document for unmatched URLs.
    globalNotFound: true,
  },
};

export default withNextIntl(nextConfig);
