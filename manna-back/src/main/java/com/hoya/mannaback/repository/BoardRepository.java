package com.hoya.mannaback.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hoya.mannaback.entity.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

    Board findByBoardNumber(Integer boardNumber);

    List<Board> findByTitleContainsOrContentContainsOrderByWriteDatetimeDesc(String title, String content);
}
