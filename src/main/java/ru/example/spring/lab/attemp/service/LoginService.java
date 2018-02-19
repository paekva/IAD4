package ru.example.spring.lab.attemp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.example.spring.lab.attemp.domain.Account;
import ru.example.spring.lab.attemp.repositories.AccountRepository;

import javax.validation.constraints.NotNull;

@Service
public class LoginService implements UserDetailsService {
    private final AccountRepository accountRepository;

    @Autowired
    public LoginService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public UserDetails loadUserByUsername(@NotNull String username) throws UsernameNotFoundException {
        Account user = accountRepository.findByUsername(username);
        if (user == null) throw new UsernameNotFoundException(username + " was not found!");
        return new User(username, user.getPassword(), AuthorityUtils.createAuthorityList(user.getRoles()));
    }
}