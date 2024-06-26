package com.hoya.mannaback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hoya.mannaback.entity.Search;

@Repository
public interface SearchRepository extends JpaRepository<Search, Integer> {

}
