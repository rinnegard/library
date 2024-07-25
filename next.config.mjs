/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "books.google.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "books.googleusercontent.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
