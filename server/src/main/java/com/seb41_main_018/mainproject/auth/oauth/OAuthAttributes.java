package com.seb41_main_018.mainproject.auth.oauth;

import com.seb41_main_018.mainproject.exception.BusinessLogicException;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Getter
@Builder
@Slf4j
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String picture;

    public static OAuthAttributes of(String registrationId,
                                     String userNameAttributeName,
                                     Map<String ,Object> attributes) throws BusinessLogicException {


        if ("kakao".equals(registrationId)) {
            log.info("=== 카카오 로그인 ===");
            return ofKakao("id", attributes);
        } else {
            log.info("=== 구글 로그인 ===");
            return ofGoogle(userNameAttributeName, attributes);
        }
    }

//    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String,Object> attributes) {
//        Map<String,Object> response = (Map<String, Object>) attributes.get("response");
//
//        return OAuthAttributes.builder()
//                .name((String) response.get("name"))
//                .email((String) response.get("email"))
//                .picture((String) response.get("profile_image"))
//                .nameAttributeKey(userNameAttributeName)
//                .attributes(response)
//                .build();
//    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String,Object> attributes) {

        return OAuthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .nameAttributeKey(userNameAttributeName)
                .attributes(attributes)
                .build();
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName,
                                           Map<String,Object> attributes) {

        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>)kakaoAccount.get("profile");

        return OAuthAttributes.builder()
                .name((String) kakaoProfile.get("nickname"))
                .email((String) kakaoAccount.get("email"))
                .picture((String) kakaoProfile.get("profile_image_url"))
                .nameAttributeKey(userNameAttributeName)
                .attributes(attributes)
                .build();
    }
}
