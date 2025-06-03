package com.watchstore.server.util;

import java.util.HashMap;
import java.util.Map;

import com.watchstore.server.dto.UserDTO;

public class AuthResponseUtil {
    public static final Map<String, Object> buildAuthResponse(UserDTO user) {
        String jwtToken = JWTUtil.generateTokenString(user.getEmail());

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("token", jwtToken);
        responseBody.put("username", user.getUsername());
        responseBody.put("email", user.getEmail());
        responseBody.put("id", user.getId());

        return responseBody;
    }
}
