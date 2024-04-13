package com.hoya.mannaback.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hoya.mannaback.entity.Image;

import jakarta.transaction.Transactional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {

    // Image 테이블과 조인된 Board 테이블의 BoardNumber를 사용한다.
    List<Image> findByBoard_BoardNumber(Integer boardNumber);

    @Transactional
    void deleteByBoardBoardNumber(Integer boardNumber);

}
