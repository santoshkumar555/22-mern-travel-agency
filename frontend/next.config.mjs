/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "randomuser.me",
                pathname: "/**",
            },
        ],
        qualities: [70, 75, 78, 80, 85],
    },
};

export default nextConfig;