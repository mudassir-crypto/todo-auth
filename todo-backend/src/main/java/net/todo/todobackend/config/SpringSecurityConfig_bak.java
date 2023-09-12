package net.todo.todobackend.config;


import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

//@Configuration
//@EnableMethodSecurity
//@AllArgsConstructor
public class SpringSecurityConfig_bak {

    private UserDetailsService userDetailsService;

    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        http
        	.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests((authorize) -> {
//                    This is a role based security of endpoints, there is a method level security as well (like middlewares)
//                    using EnableMethodSecurity in config, PreAuthorize on functions of controller
//                    authorize.requestMatchers(HttpMethod.POST,"/api/**").hasRole("ADMIN");
//                    authorize.requestMatchers(HttpMethod.PUT,"/api/**").hasRole("ADMIN");
//                    authorize.requestMatchers(HttpMethod.DELETE,"/api/**").hasRole("ADMIN");
//                    authorize.requestMatchers(HttpMethod.GET,"/api/**").hasAnyRole("ADMIN", "USER");
//                    authorize.requestMatchers(HttpMethod.PATCH,"/api/**").hasAnyRole("ADMIN", "USER");
                    //authorize.requestMatchers(HttpMethod.GET, "/api/**").permitAll(); //doesnt need any auth, public api endpoint
            	authorize.requestMatchers("/api/auth/**").permitAll();
                authorize.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll(); // handling preflight req
                authorize.anyRequest().authenticated();
        })
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }           // creates a form or header based auth

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        System.out.println("auth man exec");
        return configuration.getAuthenticationManager();
    }


//    As we're using the db auth so we dont need in-memory auth
//    @Bean
//    public UserDetailsService userDetailsService(){
//        UserDetails crypto = User.builder()
//                .username("crypto")
//                .password(passwordEncoder().encode("cryptocmd1"))
//                .roles("USER")
//                .build();
//
//        UserDetails admin = User.builder()
//                .username("admin")
//                .password(passwordEncoder().encode("admin"))
//                .roles("ADMIN")
//                .build();
//
//        return new InMemoryUserDetailsManager(crypto, admin);
//    }

}
