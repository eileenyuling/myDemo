# -*- coding: UTF-8 -*-

import socket
def client():
    #1 创建套接字
    s = socket.socket()
    HOST = '127.0.0.1'
    PORT = 6666
    s.connect((HOST, PORT))
    s.send(b'hello world')
    msg = s.recv(1024)
    print('from server: %s' % msg)

if __name__ == '__main__':
    client()
