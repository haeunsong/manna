// package com.hoya.mannaback.config;

// import java.util.ArrayList;
// import java.util.Collection;

// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;

// import com.hoya.mannaback.entity.User;

// import lombok.Data;
// import lombok.Getter;

// @Data
// public class MyUserDetails implements UserDetails {
// // 필수 요소
// private static final long serialVersionUID = 1L;
// final boolean accountNonExpired = true;
// final boolean accountNonLocked = true;
// final boolean credentialsNonExpired = true;
// final String password;
// final String username;
// final boolean isEnabled;

// final String name;
// final String userType;

// // 권한이 여러개일 경우
// // authorities : 현재 사용자의 권한 목록이다. User Dto 객체에 들어있는 정보를 바탕으로,
// // 현재 사용자 권한을 authorities 객체에 등록해야 한다.
// // 사용자 권한은 ROLE_#### 형태로 만들어야 한다.
// Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

// public MyUserDetails(User user) {
// switch (user.getUserType()) {

// case "관리자":
// authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
// break;
// }
// // 여기도 필수요소
// /*
// * DB에서 조회한 사용자 계정이름, 비밀번호, 계정 활성화 여부를 위와 같이 등록해야 한다.
// * 사용자 비밀번호는 암호화된 형태이어야 한다.
// * 암호화되지 않은 비밀번호를 DB에 저장하면 안된다.
// */
// this.username = user.getLoginName();
// this.password = user.getPassword();
// this.isEnabled = user.isEnabled();

// this.name = user.getName();
// this.userType = user.getUserType();

// }
// }
