
// DOM Elements
const booksGrid = document.getElementById('books-grid');
const searchInput = document.getElementById('search-input');
const bookModal = document.getElementById('book-modal');
const closeButton = document.querySelector('.close-button');
const modalBookDetails = document.getElementById('modal-book-details');

// Books data
let books = [];

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // قائمة الكتب المتاحة (أضف هنا كتبك)
  books = [
    {
      id: "1",
      title: "البؤساء",
      author: "فيكتور هوغو",
      description: "رواية ملحمية تعتبر من روائع الأدب العالمي، تتناول قضايا العدالة والقانون والدين.",
      coverImage: "books/covers/les-miserables.jpg",
      filePath: "books/pdf/les-miserables.pdf"
    },
    {
      id: "2",
      title: "البؤساء",
      author: "فيكتور هوغو",
      description: "رواية ملحمية تعتبر من روائع الأدب العالمي، تتناول قضايا العدالة والقانون والدين.",
      coverImage: "books/covers/les-miserables.jpg",
      filePath: "books/pdf/les-miserables.pdf"
    },
    {
      id: "3",
      title: "كليلة ودمنة",
      author: "ابن المقفع",
      description: "مجموعة من القصص والحكايات على لسان الحيوانات، تحمل في طياتها حكماً وعبراً مفيدة.",
      coverImage: "books/covers/kalila-wa-dimna.jpg",
      filePath: "books/pdf/the-bet_pdf.pdf.pdf"
    }
  ];
  
  // إظهار الكتب
  displayBooks();

  searchInput.addEventListener('input', handleSearch);
  closeButton.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target === bookModal) {
      closeModal();
    }
  });
});

// Display all books
function displayBooks(filteredBooks = null) {
  const booksToDisplay = filteredBooks || books;
  booksGrid.innerHTML = '';

  if (booksToDisplay.length === 0) {
    booksGrid.innerHTML = '<p class="no-books">لا توجد كتب متاحة حالياً.</p>';
    return;
  }

  booksToDisplay.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.dataset.id = book.id;

    // Cover image path
    const coverSrc = book.coverImage || 'https://via.placeholder.com/150x200?text=كتاب';

    bookCard.innerHTML = `
      <div class="book-cover">
        <img src="${coverSrc}" alt="${book.title}">
      </div>
      <div class="book-info">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>
      </div>
    `;

    bookCard.addEventListener('click', () => openBookDetails(book));
    booksGrid.appendChild(bookCard);
  });
}

// Open book details modal
function openBookDetails(book) {
  const coverSrc = book.coverImage || 'https://via.placeholder.com/300x400?text=كتاب';

  modalBookDetails.innerHTML = `
    <div class="modal-book-cover">
      <img src="${coverSrc}" alt="${book.title}">
    </div>
    <h2 class="modal-book-title">${book.title}</h2>
    <h3 class="modal-book-author">المؤلف: ${book.author}</h3>
    <p class="modal-book-description">${book.description || 'لا يوجد وصف متاح.'}</p>
    <a href="${book.filePath}" download class="download-button">تحميل الكتاب</a>
  `;

  bookModal.style.display = 'block';
}

// Close book details modal
function closeModal() {
  bookModal.style.display = 'none';
}

// Handle search
function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm === '') {
    displayBooks();
    return;
  }

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm) || 
    book.author.toLowerCase().includes(searchTerm)
  );

  displayBooks(filteredBooks);
}
