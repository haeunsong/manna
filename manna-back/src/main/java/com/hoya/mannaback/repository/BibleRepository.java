package com.hoya.mannaback.repository;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hoya.mannaback.entity.Bible;

@Repository
public interface BibleRepository extends JpaRepository<Bible, Integer> {

    Bible findById(int randomNumber);

    List<Bible> findAllByLongLabel(String longLabel);

}
