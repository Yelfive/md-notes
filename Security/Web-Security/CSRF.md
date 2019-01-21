# CSRF: Cross-Site Request Forgery

Suppose that Client as access to Good-Site, and when he visits one Evil-Site, The Evil-Site forge a request to Good-Site and the Client triggers the request, which will be totally considered as "normal" to Good-Site, thus, Evil-Site will be able to use the resource of Client in Good-Site(such as buying something or use some service).

```text
| Client    |       Good Site |     Evil Site |
+---------------------------------------------+
    | --- 1. login   --> |
    | <-- 2. granted --- |
    | ---------------- 3. access -------------> |
                         | <---4. forge form--- |
    | <--- 5. bill ----- |
```

By the fourth step `forge form`, Evil Site prepares a evil request trying to access some paid service, and after that, the bill will be on `Client`.

## Appendix

1. [CSRF攻击原理及防御](https://www.cnblogs.com/shytong/p/5308667.html)