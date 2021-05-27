# Spring Message Converter

**Spring message converter** is used to convert input(output) message to controller(client). A converter is basically registered by implementing `org.springframework.http.converter.HttpMessageConverter` or `org.springframework.messaging.converter.MessageConverter`.

> See Spring source code for more details.

## Full example

```java
package com.ccloud.ihappy.response;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.http.converter.json.AbstractJackson2HttpMessageConverter;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;
import java.util.Objects;

/**
 * Any HttpMessageConverter bean that is present in the context will be added to the list of converters.
 */
@Component
public class JsonResponseMessageConverter extends AbstractJackson2HttpMessageConverter {
    protected JsonResponseMessageConverter(ObjectMapper objectMapper) {
        super(objectMapper, MediaType.APPLICATION_JSON);
    }

    @Override
    public boolean canWrite(Class<?> clazz, MediaType mediaType) {
        return JsonResponseBuilder.class.isAssignableFrom(clazz);
    }

    @Override
    protected boolean canRead(MediaType mediaType) {
        return false;
    }

    @Override
    protected void writeInternal(Object object, @Nullable Type type, HttpOutputMessage outputMessage) throws IOException {
        ResponseEntity<Map<String, Object>> output = ((JsonResponseBuilder) object).build();

        HttpServletResponse response = ((ServletServerHttpResponse) outputMessage).getServletResponse();
        response.setStatus(output.getStatusCodeValue());
        output.getHeaders().forEach((key, value) -> response.setHeader(key, String.join(",", value)));
        super.writeInternal(Objects.requireNonNull(output.getBody()), type, outputMessage);
    }
}
```
