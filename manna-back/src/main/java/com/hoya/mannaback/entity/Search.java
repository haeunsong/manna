package com.hoya.mannaback.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Search {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int searchId;
    private String searchWord;
    private String relationWord;
    private Integer relation; // 0 또는 1

    public Search(String searchWord, String relationWord, Integer relation) {
        this.searchWord = searchWord;
        this.relationWord = relationWord;
        this.relation = relation;
    }
}
