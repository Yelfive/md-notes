# Troubleshooting

- Forgot password 

    登录禅道数据库 zt_user表，找到用户的记录，
    把password的值改成 e10adc3949ba59abbe56e057f20f883e 登录密码就是123456
    locked字段置零，fails字段清零。解锁