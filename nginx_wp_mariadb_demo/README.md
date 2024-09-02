 重要: 
 1. 创建 mariadb 容器
 ```
 kubectl apply -f maria.yml  # create第一步创建
 ```
 2. 获取 mariadb 容器的 IP 地址
 ```
 kubectl get pod -o wide  # 重要: 第二步获取 maria-pod 的 IP 地址 10.42.0.44
 ```
 3. 创建 wordpress 容器，使用 mariadb 容器的 IP 地址
 ```
 kubectl apply -f wordpress-pod.yml  # 第三步: 这里使用的 IP 地址是 maria-pod 的 IP 地址 10.42.0.44
 ```
 4. 查看 wordpress 容器的 IP 地址
 ```
 kubectl get pod -o wide    # 第四步: 查看 wordpress-pod 的 IP 地址 10.42.0.45
 ```
注: http://127.0.0.1:8080/ 我直接访问都可以了，不过为了项目完整性，添加一个 nginx 的 docker 测试下反向代理功能

 5. 测试反向代理功能
 ```
docker stop nginx-proxy

docker run -d --rm \
  -p 8888:80 \
  -v `pwd`/proxy.conf:/etc/nginx/conf.d/default.conf \
  --name nginx-proxy \
  nginx:alpine
 ```
通过以下方式来区分：
* 直接访问服务：
```Bash
     curl http://localhost:8080
```
* 通过 Nginx 代理访问：
```Bash
     curl -I http://localhost:8888
```
如果是通过 Nginx 代理，您应该能在响应头中看到 X-Proxied-By-Nginx: true。

