package ru.example.spring.lab.attemp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ru.example.spring.lab.attemp.domain.Account;
import ru.example.spring.lab.attemp.repositories.AccountRepository;

@Component
public class DatabaseFillIn implements CommandLineRunner {
    private final AccountRepository accountRepository;

    @Autowired
    public DatabaseFillIn(final AccountRepository repository) {
        this.accountRepository = repository;
    }

    @Override
    public void run(final String... args) throws Exception {
        final Account admin = new Account("kate", "back", "USER");
        final Account user = new Account("july", "front", "USER");
        accountRepository.save(admin);
        accountRepository.save(user);
    }

}