let bookList = [
    {
        name: "Harry Potter",
        author: "J.K. Rowling",
        releaseDate: "1997",
        category: "Fantasy"
    },

    {
        name: "The Hobbit",
        author: "J.R.R. Tolkien",
        releaseDate: "1937",
        category: "Fantasy"
    }
];

const tbodyEL = document.querySelector("tbody");
const searchInput = document.getElementById("searchInput");
const errorMessage = document.querySelector(".error-message");
let editingIndex = -1;

// Hàm render dữ liệu
function renderData() {
    let dataHTML = ``;

    for (let i = 0; i < bookList.length; i++) {
        dataHTML += `
        <tr>
                <td>${bookList[i].name}</td>
                <td>${bookList[i].author}</td>
                <td>${bookList[i].releaseDate}</td>
                <td>${bookList[i].category}</td>
                <td>
                <button class="btn btn-primary btn-sm" onclick="editBook(${i})">Sửa</button>
                <button class="btn btn-primary btn-sm" onclick="deleteBook(${i})">Xóa</button>
            </td>
            </tr>`;
    }
    console.log(dataHTML);
    tbodyEL.innerHTML = dataHTML;
}

// Hàm thêm mới
function addBook(e) {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const author = document.querySelector("#author").value.trim();
    const releaseDate = document.querySelector("#releaseDate").value.trim();
    const category = document.querySelector("#category").value.trim();

    // Ẩn tất cả lỗi trước
    document.querySelectorAll(".error-message").forEach(el => el.style.display = "none");

    let hasError = false;

    if (name === "") {
        document.getElementById("error-name").style.display = "block";
        hasError = true;
    }
    if (author === "") {
        document.getElementById("error-author").style.display = "block";
        hasError = true;
    }
    if (releaseDate === "") {
        document.getElementById("error-releaseDate").style.display = "block";
        hasError = true;
    }
    if (category === "") {
        document.getElementById("error-category").style.display = "block";
        hasError = true;
    }

    if (hasError) return; // Không thêm nếu có lỗi

    if (editingIndex == -1) {
        bookList.push({ name, author, releaseDate, category });
    } else {
        bookList[editingIndex] = { name, author, releaseDate, category };
        editingIndex = -1;
        document.getElementById("submitBtn").textContent = "Thêm sách";
    }

    renderData();
    clearInputs();
}


// Hàm làm sạch input
function clearInputs() {
    document.querySelector("#name").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#releaseDate").value = "";
    document.querySelector("#category").value = "";
}

// Hàm xóa
function deleteBook(index) {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
        bookList.splice(index, 1);
    }
    renderData();
}

// Hàm sửa
function editBook(index) {
    const book = bookList[index];
    document.querySelector("#name").value = book.name;
    document.querySelector("#author").value = book.author;
    document.querySelector("#releaseDate").value = book.releaseDate;
    document.querySelector("#category").value = book.category;
    editingIndex = index;
    document.getElementById("submitBtn").textContent = "Cập nhật";
}

// Hàm tìm kiếm
function searchBooks() {
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm === "") {
        renderData(); // hiển thị toàn bộ nếu ô trống
        return;
    }

    const filteredBooks = bookList.filter(book =>
        book.name.toLowerCase().includes(searchTerm)
    );

    renderFilteredData(filteredBooks);
}

// Hàm render dữ liệu đã lọc    
function renderFilteredData(filteredList) {
    let dataHTML = ``;

    for (let i = 0; i < filteredList.length; i++) {
        dataHTML += `
        <tr>
                <td>${filteredList[i].name}</td>
                <td>${filteredList[i].author}</td>
                <td>${filteredList[i].releaseDate}</td>
                <td>${filteredList[i].category}</td>
                <td>
                <button class="btn btn-warning btn-sm" onclick="editBook(${i})">Sửa</button>
                <button class="btn btn-danger btn-sm" onclick="deleteBook(${i})">Xóa</button>
            </td>
            </tr>`;
    }

    tbodyEL.innerHTML = dataHTML;
}



renderData();
searchInput.addEventListener("input", searchBooks);


