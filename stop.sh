#!/bin/bash

# 检查是否有进程在运行
if [ ! -f "pid.txt" ]; then
    echo "项目未在运行"
    exit 1
fi

# 读取进程ID
pid=$(cat pid.txt)

# 检查进程是否存在
if ! ps -p $pid > /dev/null 2>&1; then
    echo "项目未在运行（进程不存在）"
    rm pid.txt
    exit 1
fi

# 停止进程
echo "正在停止项目 (PID: $pid)..."
kill $pid

# 等待进程结束
sleep 2
if ps -p $pid > /dev/null 2>&1; then
    echo "项目停止失败，尝试强制终止..."
    kill -9 $pid
    sleep 1
fi

# 最终检查
if ps -p $pid > /dev/null 2>&1; then
    echo "无法停止项目进程"
    exit 1
else
    echo "项目已停止"
    rm pid.txt
fi