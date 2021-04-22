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

## Parameterized Test

```java
package com.testd;

import com.ccloud.ihappy.component.Diagnosis;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@RunWith(Parameterized.class)
public class TestDiagnosis {

    private final Integer score;
    private final String expectedStandard;

    public TestDiagnosis(Integer score, String standard) {
        this.score = score;
        this.expectedStandard = standard;
    }

    @Parameterized.Parameters(name = "Score {0}")
    public static Object[][] parameters() {
        return new Object[][]{
                {-1, "0-10"},
                {1, "0-10"},
                {14, "10-14"},
                {15, "14-20"},
                {25, ">=20"},
                {205, ">=20"},
        };
    }

    @Test
    public void testGetStandardByScore() {
        String actual = Diagnosis.getStandardByScore(score);
        Assert.assertEquals(expectedStandard, actual);
    }
}
```

**See Also**:

- [Spring Boot - How to use JUnit Parameterized tests | Vianney’s blog](https://vianneyfaivre.com/tech/spring-boot-junit-parameterized-tests)

### Without Spring Boot

```java
package test;

import offer.Offer60;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.Arrays;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

public class Offer60Test {

    static Stream<Arguments> test() {
        return Stream.of(
                Arguments.of(2, new double[]{1.0 / 6, 1.0 / 6, 1.0 / 6, 1.0 / 6, 1.0 / 6, 1.0 / 6}),
                Arguments.of(1, new double[]{1.0 / 6, 1.0 / 6, 1.0 / 6, 1.0 / 6, 1.0 / 6, 1.0 / 6})
        );
    }

    @ParameterizedTest
    @MethodSource
    public void test(int input, double[] expected) {
        double[] actual = new Offer60().new Solution().dicesProbability(input);
        assertArrayEquals(expected, actual);
    }
}
```

- `@MethodSource` specifies the test cases come from **method**, and the default method name of data source is the same as the method name it is used on.
