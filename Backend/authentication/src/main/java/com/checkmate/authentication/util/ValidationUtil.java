package com.checkmate.authentication.util;

import java.util.regex.Pattern;

public class ValidationUtil {
    public static boolean isValidEmail(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@(.+)$";
        Pattern pattern = Pattern.compile(regex);
        return pattern.matcher(email).matches();
    }
}
