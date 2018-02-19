package ru.example.spring.lab.attemp.controller;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import ru.example.spring.lab.attemp.domain.Account;
import ru.example.spring.lab.attemp.domain.Point;
import ru.example.spring.lab.attemp.repositories.AccountRepository;
import ru.example.spring.lab.attemp.repositories.PointRepository;

@RestController
@RequestMapping("/api")
public class AppController {
    private final AccountRepository accountRepository;
    private final PointRepository pointRepository;

    @Autowired
    public AppController(AccountRepository repository, PointRepository pointRepository) {
        this.accountRepository = repository;
        this.pointRepository = pointRepository;
    }

    @PostMapping("/points")
    public String postPoints(@AuthenticationPrincipal User user,
                           @RequestBody Point point) {
        final Account account = accountRepository.findByUsername(user.getUsername());
        final Point newPoint = new Point(point.getX(), point.getY(), point.getR(), account);
        pointRepository.save(newPoint);
        return "succes";
    }
}