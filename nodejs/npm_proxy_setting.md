# NPM Proxy 설정

    npm config set cafile="${인증서 파일 위치}"

    npm config set http_proxy ${proxy url}
    npm config set https-proxy ${proxy url}
    npm config set strict-ssl false
    npm config set registry http://registry.npmjs.org/
