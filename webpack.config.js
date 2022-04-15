export default function (webpackEnv) {
    return {
        resolve: {

            fallback: {
                // Here paste
                path: false,
                // But in mi case I paste
                crypto: false

            }
        }
    }
}