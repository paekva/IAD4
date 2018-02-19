package ru.example.spring.lab.attemp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.example.spring.lab.attemp.repositories.AccountRepository;

@Controller
public class LoginController {
    private final AccountRepository accountRepository;

    @Autowired
    public LoginController(AccountRepository repository) {
        this.accountRepository = repository;
    }

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @GetMapping(value = "/login")
    public String login() {
        return "login";
    }
}
