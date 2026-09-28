package com.example.examhallseating.repository;

import com.example.examhallseating.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

}