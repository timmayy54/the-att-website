/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
                port: "",
            },
        ],
    },
    webpack: (config) => {
        // Add a null loader for the problematic file
        config.module.rules.push({
            test: /node-pre-gyp[\/\\]lib[\/\\]util[\/\\]nw-pre-gyp[\/\\]index.html$/,
            use: 'null-loader',
        });
        
        return config;
    },
};

export default nextConfig;
