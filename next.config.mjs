/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow the dev server's client bundles / HMR to load when the site is opened
  // via 127.0.0.1, a LAN IP, or an IDE preview pane (otherwise the page renders
  // server HTML but never hydrates, so buttons, modals and animations are dead).
  allowedDevOrigins: ["127.0.0.1", "localhost", "*.local", "192.168.*.*", "10.*.*.*", "172.16.*.*"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
