package com.hoya.mannaback.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hoya.mannaback.entity.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

    List<Event> findByDate(LocalDate date);

}
