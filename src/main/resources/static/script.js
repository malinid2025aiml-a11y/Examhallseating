// =====================================================
// SPRING BOOT BACKEND
// =====================================================

const API_URL = "http://localhost:8080";


// =====================================================
// LOGIN
// =====================================================

function login() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    const message =
        document.getElementById("loginMessage");


    if (username === "admin" && password === "admin123") {

        document.getElementById("loginPage").style.display = "none";

        document.getElementById("dashboardPage").style.display = "block";

        message.textContent = "";

        loadDashboard();

    } else {

        message.textContent =
            "Invalid username or password";

        message.style.color = "red";
    }
}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    document.getElementById("dashboardPage").style.display = "none";

    document.getElementById("loginPage").style.display = "flex";

    document.getElementById("username").value = "";

    document.getElementById("password").value = "";
}


// =====================================================
// SHOW DASHBOARD SECTIONS
// =====================================================

function showSection(section) {

    document
        .getElementById("dashboardSection")
        .classList.add("hidden");

    document
        .getElementById("hallsSection")
        .classList.add("hidden");

    document
        .getElementById("studentsSection")
        .classList.add("hidden");

    document
        .getElementById("examsSection")
        .classList.add("hidden");

    document
        .getElementById("seatingSection")
        .classList.add("hidden");


    // Dashboard

    if (section === "dashboard") {

        document
            .getElementById("dashboardSection")
            .classList.remove("hidden");

        loadDashboard();
    }


    // Halls

    if (section === "halls") {

        document
            .getElementById("hallsSection")
            .classList.remove("hidden");

        loadHalls();
    }


    // Students

    if (section === "students") {

        document
            .getElementById("studentsSection")
            .classList.remove("hidden");

        loadStudents();
    }


    // Exams

    if (section === "exams") {

        document
            .getElementById("examsSection")
            .classList.remove("hidden");

        loadExams();
    }


    // Seating

    if (section === "seating") {

        document
            .getElementById("seatingSection")
            .classList.remove("hidden");

        loadHallsForDropdown();
    }
}


// =====================================================
// DASHBOARD COUNTS
// =====================================================

function loadDashboard() {


    // HALL COUNT

    fetch(API_URL + "/halls")

        .then(response => response.json())

        .then(halls => {

            document.getElementById("hallCount").textContent =
                halls.length;

        })

        .catch(error => {

            console.error("Hall error:", error);

        });


    // STUDENT COUNT

    fetch(API_URL + "/students")

        .then(response => response.json())

        .then(students => {

            document.getElementById("studentCount").textContent =
                students.length;

        })

        .catch(error => {

            console.error("Student error:", error);

        });


    // EXAM COUNT

    fetch(API_URL + "/exams")

        .then(response => response.json())

        .then(exams => {

            document.getElementById("examCount").textContent =
                exams.length;

        })

        .catch(error => {

            console.error("Exam error:", error);

        });


    // SEAT COUNT

    fetch(API_URL + "/seating")

        .then(response => response.json())

        .then(seats => {

            document.getElementById("seatCount").textContent =
                seats.length;

        })

        .catch(error => {

            console.error("Seating error:", error);

        });
}


// =====================================================
// LOAD HALLS
// =====================================================

function loadHalls() {

    fetch(API_URL + "/halls")

        .then(response => response.json())

        .then(halls => {

            const container =
                document.getElementById("hallsContainer");

            container.innerHTML = "";


            if (halls.length === 0) {

                container.innerHTML =
                    "<p>No halls available.</p>";

                return;
            }


            halls.forEach(hall => {

                container.innerHTML += `

                    <div class="card">

                        <h3>🏫 ${hall.hallName}</h3>

                        <p>
                            <strong>Rows:</strong>
                            ${hall.totalRows}
                        </p>

                        <p>
                            <strong>Columns:</strong>
                            ${hall.totalColumns}
                        </p>

                        <p>
                            <strong>Capacity:</strong>
                            ${hall.capacity}
                        </p>

                    </div>

                `;
            });

        })

        .catch(error => {

            console.error("Hall error:", error);

            document.getElementById("hallsContainer").innerHTML =
                "<p>Unable to load halls.</p>";
        });
}


