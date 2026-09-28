package com.example.examhallseating.service;

import com.example.examhallseating.entity.Hall;
import com.example.examhallseating.entity.Seat;
import com.example.examhallseating.entity.Student;
import com.example.examhallseating.repository.HallRepository;
import com.example.examhallseating.repository.SeatRepository;
import com.example.examhallseating.repository.StudentRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SeatAllocationService {

    private final HallRepository hallRepository;
    private final StudentRepository studentRepository;
    private final SeatRepository seatRepository;

    public SeatAllocationService(
            HallRepository hallRepository,
            StudentRepository studentRepository,
            SeatRepository seatRepository) {

        this.hallRepository = hallRepository;
        this.studentRepository = studentRepository;
        this.seatRepository = seatRepository;
    }

    public List<Seat> generateSeating(Long hallId) {

        // Find hall
        Hall hall = hallRepository.findById(hallId)
                .orElseThrow(() -> new RuntimeException("Hall not found"));

        // Get students
        List<Student> students = studentRepository.findAll();

        // Check capacity
        if (students.size() > hall.getCapacity()) {
            throw new RuntimeException("Not enough seats in the hall");
        }

        // Group students by section
        Map<String, List<Student>> sectionGroups = new HashMap<>();

        for (Student student : students) {

            sectionGroups
                    .computeIfAbsent(student.getSection(), key -> new ArrayList<>())
                    .add(student);
        }

        // Arrange students
        List<Student> arrangedStudents = new ArrayList<>();

        String previousSection = "";

        while (arrangedStudents.size() < students.size()) {

            String selectedSection = null;
            int maximumStudents = -1;

            // Find the section having the most remaining students
            for (Map.Entry<String, List<Student>> entry : sectionGroups.entrySet()) {

                String section = entry.getKey();
                List<Student> sectionStudents = entry.getValue();

                if (!section.equals(previousSection)
                        && sectionStudents.size() > maximumStudents) {

                    selectedSection = section;
                    maximumStudents = sectionStudents.size();
                }
            }

            // If only the previous section remains
            if (selectedSection == null) {

                for (Map.Entry<String, List<Student>> entry : sectionGroups.entrySet()) {

                    if (!entry.getValue().isEmpty()) {

                        selectedSection = entry.getKey();
                        break;
                    }
                }
            }

            // Take one student from selected section
            List<Student> selectedStudents =
                    sectionGroups.get(selectedSection);

            Student selectedStudent = selectedStudents.remove(0);

            arrangedStudents.add(selectedStudent);

            previousSection = selectedSection;
        }

        // Remove old seating arrangement
        seatRepository.deleteAll();

        // Create new seats
        List<Seat> seats = new ArrayList<>();

        int seatNumber = 1;
        int studentIndex = 0;

        for (int row = 1; row <= hall.getTotalRows(); row++) {

            for (int column = 1;
                 column <= hall.getTotalColumns();
                 column++) {

                if (studentIndex >= arrangedStudents.size()) {
                    break;
                }

                Student student = arrangedStudents.get(studentIndex);

                Seat seat = new Seat(
                        row,
                        column,
                        seatNumber
                );
seat.setStudentId(student.getId());
seat.setStudentName(student.getName());
seat.setRollNo(student.getRollNo());
seat.setSection(student.getSection());

seats.add(seat);

                seatNumber++;
                studentIndex++;
            }
        }

        // Save seats
        seatRepository.saveAll(seats);

        return seats;
    }
    public List<Seat> getAllSeats() {
    return seatRepository.findAll();
}
}