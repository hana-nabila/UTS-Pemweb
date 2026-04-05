document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('addBtn');
    const titleInput = document.getElementById('noteTitle');
    const bodyInput = document.getElementById('noteBody');
    const notesList = document.getElementById('notesList');

    addBtn.addEventListener('click', () => {
        const title = titleInput.value;
        const body = bodyInput.value;

        if (title === '' || body === '') {
            alert('Judul dan isi tidak boleh kosong!');
            return;
        }

        const date = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('id-ID', options);

        createNoteElement(title, body, formattedDate);

        // Reset input
        titleInput.value = '';
        bodyInput.value = '';
    });

    function createNoteElement(title, body, date) {
        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card');

        noteCard.innerHTML = `
            <h3>${title}</h3>
            <p class="note-date">${date}</p>
            <p class="note-content">${body}</p>
            <div class="actions">
                <button class="btn-delete">Hapus</button>
                <button class="btn-archive">Arsipkan</button>
            </div>
        `;

        // Fitur Hapus
        noteCard.querySelector('.btn-delete').addEventListener('click', () => {
            noteCard.remove();
        });

        notesList.prepend(noteCard);
    }
});