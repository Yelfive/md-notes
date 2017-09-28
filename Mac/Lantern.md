Lantern
=======


By pass proxy
-------------
*.baidu.com, *.163.com, *.qq.com, *.outsource, *.alijian.com,*.cn,*liaoxuefeng.com


Setting network proxy
---------------------

**Listing services**

```bash
networksetup -listallnetworkservices
```

**Getting**

```bash
$ networksetup -getproxybypassdomains Wi-Fi

*.baidu.com
*.163.com
*.qq.com
*.outsource
*.alijian.com
*.cn
*.liaoxuefeng.com

```

**Setting**

```bash
networksetup -setproxybypassdomains networkservice domain1 [domain2] [...]
```
