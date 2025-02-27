#!/bin/bash

# 检查是否已经有进程在运行
if [ -f "pid.txt" ]; then
    pid=$(cat pid.txt)
    if ps -p $pid > /dev/null 2>&1; then
        echo "项目已经在运行中 (PID: $pid)"
        exit 1
    else
        rm pid.txt
    fi
fi

# 启动项目
echo "正在启动项目..."
npm run dev & echo $! > pid.txt

# 等待几秒检查进程是否成功启动
sleep 2
pid=$(cat pid.txt)
if ps -p $pid > /dev/null 2>&1; then
    echo "项目成功启动 (PID: $pid)"
    echo "访问地址: http://localhost:5173"
else
    echo "项目启动失败"
    rm pid.txt
    exit 1
fi