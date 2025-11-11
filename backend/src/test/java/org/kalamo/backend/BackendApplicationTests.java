package org.kalamo.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.context.SpringBootTest;

// Force replacement of the real DataSource with an embedded one for tests
@SpringBootTest
@AutoConfigureTestDatabase(replace = Replace.ANY)
class BackendApplicationTests {

    @Test
    void contextLoads() {
        // intentionally empty
    }
}
