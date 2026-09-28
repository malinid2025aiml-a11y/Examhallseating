package com.example.examhallseating.repository;

import com.example.examhallseating.entity.ExamSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamSessionRepository extends JpaRepository<ExamSession, Long> {

}