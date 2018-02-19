package ru.example.spring.lab.attemp.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import ru.example.spring.lab.attemp.domain.Account;
import ru.example.spring.lab.attemp.domain.Point;

@RepositoryRestResource(exported = false)
public interface PointRepository extends PagingAndSortingRepository<Point, Long> {
    Page<Point> findByOwner(Pageable pageable, Account owner);
}
