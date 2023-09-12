package net.todo.todobackend.security;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoder;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {

	@Value("${app.jwt-secret}")
	private String jwtSecret;
	
	@Value("${app.jwt-expiration-milliseconds}")
	private long jwtExpirationDate;
	
	// Generate jwt
	public String generateToken(Authentication authentication) {
		String username = authentication.getName();
		
		Date currentDate = new Date();
		Date expirationDate = new Date(currentDate.getTime() + jwtExpirationDate);
		
		String jwtToken = Jwts.builder()
							.setSubject(username)
							.setIssuedAt(currentDate)
							.setExpiration(expirationDate)
							.signWith(key())
							.compact();
			
		return jwtToken;
	}
	
	private Key key() {
		return Keys.hmacShaKeyFor(
				Decoders.BASE64.decode(jwtSecret)
			);
				
	}
	
	// Getting username from token
	public String getUsernameFromToken(String token) {
		Claims claims = Jwts.parserBuilder()
							.setSigningKey(key())
							.build()
							.parseClaimsJws(token)
							.getBody();
		String username = claims.getSubject();
		return username;
	}
	
	// Validate Token
	public boolean validateToken(String token) {
		Jwts.parserBuilder()
			.setSigningKey(key())
			.build()
			.parse(token);
		
		return true;
	}
}
