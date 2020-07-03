# Unit Test

```java
package com.testd;

import com.ccloud.ihappy.MainApplication;
import com.ccloud.ihappy.service.ScaleService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest(classes = {MainApplication.class})
@RunWith(SpringJUnit4ClassRunner.class)
public class TestDemo {

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Autowired
    ScaleService scaleService;

    @Test
    public void test(){
        this.scaleService.userAvailableScaleList(1L);
    }
}

```
