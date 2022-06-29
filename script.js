let myLibrary = [];

function Book(title, author, pages, read) {
    this.Title = title
    this.Author = author
    this.Pages = pages
    this.Read = read
    this.info = function() {
        return(`The ${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`)
    }
}

function addBookToLibrary(Title, Author, Pages, Read ) {
    let book = new Book(Title, Author, Pages, Read)
    myLibrary.push(book)
    display()
}

function display() {
    let cardContainer = document.querySelector('.card-container')

    let cardsArray = document.querySelectorAll(".card")
    for (let i = 0; i < cardsArray.length; i++){
        cardsArray[i].remove()
    }
    
    let index = 0;
    myLibrary.forEach(myLibrarys => {
        //creating the cards
        let cardDiv = document.createElement('div')
        cardDiv.className = 'flex-child card'
        cardDiv.classList.add('cardDiv')
        cardContainer.appendChild(cardDiv);

        //creating the removeButton
        let removeButton = document.createElement('button')
        removeButton.className = 'remove-button'
        removeButton.textContent = 'Remove'

        
        //creating data-attributes
        removeButton.dataset.removeIndex = index;
        cardDiv.appendChild(removeButton);
        
        //removeButton function
        removeButton.addEventListener('click', removeBook);
        function removeBook(){
            let getBookIndex = removeButton.dataset.removeIndex
            console.log(getBookIndex, 'checking to see if this is the book or the data-aatribute')
            //console.log(myLibrary)
            myLibrary.splice(parseInt(getBookIndex), 1)
            cardDiv.remove()
            display()
        }

        
        for (let key in myLibrarys) {
            if (key !== 'info'  && key !== 'Read'){
                //console.log(`${key} : ${myLibrary[key]}`);
                let text = document.createElement('p')
                text.textContent = (`${key} : ${myLibrarys[key]}`)
                cardDiv.appendChild(text)
            }
            
            if (key === 'Read'){
                let readButton = document.createElement('button')
                //console.log(myLibrarys[key])
                if (myLibrarys[key] === 'read'){
                    readButton.className = 'read-btn read'
                    readButton.textContent = 'Read'
                } else if(myLibrarys[key] === 'not-read') {
                    readButton.className = 'read-btn not-read'
                    readButton.textContent = 'Not read'
                }

                //creating data-attribute for readButton to change its status
                readButton.dataset.readBtnIndex = index;
                index++;
                cardDiv.appendChild(readButton)

                //Getting the read button to change color and text when clicked
                readButton.addEventListener('click', function(){
                    changeReadBtn()
                })        
                function changeReadBtn() {
                    let getBookIndex = readButton.dataset.readBtnIndex;
                    let getBook = document.querySelector(`[data-read-btn-index='${getBookIndex}']`)
                    console.log(getBook.className)
                    //let readbtn = document.querySelector('.read-btn')
                    if (getBook.className === 'read-btn read') {
                        getBook.className = 'read-btn not-read'
                        getBook.textContent = 'Not Read'
                    } else {
                        getBook.className = 'read-btn read'
                        getBook.textContent = 'Read'
                    }
                }
                    
            }
            
            
        } 
             
        })
}

//making the form appear when add book button is clicked
let addBook = document.querySelector('.add-book')
addBook.addEventListener('click', () => {
    const form = document.getElementById('form')
    if (form.style.display === 'none') {
        form.style.display = 'block'
    } else {
        form.style.display = 'none'
    }
})


//creating createBook function
function createBook() {
    let title = document.querySelector('#title').value
    let author = document.querySelector('#author').value
    let pages = document.querySelector('#pages').value
    let read = document.querySelector('input[type = radio]:checked').value
    console.log(read)
    addBookToLibrary(title, author, pages, read)
    document.querySelector('#form').reset();
    const form = document.getElementById('form')
    form.style.display = 'none'
}

//calling the book object when the form's submit button is clicked
let formSubmit = document.getElementById('form-submit')
formSubmit.addEventListener('click', function(){
    createBook();
})




