package com.example.examhallseating.controller;

import com.example.examhallseating.entity.Hall;
import com.example.examhallseating.entity.Student;
import com.example.examhallseating.entity.ExamSession;
import com.example.examhallseating.entity.Seat;

import com.example.examhallseating.repository.HallRepository;
import com.example.examhallseating.repository.StudentRepository;
import com.example.examhallseating.repository.ExamSessionRepository;

import com.example.examhallseating.service.SeatAllocationService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
public class SeatPlanController {

    private final HallRepository hallRepository;
    private final StudentRepository studentRepository;
    private final ExamSessionRepository examSessionRepository;
    private final SeatAllocationService seatAllocationService;

    public SeatPlanController(
            HallRepository hallRepository,
            StudentRepository studentRepository,
            ExamSessionRepository examSessionRepository,
            SeatAllocationService seatAllocationService) {

        this.hallRepository = hallRepository;
        this.studentRepository = studentRepository;
        this.examSessionRepository = examSessionRepository;
        this.seatAllocationService = seatAllocationService;
    }


    // ================= HALLS =================

    @PostMapping("/halls")
    public Hall addHall(@RequestBody Hall hall) {

        return hallRepository.save(hall);
    }


    @GetMapping("/halls")
    public List<Hall> getAllHalls() {

        return hallRepository.findAll();
    }


    // ================= STUDENTS =================

    @PostMapping("/students")
    public Student addStudent(@RequestBody Student student) {

        return studentRepository.save(student);
    }


    @GetMapping("/students")
    public List<Student> getAllStudents() {

        return studentRepository.findAll();
    }


    // ================= EXAMS =================

    @PostMapping("/exams")
    public ExamSession addExam(
            @RequestBody ExamSession examSession) {

        return examSessionRepository.save(examSession);
    }


    @GetMapping("/exams")
    public List<ExamSession> getAllExams() {

        return examSessionRepository.findAll();
    }


    // ================= GENERATE SEATING =================

    @PostMapping("/halls/{hallId}/generate-seating")
    public List<Seat> generateSeating(
            @PathVariable Long hallId) {

        return seatAllocationService.generateSeating(hallId);
    }


    // ================= VIEW SEATING =================

    @GetMapping("/seating")
    public List<Seat> getSeating() {

        return seatAllocationService.getAllSeats();
    }
}