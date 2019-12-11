# -*- coding: UTF-8 -*-
import socket
class TCPServer:
    def __init__(self, server_address, handler_class):
        self.server_address = None
        self.HandlerClass = None
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        pass
    # 服务器启动函数
    def server_forever(self):
        pass
    # 接收请求
    def get_request(self):
        pass
    # 处理请求
    def process_request(self):
        pass
    # 关闭请求
    def close_request(self):
        pass
    # 关闭服务器
    def shutdown(self):
        pass
