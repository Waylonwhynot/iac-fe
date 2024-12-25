FROM node:16.14.2-bullseye-slim

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list