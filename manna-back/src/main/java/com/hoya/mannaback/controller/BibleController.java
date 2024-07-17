package com.hoya.mannaback.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hoya.mannaback.Service.BibleService;
import com.hoya.mannaback.entity.Bible;
import com.hoya.mannaback.model.response.GetReadVerseResponseDto;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/bible")
@RequiredArgsConstructor
public class BibleController {

    private final BibleService bibleService;

    // 오늘의 말씀 두 구절 가져오기
    @GetMapping("/today-verse")
    public Bible getTodayVerses() {

        int min = 1;
        int max = 31138;
        Random random = new Random();
        int randomNumber1 = random.nextInt((max - min) + 1) + min;

        return bibleService.getRandomVerses(randomNumber1);
    }

    // 해당 본문 가져오기
    @GetMapping("/read-verse")
    public List<Bible> getReadVerses(@RequestParam String long_label) {
        List<Bible> response = bibleService.getReadBibleByLongLabel(long_label);
        return response;

    }

}