// =====================================================
// LOAD STUDENTS
// =====================================================

function loadStudents() {

    fetch(API_URL + "/students")

        .then(response => response.json())

        .then(students => {

            const container =
                document.getElementById("studentsContainer");

            container.innerHTML = "";


            if (students.length === 0) {

                container.innerHTML =
                    "<p>No students available.</p>";

                return;
            }


            let table = `

                <table class="data-table">

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Roll Number</th>

                        <th>Section</th>

                    </tr>

            `;


            students.forEach(student => {

                table += `

                    <tr>

                        <td>${student.id}</td>

                        <td>${student.name}</td>

                        <td>${student.rollNo}</td>

                        <td>${student.section}</td>

                    </tr>

                `;
            });


            table += "</table>";

            container.innerHTML = table;

        })

        .catch(error => {

            console.error("Student error:", error);

            document.getElementById("studentsContainer").innerHTML =
                "<p>Unable to load students.</p>";
        });
}


// =====================================================
// LOAD EXAMS
// =====================================================

function loadExams() {

    fetch(API_URL + "/exams")

        .then(response => response.json())

        .then(exams => {

            const container =
                document.getElementById("examsContainer");

            container.innerHTML = "";


            if (exams.length === 0) {

                container.innerHTML =
                    "<p>No exams available.</p>";

                return;
            }


            let table = `

                <table class="data-table">

                    <tr>

                        <th>ID</th>

                        <th>Exam Name</th>

                        <th>Exam Date</th>

                    </tr>

            `;


            exams.forEach(exam => {

                table += `

                    <tr>

                        <td>${exam.id}</td>

                        <td>${exam.examName}</td>

                        <td>${exam.examDate}</td>

                    </tr>

                `;
            });


            table += "</table>";

            container.innerHTML = table;

        })

        .catch(error => {

            console.error("Exam error:", error);

            document.getElementById("examsContainer").innerHTML =
                "<p>Unable to load exams.</p>";
        });
}


// =====================================================
// HALL DROPDOWN
// =====================================================

function loadHallsForDropdown() {

    fetch(API_URL + "/halls")

        .then(response => response.json())

        .then(halls => {

            const dropdown =
                document.getElementById("hallSelect");

            dropdown.innerHTML =
                `<option value="">Select a hall</option>`;


            halls.forEach(hall => {

                dropdown.innerHTML += `

                    <option value="${hall.id}">

                        ${hall.hallName}

                    </option>

                `;
            });

        })

        .catch(error => {

            console.error("Dropdown error:", error);

            alert("Unable to load halls.");
        });
}


// =====================================================
// GENERATE SEATING
// =====================================================

function generateSeating() {

    const hallId =
        document.getElementById("hallSelect").value;


    if (hallId === "") {

        alert("Please select a hall.");

        return;
    }


    fetch(
        API_URL +
        "/halls/" +
        hallId +
        "/generate-seating",
        {
            method: "POST"
        }
    )

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Unable to generate seating"
                );
            }

            return response.json();
        })

        .then(seats => {

            displaySeating(seats);

            document.getElementById("seatCount").textContent =
                seats.length;

        })

        .catch(error => {

            console.error(
                "Generate seating error:",
                error
            );

            alert("Could not generate seating.");
        });
}


// =====================================================
// DISPLAY SEATING
// =====================================================

function displaySeating(seats) {

    const container =
        document.getElementById("seatingContainer");

    container.innerHTML = "";


    if (seats.length === 0) {

        container.innerHTML =
            "<p>No seating arrangement available.</p>";

        return;
    }


    seats.forEach(seat => {

        const seatBox =
            document.createElement("div");


        seatBox.className = "seat";


        seatBox.innerHTML = `

            <div class="seat-number">

                🪑 Seat ${seat.seatNumber}

            </div>

            <div class="student-name">

                ${seat.studentName}

            </div>

            <div class="roll-number">

                ${seat.rollNo}

            </div>

            <div class="section">

                Section ${seat.section}

            </div>

        `;


        container.appendChild(seatBox);
    });
}