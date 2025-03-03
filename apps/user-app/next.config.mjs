/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    transpilePackages: ["@repo/ui", "@repo/common"],
};

export default nextConfig;
