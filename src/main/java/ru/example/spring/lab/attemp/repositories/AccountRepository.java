package ru.example.spring.lab.attemp.repositories;

import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import ru.example.spring.lab.attemp.domain.Account;

@RepositoryRestResource(exported = false)
public interface AccountRepository extends Repository<Account, Long> {
    Account findByUsername(String username);
    Account save(Account user);
}