package com.hoya.mannaback.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hoya.mannaback.common.ResponseCode;
import com.hoya.mannaback.entity.Bible;
import com.hoya.mannaback.model.response.GetReadVerseResponseDto;
import com.hoya.mannaback.model.response.ResponseDto;
import com.hoya.mannaback.repository.BibleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BibleService {
    private final BibleRepository bibleRepository;

    public Bible getRandomVerses(int randomNumber1) {
        return bibleRepository.findById(randomNumber1);
    }

    // longLabel 에 해당하는 모든 성경 구절을 가져온다.
    public List<Bible> getReadBibleByLongLabel(String longLabel) {
        // longLabel 에 해당되는 모든 행을 찾아온다.
        List<Bible> bibleVerses = bibleRepository.findAllByLongLabel(longLabel);
        return bibleVerses;

    }
}